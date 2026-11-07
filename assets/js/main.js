import {
  Header,
  Footer,
  Dialogs,
  initNavigation,
  initThemeToggle,
  initDirectionToggle,
  initDialogs,
  ContactDetails,
  FloatingBackToTop,
  initBackToTop,
} from "./site-shell.js?v=photos-7";
import {
  initProductDetails,
  initAccessoryCatalog,
} from "./accessory-catalog.js?v=photos-7";
import { initServiceSelector } from "./service-selector.js?v=photos-7";
import { initRepairFinder } from "./repair-finder.js?v=photos-7";
import { initRepairJourney } from "./repair-journey.js?v=photos-7";
import { initPricingGuide } from "./pricing-guide.js?v=photos-7";
import { initProductPreviews } from "./product-previews.js?v=photos-7";
import { initBookingForm } from "./booking-form.js?v=photos-7";

const page = document.body.dataset.page;
document.querySelector("#site-header").innerHTML = Header(page);
document.querySelector("#site-footer").innerHTML = Footer();
document.querySelector("#site-dialogs").innerHTML = Dialogs();
document.body.insertAdjacentHTML("beforeend", FloatingBackToTop());
initBackToTop();
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
initProductPreviews();
const contactDetails = document.querySelector(
  ".booking-aside .business-details",
);
if (contactDetails) contactDetails.outerHTML = ContactDetails();

document.body.dataset.ready = "true";
