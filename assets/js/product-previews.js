import { products } from "./product-data.js?v=charger-11";
import { ProductCard } from "./shared-ui.js?v=charger-11";

export function initProductPreviews() {
  document.querySelectorAll("[data-product-preview]").forEach((preview) => {
    preview.innerHTML = preview.dataset.productPreview
      .split(",")
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)
      .map(ProductCard)
      .join("");
  });
}
