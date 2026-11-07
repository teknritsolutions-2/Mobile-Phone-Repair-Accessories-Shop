import { initDropdowns } from "./dropdowns.js?v=dropdown-startup-19";

// Independent of the page feature startup; initDropdowns is safe to call again.
if (document.readyState !== "complete") {
  document.addEventListener("DOMContentLoaded", initDropdowns, { once: true });
} else {
  initDropdowns();
}
