import { products } from "./product-data.js?v=dropdown-startup-19";
import { ProductCard } from "./shared-ui.js?v=dropdown-startup-19";

export function initProductPreviews() {
  document.querySelectorAll("[data-product-preview]").forEach((preview) => {
    preview.innerHTML = preview.dataset.productPreview
      .split(",")
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)
      .map((product) =>
        ProductCard({ ...product, image: product.previewImage }),
      )
      .join("");
  });
}
