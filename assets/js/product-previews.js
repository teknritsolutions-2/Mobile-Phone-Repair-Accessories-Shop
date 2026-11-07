import { products } from "./product-data.js?v=photos-7";
import { ProductCard } from "./shared-ui.js?v=photos-7";

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
