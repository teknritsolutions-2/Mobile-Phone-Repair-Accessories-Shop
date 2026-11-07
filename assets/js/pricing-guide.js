import { services } from "./service-data.js?v=dropdowns-17";
import { label } from "./shared-ui.js?v=dropdowns-17";
import { pageUrl } from "./utils.js?v=dropdowns-17";
import { icon } from "./shared-ui.js?v=dropdowns-17";

export function initPricingGuide() {
  const panel = document.querySelector("#estimate-panel");
  if (!panel) return;
  const requested = new URLSearchParams(location.search).get("service");
  let selected =
    services.find((service) => service.id === requested)?.id || services[0].id;
  const device = document.querySelector("#price-device");
  const render = () => {
    const service = services.find((item) => item.id === selected);
    document
      .querySelectorAll("[data-price-service]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.priceService === selected),
        ),
      );
    panel.innerHTML = `<article class="estimate-detail">${label("Your repair / " + device.value)}
      <div class="estimate-detail__heading"><h2>${service.name}</h2>${icon(service.id)}</div>
      <div class="quotation-status"><span></span>Device-specific quotation</div>
      <dl><div><dt>What shapes the estimate</dt><dd>${service.factors}</dd></div><div><dt>What happens next</dt><dd>Confirm the total, parts options, and timing after assessment. ${device.value !== "Smartphone" ? "Support for this device category is subject to confirmation." : ""}</dd></div></dl>
      <a class="button" href="${pageUrl("contact", { service: selected, device: device.value })}">Request your estimate ${icon("arrow", "directional")}</a>
    </article>`;
  };
  document.querySelectorAll("[data-price-service]").forEach((button) =>
    button.addEventListener("click", () => {
      selected = button.dataset.priceService;
      render();
    }),
  );
  device.addEventListener("change", render);
  render();
}
