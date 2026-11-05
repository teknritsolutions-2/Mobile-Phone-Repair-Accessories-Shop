import {
  Header,
  Footer,
  Dialogs,
  initNavigation,
  initThemeToggle,
  initDirectionToggle,
  initDialogs,
  ContactDetails,
} from "./site-shell.js";
import {
  initProductDetails,
  initAccessoryCatalog,
} from "./accessory-catalog.js";
import { initServiceSelector } from "./service-selector.js";
import { initRepairFinder } from "./repair-finder.js";
import { initRepairJourney } from "./repair-journey.js";
import { initPricingGuide } from "./pricing-guide.js";
import { initBookingForm } from "./booking-form.js";

const page = document.body.dataset.page;
document.querySelector("#site-header").innerHTML = Header(page);
document.querySelector("#site-footer").innerHTML = Footer();
document.querySelector("#site-dialogs").innerHTML = Dialogs();
initNavigation();
initThemeToggle();
initDirectionToggle();
initDialogs();
initProductDetails();
initServiceSelector();
initRepairFinder();
initRepairJourney();
initAccessoryCatalog();
initPricingGuide();
initBookingForm();
const contactDetails = document.querySelector(
  ".booking-aside .business-details",
);
if (contactDetails) contactDetails.outerHTML = ContactDetails();

document.querySelector("[data-back-top]").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
});
document.body.dataset.ready = "true";
