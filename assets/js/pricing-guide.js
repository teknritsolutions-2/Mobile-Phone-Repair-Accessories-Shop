import { services } from "./service-data.js";
import { bookLink, label } from "./shared-ui.js";
import { icon } from "./shared-ui.js";

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
      <p>${service.detail}</p>
      <dl><div><dt>What shapes the estimate</dt><dd>${service.factors}</dd></div><div><dt>What happens next</dt><dd>Share your exact model and symptoms. A physical assessment may be needed to confirm the issue and the proposed work.</dd></div><div><dt>Before you decide</dt><dd>Confirm the total cost, available component options, and expected timing. ${device.value !== "Smartphone" ? "Support for this device category is subject to confirmation." : "Repair work starts after you agree to the scope."}</dd></div></dl>
      ${bookLink(selected, "Request your estimate")}
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
