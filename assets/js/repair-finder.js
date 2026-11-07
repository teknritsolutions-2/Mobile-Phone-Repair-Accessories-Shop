import { services } from "./service-data.js?v=accessories-9";
import { pageUrl, escapeHtml } from "./utils.js?v=accessories-9";
import { icon } from "./shared-ui.js?v=accessories-9";
import { label } from "./shared-ui.js?v=accessories-9";

export const symptoms = {
  screen: [
    "Cracked glass",
    "Display does not respond",
    "Flickering or black spots",
  ],
  battery: ["Drains quickly", "Unexpected shutdowns", "Does not hold a charge"],
  charging: [
    "No charging response",
    "Loose cable connection",
    "Charging cuts in and out",
  ],
  software: ["Slow performance", "Apps keep crashing", "Repeated restarts"],
  camera: ["Photos look blurry", "Camera preview is black", "Lens is damaged"],
  audio: ["Quiet speaker", "Microphone not heard", "Distorted playback"],
};

export function initRepairFinder() {
  if (!document.querySelector("#repair-finder")) return;
  let device = "Smartphone";
  const problem = document.querySelector("#finder-problem");
  const symptom = document.querySelector("#finder-symptom");
  const update = (reset = false) => {
    const service = services.find((item) => item.id === problem.value);
    if (reset)
      symptom.innerHTML = symptoms[service.id]
        .map((text) => `<option>${text}</option>`)
        .join("");
    const href = pageUrl("contact", {
      service: service.id,
      device,
      symptom: symptom.value,
    });
    document.querySelector("#finder-result").innerHTML =
      `${label("Your next step")}${icon(service.id)}<h2>${service.name}</h2><p>${service.detail}</p>
      <div class="finder-summary"><span>${escapeHtml(device)}</span><strong>${escapeHtml(symptom.value)}</strong></div>
      <a class="button" href="${href}">Continue to booking ${icon("arrow", "directional")}</a>
      <p class="small">Device support, parts, and timing are confirmed after assessment.</p>`;
  };
  document.querySelectorAll("[data-device]").forEach((button) =>
    button.addEventListener("click", () => {
      device = button.dataset.device;
      document
        .querySelectorAll("[data-device]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      update();
    }),
  );
  problem.addEventListener("change", () => update(true));
  symptom.addEventListener("change", () => update());
  update(true);
}
