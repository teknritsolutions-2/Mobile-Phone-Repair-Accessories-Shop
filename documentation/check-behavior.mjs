// Optional checks use Node's built-in test runner; the website itself requires no Node tooling.
import assert from "node:assert/strict";
import {
  validateRequest,
  buildRequestSummary,
  localDate,
} from "../assets/js/validation.js";
import { pageUrl, escapeHtml } from "../assets/js/utils.js";
import { filterProducts } from "../assets/js/accessory-catalog.js";

const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "+91 98765 43210",
  brand: "Apple",
  model: "iPhone 14",
  service: "screen",
  description: "The display does not respond to touch.",
  consent: "on",
};
assert.deepEqual(validateRequest(valid), {});
assert.ok(validateRequest({ ...valid, email: "not-an-email" }).email);
assert.ok(validateRequest({ ...valid, phone: "12-3" }).phone);
assert.ok(validateRequest({ ...valid, description: "   " }).description);
assert.ok(
  validateRequest({ ...valid, date: "2020-01-01" }, false, "2026-11-05").date,
);
assert.ok(validateRequest({ ...valid, consent: "" }).consent);
assert.ok(validateRequest({ ...valid, model: "" }).model);
assert.deepEqual(validateRequest({ ...valid, model: "", brand: "" }, true), {});
assert.equal(localDate(new Date(2026, 10, 5)), "2026-11-05");
assert.match(
  buildRequestSummary(valid, "Screen Replacement"),
  /LOCAL REQUEST COPY \(NOT SENT\)/,
);
assert.match(
  buildRequestSummary({ ...valid, name: "<script>" }, "Screen Replacement"),
  /Name: <script>/,
);
assert.equal(
  escapeHtml('<script>"x" & data'),
  "&lt;script&gt;&quot;x&quot; &amp; data",
);

globalThis.document = { body: { dataset: { page: "home" } } };
assert.equal(pageUrl("services"), "pages/services.html");
assert.equal(pageUrl("home-2"), "pages/home2.html");
assert.equal(
  pageUrl("contact", { symptom: "Cracks & flickers" }),
  "pages/contact.html?symptom=Cracks+%26+flickers",
);
document.body.dataset.page = "services";
assert.equal(pageUrl(), "../index.html");
assert.equal(
  pageUrl("contact", { service: "screen" }),
  "../pages/contact.html?service=screen",
);
assert.equal(filterProducts({ category: "Chargers & Cables" }).length, 2);
assert.equal(filterProducts({ query: "  USB-C  " }).length, 1);
assert.equal(filterProducts({ query: "no matching accessory" }).length, 0);
const ascending = filterProducts({ sort: "az" }).map((product) => product.name);
assert.deepEqual(
  ascending,
  [...ascending].sort((a, b) => a.localeCompare(b)),
);
console.log(
  "PASS: request validation, honest request summary, safe text rendering, relative page URLs, filtering, search, and sorting.",
);
const low = filterProducts({ sort: "price-low" });
assert.deepEqual(
  low.map((p) => p.samplePrice),
  [249, 299, 349, 399, 699, 1499],
);
assert.deepEqual(
  filterProducts({ sort: "price-high" }).map((p) => p.samplePrice),
  [1499, 699, 399, 349, 299, 249],
);
assert.deepEqual(
  filterProducts({
    category: "Chargers & Cables",
    sort: "price-high",
    query: "wall",
  }).map((p) => p.samplePrice),
  [699],
);
const { formatSamplePrice } = await import("../assets/js/product-data.js");
assert.equal(formatSamplePrice(low.at(-1)), "₹1,499");
console.log(
  "PASS: numeric sample-price sorting, combined search/category/price filters, and INR formatting.",
);
