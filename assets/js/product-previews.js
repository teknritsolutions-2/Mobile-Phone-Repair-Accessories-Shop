import { products } from "./product-data.js?v=cards-14";
import { ProductCard } from "./shared-ui.js?v=cards-14";

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
