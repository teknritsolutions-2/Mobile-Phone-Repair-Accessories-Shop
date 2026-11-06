const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
const b = await chromium.launch({
  executablePath: process.env.BROWSER_EXECUTABLE || undefined,
  headless: true,
});
const page = await b.newPage({ viewport: { width: 1440, height: 960 } });
const base = process.env.QA_BASE_URL || "http://127.0.0.1:4173/";
const rootBase = process.env.QA_ROOT_URL || base;
const output = process.env.QA_OUTPUT_DIR || "/tmp/port-pixel-browser-qa";
const routes = [
  "index.html",
  "pages/home2.html",
  "pages/services.html",
  "pages/accessories.html",
  "pages/pricing.html",
  "pages/contact.html",
];
const failures = [],
  errors = [],
  failedRequests = [],
  checks = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.status() >= 400)
    failedRequests.push({ url: r.url(), status: r.status() });
});
await mkdir(output, { recursive: true });
async function go(route) {
  const response = await page.goto(base + route);
  assert.equal(response.status(), 200);
  await page.waitForSelector('body[data-ready="true"]');
}
for (const width of [320, 390, 768, 1024, 1280, 1440]) {
  await page.setViewportSize({ width, height: 960 });
  for (const route of routes) {
    await go(route);
    await page.evaluate(async () => {
      document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
      await Promise.all(
        [...document.images].map((i) => i.decode().catch(() => {})),
      );
      await document.fonts.ready;
    });
    for (const theme of ["light", "dark"])
      for (const dir of ["ltr", "rtl"]) {
        await page.evaluate(
          ({ theme, dir }) => {
            document.documentElement.dataset.theme = theme;
            document.documentElement.dir = dir;
          },
          { theme, dir },
        );
        const result = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          broken: [...document.images]
            .filter((i) => !i.complete || !i.naturalWidth)
            .map((i) => i.src),
          outside: [
            ...document.querySelectorAll(
              "main h1,main h2,main .button,.header-inner",
            ),
          ]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width && (r.left < -1 || r.right > innerWidth + 1);
            })
            .map((el) => el.textContent.trim()),
        }));
        if (result.overflow || result.broken.length || result.outside.length)
          failures.push({ width, route, theme, dir, ...result });
        if (
          ([390, 768, 1024, 1440].includes(width) && dir === "ltr") ||
          (width === 390 &&
            theme === "dark" &&
            dir === "rtl" &&
            ["pages/services.html", "pages/contact.html"].includes(route))
        ) {
          await page.waitForTimeout(220);
          await page.screenshot({
            path: `${output}/${route.split("/").at(-1).replace(".html", "")}-${width}-${theme}-${dir}.png`,
            fullPage: true,
          });
        }
      }
  }
  console.log("Responsive width complete:", width);
}
await writeFile(
  `${output}/layout-report.json`,
  JSON.stringify(
    { layoutCases: 144, failures, errors, failedRequests },
    null,
    2,
  ),
);
await page.setViewportSize({ width: 1440, height: 960 });
await go("index.html");
await page.evaluate(() => {
  localStorage.clear();
  document.documentElement.dataset.theme = "light";
  document.documentElement.dir = "ltr";
});
await page.locator(".desktop-nav .home-dropdown summary").click();
await page.locator('.desktop-nav a[href="pages/home2.html"]').click();
await page.waitForLoadState("load");
await page.waitForSelector('body[data-ready="true"]');
assert.match(page.url(), /pages\/home2.html$/);
checks.push("Desktop Home dropdown and physical page navigation");
await page.locator('[data-device="Tablet"]').click();
await page.selectOption("#finder-problem", "battery");
await page.selectOption("#finder-symptom", "Unexpected shutdowns");
await page.locator("#finder-result a").click();
await page.waitForSelector('body[data-ready="true"]');
assert.equal(await page.locator("#service").inputValue(), "battery");
assert.match(
  await page.locator("#description").inputValue(),
  /Tablet.*\n.*Unexpected shutdowns/,
);
checks.push("Device/problem/symptom finder and booking context");
await go("index.html");
await page.locator('[data-issue="charging"]').click();
assert.match(
  await page.locator("#service-selection").innerText(),
  /Charging Port Repair/,
);
await page.locator("#service-selection a").click();
await page.waitForSelector('body[data-ready="true"]');
assert.equal(await page.locator("#service").inputValue(), "charging");
checks.push("Quick repair selector and service preselection");
await go("index.html");
await page.locator('[data-journey="2"]').click();
assert.match(
  await page.locator("#journey-copy").innerText(),
  /Leave it in careful hands/,
);
checks.push("Interactive repair journey");
await go("pages/services.html");
for (const id of [
  "screen",
  "battery",
  "charging",
  "software",
  "camera",
  "audio",
])
  assert.match(
    await page.locator(`#${id} .button`).getAttribute("href"),
    new RegExp("pages/contact.html\\?service=" + id),
  );
