import { products } from "./product-data.js?v=prices-10";
import { ProductCard, ProductPrice } from "./shared-ui.js?v=prices-10";
import { label, photo, button } from "./shared-ui.js?v=prices-10";

export function filterProducts({
  category = "All essentials",
  query = "",
  sort = "featured",
} = {}) {
  const search = query.trim().toLowerCase();
  const result = products.filter(
    (product) =>
      (category === "All essentials" || product.category === category) &&
      `${product.name} ${product.category} ${product.attribute}`
        .toLowerCase()
        .includes(search),
  );
  const comparators = {
    az: (a, b) => a.name.localeCompare(b.name),
    za: (a, b) => b.name.localeCompare(a.name),
  };
  if (comparators[sort]) result.sort(comparators[sort]);
  return result;
}

export function initProductDetails() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-product]");
    if (!trigger) return;
    const product = products.find(
      (item) => item.id === trigger.dataset.product,
    );
    if (!product) return;
    document.querySelector("#product-dialog-content").innerHTML =
      `<div class="product-detail" data-kind="${product.id}">
      <div class="product-detail__image">${photo(product.image, product.name, "", true)}</div>
      <div class="product-detail__copy">${label(product.category)}<h2>${product.name}</h2>${ProductPrice(product)}<p>${product.description}</p><p class="small">Ask about current availability, device compatibility, and pricing.</p>${button("Enquire about this item", "contact", { product: product.id })}</div></div>`;
    document.querySelector("#product-dialog").showModal();
  });
}

export function initAccessoryCatalog() {
  const catalog = document.querySelector("#product-catalog");
  if (!catalog) return;
  const state = { category: "All essentials", query: "", sort: "featured" };
  const search = document.querySelector("#product-search");
  const sort = document.querySelector("#product-sort");
  const render = () => {
    const list = filterProducts(state);
    document.querySelector("#catalog-count").textContent =
      `${list.length} ${list.length === 1 ? "essential" : "essentials"} to explore`;
    catalog.innerHTML = list.length
      ? list.map(ProductCard).join("")
      : `<div class="empty-state"><h3>Nothing here just yet.</h3><p>Try another search, or take a fresh look at the collection.</p><button class="button button--outline" id="reset-catalog">Reset filters</button></div>`;
    document.querySelector("#reset-catalog")?.addEventListener("click", () => {
      state.category = "All essentials";
      state.query = "";
      state.sort = "featured";
      sort.value = "featured";
      search.value = "";
      document
        .querySelectorAll("[data-category]")
        .forEach((item) =>
          item.setAttribute(
            "aria-pressed",
            String(item.dataset.category === state.category),
          ),
        );
      render();
    });
  };
  search.addEventListener("input", () => {
    state.query = search.value;
    render();
  });
  sort.addEventListener("change", () => {
    state.sort = sort.value;
    render();
  });
  document.querySelectorAll("[data-category]").forEach((button) =>
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      document
        .querySelectorAll("[data-category]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      render();
    }),
  );
  render();
}
