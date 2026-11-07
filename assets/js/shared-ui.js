import { formatPrice } from "./product-data.js?v=dropdowns-17";
import { pageUrl, assetUrl, escapeHtml } from "./utils.js?v=dropdowns-17";

const paths = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M5 19 19 5M5 5h14v14"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  screen:
    '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="m13 5-3 6 4 2-3 5m0 1h2"/>',
  battery:
    '<rect x="3" y="7" width="17" height="11" rx="2"/><path d="M22 10v5M7 10v5m4-5v5m4-5v5"/>',
  charging: '<path d="M9 2v4m6-4v4M7 6h10v4a5 5 0 0 1-10 0V6Zm5 9v7"/>',
  software:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m9 8-4 4 4 4m6-8 4 4-4 4"/>',
  camera:
    '<path d="M8 5 10 2h4l2 3h4v16H4V5h4Z"/><circle cx="12" cy="12" r="4"/>',
  audio:
    '<path d="M3 10h4l5-5v14l-5-5H3v-4Zm13-3a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16"/>',
  phone:
    '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/>',
  tablet:
    '<rect x="3" y="2" width="18" height="20" rx="2"/><path d="M11 19h2"/>',
  other:
    '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 1v3m6-3v3M9 20v3m6-3v3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
  moon: '<path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>',
  direction: '<path d="M4 6h16M4 12h10M4 18h16m-3-9 3 3-3 3"/>',
  menu: '<path d="M3 7h18M3 17h18"/>',
  close: '<path d="m5 5 14 14M5 19 19 5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  shield:
    '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m8 11 3 3 5-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

export function icon(name, className = "") {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.phone}</svg>`;
}

export function button(label, page = "contact", params = {}, variant = "") {
  return `<a class="button ${variant}" href="${pageUrl(page, params)}">${label}${icon("arrow", "directional")}</a>`;
}

export function bookLink(id = "", label = "Book a repair", variant = "") {
  return button(label, "contact", { service: id }, variant);
}

export function textLink(label, page, params = {}) {
  return button(label, page, params, "button--text");
}

const imageSizes = {
  "case-catalog.jpg": [1000, 750],
  "cable-catalog.jpg": [1000, 750],
  "protector-catalog.jpg": [1000, 750],
  "earbuds-catalog.jpg": [1000, 750],
  "charger-photo.jpg": [1000, 750],
  "stand-wide.jpg": [1000, 750],
  "audio-hero.jpg": [1000, 750],
  "cable-photo.jpg": [1000, 750],
  "protector-photo.jpg": [1000, 750],
  "charger-desk.jpg": [1000, 750],
  "stand-photo.jpg": [1000, 750],
  "stand.svg": [800, 600],
  "case.jpg": [1000, 750],
  "protector.svg": [700, 600],
  "studio-repair.jpg": [1400, 933],
  "screen-repair.jpg": [1000, 667],
  "charger.jpg": [1000, 669],
  "repair-detail.jpg": [1400, 2100],
  "audio.jpg": [1000, 750],
  "favicon.svg": [40, 40],
  "cable.svg": [800, 600],
};

export function photo(file, alt, className = "", eager = false) {
  const [width, height] = imageSizes[file] || [];
  const dimensions = width ? `width="${width}" height="${height}"` : "";
  return `<img ${dimensions} class="${className}" src="${assetUrl(file)}" alt="${escapeHtml(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />`;
}

export function label(text) {
  return `<p class="eyebrow">${text}</p>`;
}

export function sectionHeading(kicker, title, right = "") {
  return `<div class="section-heading"><div>${label(kicker)}<h2>${title}</h2></div>${right}</div>`;
}

export function Logo() {
  return `<a class="brand" href="${pageUrl()}" aria-label="Port and Pixel home">
    <svg class="brand-mark" viewBox="0 0 34 40" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="24" height="34" rx="5" stroke="currentColor" stroke-width="2.5"/>
      <path d="M12 3v5h10V3M12 31h10M17 15v10m-4-6h8" stroke="currentColor" stroke-width="2.5"/>
    </svg>
    <span class="brand-name">port<span class="brand-amp">&</span>pixel<span class="brand-dot">.</span></span>
  </a>`;
}

export function ProductPrice(product) {
  return `<p class="product-price"><bdi>${formatPrice(product.price)}</bdi><small>Indicative price</small></p>`;
}

export function ProductCard(product) {
  return `<article class="product-card" data-kind="${product.id}">
    <button class="product-card__visual" data-product="${product.id}" aria-label="View details for ${product.name}">
      ${photo(product.image, product.name)}
    </button>
    <p class="product-card__category">${product.category}</p>
    <h3><button class="plain-link" data-product="${product.id}">${product.name}${icon("plus")}</button></h3>
    <p class="product-card__attribute">${product.attribute}</p>
    ${ProductPrice(product)}
    ${textLink("Enquire", "contact", { product: product.id })}
  </article>`;
}
