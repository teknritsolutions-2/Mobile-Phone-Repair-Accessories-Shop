import { business } from "./site-config.js?v=credits-13";
import { services } from "./service-data.js?v=credits-13";
import { products } from "./product-data.js?v=credits-13";
import { escapeHtml } from "./utils.js?v=credits-13";
import {
  validateRequest,
  buildRequestSummary,
} from "./validation.js?v=credits-13";
import { icon } from "./shared-ui.js?v=credits-13";

function downloadRequest(summary) {
  const url = URL.createObjectURL(
    new Blob([summary], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "port-and-pixel-request.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function initBookingForm() {
  const form = document.querySelector("#booking-form");
  if (!form) return;
  const params = new URLSearchParams(location.search);
  const product = products.find((item) => item.id === params.get("product"));
  const requestedService = services.find(
    (item) => item.id === params.get("service"),
  );
  if (requestedService) form.elements.service.value = requestedService.id;
  if (product || params.get("service") === "accessory")
    form.elements.service.value = "accessory";
  if (product) {
    form
      .querySelector(".form-heading")
      .insertAdjacentHTML(
        "afterend",
        `<div class="enquiry-context"><div><span>You’re asking about</span><strong>${escapeHtml(product.name)}</strong></div></div>`,
      );
  }
  const syncRequestType = () => {
    const accessory = form.elements.service.value === "accessory";
    form.querySelector(".form-heading h2").textContent = accessory
      ? "Your accessory enquiry"
      : "Your repair request";
    const context = form.querySelector(".enquiry-context");
    if (context) context.hidden = !accessory;
    for (const name of ["brand", "model"]) {
      form.elements[name].required = !accessory;
      const marker = form.querySelector(`label[for="${name}"] span`);
      marker.className = accessory ? "optional" : "";
      marker.textContent = accessory ? "(optional)" : "*";
      if (accessory) marker.removeAttribute("aria-hidden");
      else marker.setAttribute("aria-hidden", "true");
      form.elements[name].removeAttribute("aria-invalid");
      document.getElementById(`${name}-error`).textContent = "";
    }
    form.querySelector('label[for="description"]').innerHTML =
      `${accessory ? "What would you like to know?" : "Describe the issue"} <span aria-hidden="true">*</span>`;
    form.elements.description.placeholder = accessory
      ? "Ask about fit, availability, or pricing. Include your model where possible."
      : "What’s happening, when did it start, and what have you tried?";
  };
  form.elements.service.addEventListener("change", syncRequestType);
  syncRequestType();

  const initialDetails = [
    params.get("device") ? `Device: ${params.get("device")}` : "",
    params.get("symptom") ? `Symptom: ${params.get("symptom")}` : "",
  ].filter(Boolean);
  if (initialDetails.length)
    form.elements.description.value = initialDetails.join("\n");

  form.addEventListener("input", (event) => {
    const error = document.getElementById(`${event.target.name}-error`);
    if (error) error.textContent = "";
    event.target.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const accessory = data.service === "accessory";
    data.product = accessory ? product?.id || "" : "";
    const errors = validateRequest(data, accessory);
    form.querySelectorAll(".field-error").forEach((element) => {
      element.textContent = "";
    });
    form
      .querySelectorAll("[aria-invalid]")
      .forEach((element) => element.removeAttribute("aria-invalid"));
    for (const [name, error] of Object.entries(errors)) {
      document.getElementById(`${name}-error`).textContent = error;
      form.elements[name].setAttribute("aria-invalid", "true");
    }
    if (Object.keys(errors).length) {
      form.elements[Object.keys(errors)[0]].focus();
      return;
    }
    let sent = false;
    const submit = form.querySelector('[type="submit"]');
    if (business.submissionEndpoint) {
      submit.disabled = true;
      submit.textContent = "Sending your request…";
      try {
        const response = await fetch(business.submissionEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Submission failed");
        sent = true;
      } catch {
        document.querySelector("#submit-error").innerHTML =
          '<p class="field-error">Your request could not be sent. Your details are still here. Please try again.</p>';
        submit.disabled = false;
        submit.textContent = "Submit your request";
        return;
      }
    }
    const serviceName =
      services.find((service) => service.id === data.service)?.name ||
      (data.service === "accessory"
        ? "Accessory enquiry"
        : "Help choosing a service");
    const summary = buildRequestSummary(
      data,
      serviceName,
      accessory ? product?.name : "",
      sent,
    );
    const review = document.createElement("section");
    review.className = "request-review";
    review.tabIndex = -1;
    review.innerHTML = `<div class="review-icon">${icon("check")}</div><p class="eyebrow">${sent ? "Request submitted" : "Prepared on your device"}</p><h2>${sent ? "Your request has been sent." : "All the details.<br>Ready to review."}</h2>
      <p>${sent ? "Your preferred visit still needs confirmation from the shop." : "This request has not been sent to the shop. No appointment has been booked. Download a copy for your records, or edit the details."}</p>
      <pre>${escapeHtml(summary)}</pre><div class="button-group"><button class="button" data-download-request>Download request ${icon("download")}</button><button class="button button--outline" data-edit-request>Edit details</button></div>`;
    form.hidden = true;
    document.querySelector("#request-container").append(review);
    review.focus();
    review
      .querySelector("[data-download-request]")
      .addEventListener("click", () => downloadRequest(summary));
    review
      .querySelector("[data-edit-request]")
      .addEventListener("click", () => {
        review.remove();
        form.hidden = false;
        form.elements.name.focus();
      });
  });
}
