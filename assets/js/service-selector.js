import { services } from "./service-data.js?v=site-4";
import { bookLink } from "./shared-ui.js?v=site-4";
import { icon } from "./shared-ui.js?v=site-4";

export function initServiceSelector() {
  const container = document.querySelector(".service-selector");
  if (!container) return;
  const show = (id) => {
    const service = services.find((item) => item.id === id);
    container
      .querySelectorAll("[data-issue]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.issue === id),
        ),
      );
    container.querySelector("#service-selection").innerHTML = `
      <div><h3>${service.name}</h3><p>${service.symptoms}</p></div>
      ${bookLink(id, "Start a repair request", "button--text")}`;
  };
  container
    .querySelectorAll("[data-issue]")
    .forEach((button) =>
      button.addEventListener("click", () => show(button.dataset.issue)),
    );
  show(services[0].id);
}
