export function initServiceDirectory() {
  const entries = [...document.querySelectorAll(".repair-service")];
  if (!entries.length) return;
  const shortcuts = [...document.querySelectorAll(".repair-shortcuts a")];
  let active = "";
  function select(id, updateUrl = false) {
    const entry = entries.find((item) => item.id === id);
    if (!entry) return;
    active = id;
    entries.forEach((item) => {
      item.open = item === entry;
    });
    shortcuts.forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    document
      .querySelectorAll("[data-component]")
      .forEach((part) =>
        part.classList.toggle("is-active", part.dataset.component === id),
      );
    document.querySelector("#repair-area").textContent = entry.dataset.area;
    document.querySelector("#repair-index").textContent =
      `0${entries.indexOf(entry) + 1} / 06`;
    if (updateUrl) history.replaceState(null, "", `#${id}`);
  }
  entries.forEach((entry) =>
    entry.addEventListener("toggle", () => {
      if (entry.open && entry.id !== active) select(entry.id, true);
    }),
  );
  shortcuts.forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const id = link.hash.slice(1);
      select(id);
      history.pushState(null, "", `#${id}`);
      const entry = document.getElementById(id);
      entry.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      entry.querySelector("summary").focus({ preventScroll: true });
    }),
  );
  addEventListener("hashchange", () => select(location.hash.slice(1)));
  select(
    entries.some((entry) => `#${entry.id}` === location.hash)
      ? location.hash.slice(1)
      : "screen",
  );
}
