import { pageUrl, escapeHtml, savePreference } from "./utils.js";
import { business } from "./site-config.js";
import { icon, bookLink } from "./shared-ui.js";
import { Logo } from "./shared-ui.js";

export function ThemeToggle() {
  return `<button class="tool-button" data-theme-toggle aria-label="Switch color theme">${icon("moon")}<span class="mobile-tool-label">Color theme</span></button>`;
}

export function initThemeToggle() {
  const sync = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute(
        "aria-label",
        dark ? "Switch to light mode" : "Switch to dark mode",
      );
      button.setAttribute("aria-pressed", String(dark));
      button.innerHTML = `${icon(dark ? "sun" : "moon")}<span class="mobile-tool-label">${dark ? "Light mode" : "Dark mode"}</span>`;
    });
  };
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const theme =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
      savePreference("pp-theme", theme);
      sync();
    });
  });
  sync();
}

export function DirectionToggle() {
  return `<button class="tool-button" data-direction-toggle aria-label="Switch reading direction">${icon("direction")}<span data-direction-label>RTL</span></button>`;
}

export function initDirectionToggle() {
  const sync = () =>
    document.querySelectorAll("[data-direction-toggle]").forEach((button) => {
      const rtl = document.documentElement.dir === "rtl";
      button.setAttribute(
        "aria-label",
        rtl
          ? "Switch to left-to-right direction"
          : "Switch to right-to-left direction",
      );
      button.querySelector("[data-direction-label]").textContent = rtl
        ? "LTR"
        : "RTL";
    });
  document.querySelectorAll("[data-direction-toggle]").forEach((button) =>
    button.addEventListener("click", () => {
      const direction = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
      document.documentElement.dir = direction;
      savePreference("pp-dir", direction);
      sync();
    }),
  );
  sync();
}

const navigation = [
  ["services", "Services"],
  ["accessories", "Accessories"],
  ["pricing", "Pricing guide"],
  ["contact", "Contact"],
];

function links(page) {
  return navigation
    .map(
      ([id, text]) =>
        `<a href="${pageUrl(id)}" ${page === id ? 'aria-current="page"' : ""}>${text}</a>`,
    )
    .join("");
}

function homeDropdown(page, mobile = false) {
  return `<details class="home-dropdown ${mobile ? "home-dropdown--mobile" : ""}">
    <summary ${["home", "home2"].includes(page) ? "data-active" : ""}>Home ${icon("chevron")}</summary>
    <div class="home-dropdown__content">
      <a href="${pageUrl()}" ${page === "home" ? 'aria-current="page"' : ""}>Home 1 <span>The repair studio</span></a>
      <a href="${pageUrl("home-2")}" ${page === "home2" ? 'aria-current="page"' : ""}>Home 2 <span>Find your repair</span></a>
    </div>
  </details>`;
}

export function Header(page) {
  return `<header class="site-header">
    <div class="container header-inner">
      ${Logo()}
      <nav class="desktop-nav" aria-label="Main navigation">${homeDropdown(page)}${links(page)}</nav>
      <div class="header-actions">${ThemeToggle()}${DirectionToggle()}${bookLink()}</div>
      <button class="menu-toggle tool-button" aria-label="Open navigation" aria-controls="mobile-menu" aria-expanded="false">${icon("menu")}</button>
    </div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" inert>
      ${homeDropdown(page, true)}${links(page)}
      ${bookLink()}
      <div class="mobile-preferences">${ThemeToggle()}${DirectionToggle()}</div>
    </nav>
  </header>`;
}