await page.locator(".accordion summary").first().click();
assert.equal(
  await page.locator(".accordion-item").first().getAttribute("open"),
  "",
);
checks.push("All six service booking URLs and FAQ expansion");
await go("pages/accessories.html");
assert.equal(await page.locator("#product-catalog .product-card").count(), 6);
await page.locator('[data-category="Chargers & Cables"]').click();
assert.equal(await page.locator("#product-catalog .product-card").count(), 2);
await page.fill("#product-search", "zzzzzzzz");
assert.equal(await page.locator(".empty-state").count(), 1);
await page.locator("#reset-catalog").click();
assert.equal(await page.locator("#product-catalog .product-card").count(), 6);
await page.selectOption("#product-sort", "az");
let names = await page.locator("#product-catalog h3").allTextContents();
assert.deepEqual(
  names,
  [...names].sort((a, b) => a.localeCompare(b)),
);
await page.locator('[data-product="case"]').first().click();
assert.equal(
  await page.locator("#product-dialog").evaluate((d) => d.open),
  true,
);
await page.keyboard.press("Escape");
assert.equal(
  await page.locator("#product-dialog").evaluate((d) => d.open),
  false,
);
await page.locator('[data-product="cable"]').first().click();
await page.locator("#product-dialog .button").click();
await page.waitForSelector('body[data-ready="true"]');
assert.equal(await page.locator("#service").inputValue(), "accessory");
assert.match(await page.locator(".enquiry-context").innerText(), /USB-C cable/);
assert.equal(await page.locator("#brand").getAttribute("required"), null);
checks.push(
  "Category/search/sort/reset, detail modal/Escape, and accessory enquiry preselection",
);
await go("pages/pricing.html?service=audio");
assert.match(await page.locator("#estimate-panel h2").innerText(), /Speaker/);
await page.locator('[data-price-service="camera"]').click();
await page.selectOption("#price-device", "Tablet");
assert.match(await page.locator("#estimate-panel").innerText(), /Tablet/i);
await page.locator("#estimate-panel .button").click();
await page.waitForSelector('body[data-ready="true"]');
assert.equal(await page.locator("#service").inputValue(), "camera");
assert.match(await page.locator("#description").inputValue(), /Device: Tablet/);
checks.push(
  "Pricing category/device selectors, preserved device, and request-estimate link",
);
await page.locator('[type="submit"]').click();
assert.equal(await page.locator("#name").getAttribute("aria-invalid"), "true");
await page.fill("#name", "QA Visitor");
await page.fill("#email", "invalid");
await page.fill("#phone", "123");
await page.fill("#brand", "Apple");
await page.fill("#model", "iPhone 14");
await page.fill("#description", "Camera cannot focus on nearby objects.");
await page.locator('[type="submit"]').click();
assert.equal(await page.locator("#email").getAttribute("aria-invalid"), "true");
assert.equal(await page.locator("#phone").getAttribute("aria-invalid"), "true");
await page.fill("#email", "qa@example.com");
await page.fill("#phone", "+91 98765 43210");
await page.fill("#date", "2020-01-01");
await page.locator("#consent").check();
await page.locator('[type="submit"]').click();
assert.equal(await page.locator("#date").getAttribute("aria-invalid"), "true");
await page.fill("#date", "");
await page.locator('[type="submit"]').click();
assert.match(
  await page.locator(".request-review").innerText(),
  /has not been sent/,
);
const downloadPromise = page.waitForEvent("download");
await page.locator("[data-download-request]").click();
assert.equal(
  (await downloadPromise).suggestedFilename(),
  "port-and-pixel-request.txt",
);
await page.locator("[data-edit-request]").click();
assert.equal(await page.locator("#name").inputValue(), "QA Visitor");
checks.push(
  "Required/email/phone/date/consent validation and local review/download/edit",
);
await go("pages/contact.html?service=accessory");
assert.equal(await page.locator("#service").inputValue(), "accessory");
assert.equal(await page.locator("#model").getAttribute("required"), null);
await page.selectOption("#service", "screen");
assert.notEqual(await page.locator("#model").getAttribute("required"), null);
await page.selectOption("#service", "accessory");
await page.fill("#name", "Accessory Visitor");
await page.fill("#email", "visitor@example.com");
await page.fill("#phone", "+91 98765 43210");
await page.fill("#description", "Please help me find a compatible case.");
await page.locator("#consent").check();
await page.locator('[type="submit"]').click();
assert.match(
  await page.locator(".request-review").innerText(),
  /Accessory enquiry/,
);
checks.push(
  "Generic accessory preselection, request-type switching, and optional device fields",
);
await go("pages/accessories.html");
await page.selectOption("#product-sort", "za");
await page.fill("#product-search", "no match at all");
await page.locator("#reset-catalog").click();
assert.equal(await page.locator("#product-sort").inputValue(), "featured");
assert.equal(await page.locator("#product-catalog .product-card").count(), 6);
checks.push("Reset restores category, search, and sort together");
await go("index.html");
await page.locator(".desktop-nav summary").focus();
await page.keyboard.press("Enter");
await page.keyboard.press("Tab");
await page.keyboard.press("Escape");
assert.equal(
  await page
    .locator(".desktop-nav summary")
    .evaluate((e) => e === document.activeElement),
  true,
);
checks.push("Keyboard Home dropdown Escape restores summary focus");
await page.setViewportSize({ width: 390, height: 844 });
await go("index.html");
await page.locator(".menu-toggle").click();
assert.equal(
  await page.locator("#mobile-menu").evaluate((e) => e.inert),
  false,
);
assert.equal(
  await page.locator("body").evaluate((e) => getComputedStyle(e).overflow),
  "hidden",
);
await page.locator("#mobile-menu [data-theme-toggle]").click();
await page.locator("#mobile-menu [data-direction-toggle]").click();
await page.locator("#mobile-menu summary").click();
await page.locator('#mobile-menu a[href="pages/home2.html"]').click();
await page.waitForLoadState("load");
await page.waitForSelector('body[data-ready="true"]');
assert.equal(
  await page.evaluate(() => document.documentElement.dataset.theme),
  "dark",
);
assert.equal(await page.evaluate(() => document.documentElement.dir), "rtl");
await page.locator(".menu-toggle").click();
await page.keyboard.press("Escape");
assert.equal(
  await page.locator(".menu-toggle").getAttribute("aria-expanded"),
  "false",
);
await page.locator(".menu-toggle").click();
await page.mouse.click(15, 830);
assert.equal(
  await page.locator(".menu-toggle").getAttribute("aria-expanded"),
  "false",
);
checks.push(
  "Mobile menu, nested Home links, scroll lock, Escape/outside close, persistent theme/direction",
);
await page.locator("[data-privacy-open]").first().click();
assert.equal(
  await page.locator("#privacy-dialog").evaluate((d) => d.open),
  true,
);
await page.locator("#privacy-dialog .dialog-close").click();
assert.equal(
  await page.locator("#privacy-dialog").evaluate((d) => d.open),
  false,
);
await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
await page.locator("[data-back-top]").click();
await page.waitForTimeout(1200);
assert.equal(await page.evaluate(() => scrollY), 0);
checks.push("Privacy dialog and back-to-top");
for (const route of routes) {
  await go(route);
  await page.reload();
  await page.waitForSelector('body[data-ready="true"]');
  assert.equal(await page.locator("h1").count(), 1);
  const links = await page
    .locator("a[href]")
    .evaluateAll((nodes) =>
      nodes
        .map((n) => n.getAttribute("href"))
        .filter((h) => h && !h.startsWith("#") && !h.includes(":")),
    );
  for (const href of links) {
    const resolved = new URL(href, page.url());
    assert.ok(resolved.pathname.startsWith(new URL(base).pathname), href);
    const response = await page.request.get(resolved.href);
    assert.equal(response.status(), 200, href);
  }
}
checks.push(
  "Direct visits, refreshes, and every rendered internal link under the GitHub Pages subpath",
);
for (const route of routes) {
  await page.goto(rootBase + route);
  await page.waitForSelector('body[data-ready="true"]');
}
checks.push("All six physical pages at origin root");
const report = { layoutCases: 144, failures, errors, failedRequests, checks };
console.log(JSON.stringify(report, null, 2));
await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
await b.close();
if (failures.length || errors.length || failedRequests.length)
  process.exitCode = 1;
