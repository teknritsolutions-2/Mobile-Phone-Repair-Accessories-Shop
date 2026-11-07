import { products } from "./product-data.js?v=credits-13";
import { ProductCard } from "./shared-ui.js?v=credits-13";

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
