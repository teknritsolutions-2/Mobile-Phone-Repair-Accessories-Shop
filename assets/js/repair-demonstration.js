import { icon, bookLink } from "./shared-ui.js";

const examples = {
  screen: {
    before: "Cracks or missed touches",
    after: "Display & touch response",
    approach:
      "Inspect the assembly and discuss compatible replacement options.",
    check: "Check touch across the display, image clarity, and brightness.",
    fault: '<path d="m60 45-18 37 30 19-19 37"/>',
  },
  battery: {
    before: "Rapid drain or shutdowns",
    after: "Battery & power behavior",
    approach: "Review battery health and rule out other power faults.",
    check: "Check charging response and battery behavior after the work.",
    fault:
      '<rect x="35" y="65" width="48" height="32" rx="4"/><path d="M86 74v14M42 72v18"/>',
  },
  charging: {
    before: "An unreliable connection",
    after: "Port & charging response",
    approach:
      "Check the cable, connector, and power path before proposing a repair.",
    check:
      "Check connector fit and consistent charging with compatible equipment.",
    fault:
      '<path d="M49 62v12m14-12v12M43 74h26v12a13 13 0 0 1-26 0V74Zm13 25v23"/>',
  },
};
function device(mark) {
  return `<svg class="demo-device" viewBox="0 0 120 180" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="20" y="7" width="80" height="166" rx="14"/><path d="M47 19h26M52 159h16"/>${mark}</svg>`;
}
export function initRepairDemonstration() {
  const result = document.querySelector("#repair-demonstration");
  if (!result) return;
  const show = (id) => {
    const example = examples[id];
    document
      .querySelectorAll("[data-demo]")
      .forEach((button) =>
        button.setAttribute("aria-pressed", String(button.dataset.demo === id)),
      );
    result.innerHTML = `<div class="demo-state">${device(example.fault)}<div><p class="eyebrow">Reported symptom</p><h3>${example.before}</h3></div></div>
      <div class="demo-approach">${icon("search")}<h3>The repair approach</h3><p>${example.approach}</p>${bookLink(id, "Explore this repair", "button--text")}</div>
      <div class="demo-state demo-state--check">${device('<path d="m39 86 14 14 29-32"/>')}<div><p class="eyebrow">Function to check</p><h3>${example.after}</h3><p>${example.check}</p></div></div>`;
  };
  document
    .querySelectorAll("[data-demo]")
    .forEach((button) =>
      button.addEventListener("click", () => show(button.dataset.demo)),
    );
  show("screen");
}