export function initNavigation() {
  const header = document.querySelector(".site-header");
  const menu = document.querySelector("#mobile-menu");
  const toggle = document.querySelector(".menu-toggle");
  let open = false;

  function setOpen(value) {
    open = value;
    menu.inert = !value;
    menu.classList.toggle("is-open", value);
    toggle.setAttribute("aria-expanded", String(value));
    toggle.setAttribute(
      "aria-label",
      value ? "Close navigation" : "Open navigation",
    );
    toggle.innerHTML = icon(value ? "close" : "menu");
    document.body.classList.toggle("menu-is-open", value);
    if (!value && menu.contains(document.activeElement)) toggle.focus();
  }

  toggle.addEventListener("click", () => setOpen(!open));
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("click", (event) => {
    if (!event.composedPath().includes(header)) setOpen(false);
    document.querySelectorAll(".home-dropdown[open]").forEach((dropdown) => {
      if (!dropdown.contains(event.target)) dropdown.open = false;
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      document.querySelectorAll(".home-dropdown").forEach((dropdown) => {
        if (dropdown.open && dropdown.contains(document.activeElement))
          dropdown.querySelector("summary").focus();
        dropdown.open = false;
      });
    }
    if (!open || event.key !== "Tab") return;
    const focusable = [
      toggle,
      ...menu.querySelectorAll("a, button, summary"),
    ].filter((element) => element.getClientRects().length);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  matchMedia("(min-width: 1100px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

export function ContactDetails() {
  return `<div class="business-details">
    ${business.address ? `<p>${escapeHtml(business.address)}</p>` : ""}
    ${business.phone ? `<a href="tel:${escapeHtml(business.phone)}">${escapeHtml(business.phone)}</a>` : ""}
    ${business.email ? `<a href="mailto:${escapeHtml(business.email)}">${escapeHtml(business.email)}</a>` : ""}
    ${business.hours ? `<p>${escapeHtml(business.hours)}</p>` : ""}
  </div>`;
}

export function Footer() {
  const group = (title, items) =>
    `<nav class="footer-link-group" aria-label="${title}"><h3>${title}</h3><ul>${items.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul></nav>`;
  return `<footer class="site-footer">
    <div class="container footer-main">
      <div class="footer-brand">${Logo()}<p>Keep your phone working and your everyday connected. Explore repair options, find useful accessories, and prepare for your next visit.</p><a class="button button--text" href="${pageUrl("home-2")}#repair-finder">Find my repair ${icon("arrow", "directional")}</a>${ContactDetails()}</div>
      ${group("Explore", [
        ["The repair studio", pageUrl()],
        ["Repair finder", `${pageUrl("home-2")}#repair-finder`],
        ["All repair services", pageUrl("services")],
        ["Accessories", `${pageUrl("accessories")}#catalog`],
        ["Pricing guide", pageUrl("pricing")],
        ["Contact & booking", pageUrl("contact")],
      ])}
      ${group("Repair services", [
        ["Screen replacement", `${pageUrl("services")}#screen`],
        ["Battery replacement", `${pageUrl("services")}#battery`],
        ["Charging port repair", `${pageUrl("services")}#charging`],
        ["Software troubleshooting", `${pageUrl("services")}#software`],
        ["Camera repair", `${pageUrl("services")}#camera`],
        ["Speaker & microphone", `${pageUrl("services")}#audio`],
      ])}
      ${group("Plan your visit", [
        ["Start a repair request", `${pageUrl("contact")}#booking-form`],
        ["How repairs work", `${pageUrl("services")}#repair-process`],
        ["Repair FAQs", `${pageUrl("services")}#repair-faqs`],
        ["Before your visit", `${pageUrl("contact")}#before-your-visit`],
      ])}
    </div>
    <div class="container footer-bottom"><p>© ${new Date().getFullYear()} Port & Pixel</p><button class="plain-link" data-privacy-open>Privacy & your request</button></div>
  </footer>`;
}

export function Dialogs() {
  return `<dialog id="product-dialog" aria-label="Accessory details"><button class="dialog-close tool-button" aria-label="Close product details">${icon("close")}</button><div id="product-dialog-content"></div></dialog>
    <dialog id="privacy-dialog" aria-labelledby="privacy-title"><button class="dialog-close tool-button" aria-label="Close privacy information">${icon("close")}</button>
      <div class="privacy-content"><h2 id="privacy-title">Your information,<br>handled thoughtfully.</h2>
      <p>${business.submissionEndpoint ? "Your request is sent to the shop through the configured submission service." : "This form prepares a request locally. Your entries stay in this page’s memory and are not sent to the shop. Refreshing clears them."}</p>
      <p>A downloaded copy is saved only to your device. Never include passwords, passcodes, financial information, or other sensitive content.</p>
      <p>Color theme and reading direction preferences are saved in your browser. An enquiry does not confirm an appointment.</p></div>
    </dialog>`;
}

export function initDialogs() {
  document.querySelectorAll("[data-privacy-open]").forEach((button) => {
    button.addEventListener("click", () =>
      document.querySelector("#privacy-dialog").showModal(),
    );
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog
      .querySelector(".dialog-close")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    });
  });
}

export function FloatingBackToTop() {
  return `<button class="back-to-top" data-back-top aria-label="Back to top" hidden>${icon("arrow", "up-arrow")}</button>`;
}

export function initBackToTop() {
  const control = document.querySelector("[data-back-top]");
  const sync = () => {
    const visible =
      scrollY > 400 && !document.body.classList.contains("menu-is-open");
    // Restore a useful focus target before hiding a keyboard-activated control.
    if (!visible && document.activeElement === control) {
      const main = document.querySelector("main");
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }
    control.hidden = !visible;
  };
  addEventListener("scroll", sync, { passive: true });
  new MutationObserver(sync).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
  control.addEventListener("click", () =>
    scrollTo({
      top: 0,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    }),
  );
  sync();
}
