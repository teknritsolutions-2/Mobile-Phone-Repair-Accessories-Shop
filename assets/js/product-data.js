export const products = [
  {
    id: "case",
    price: 449,
    name: "Protective phone case",
    category: "Cases & Protection",
    image: "case-catalog.jpg",
    previewImage: "case.jpg",
    attribute: "Everyday protection · Model-specific fit",
    description:
      "A comfortable everyday layer for your phone. Ask about available colors and fit for your exact device.",
  },
  {
    id: "cable",
    price: 299,
    name: "USB-C cable",
    category: "Chargers & Cables",
    image: "cable-catalog.jpg",
    previewImage: "cable-photo.jpg",
    attribute: "USB-C · Everyday connection",
    description:
      "Practical connection options for your daily setup. Confirm connector compatibility, length, and charging capability before purchase.",
  },
  {
    id: "glass",
    price: 179,
    name: "Screen protector",
    category: "Screen Protectors",
    image: "protector-catalog.jpg",
    previewImage: "protector-photo.jpg",
    attribute: "Clear finish · Model-specific fit",
    description:
      "An extra layer for the display you use every day. Ask about compatible options and fitting for your phone.",
  },
  {
    id: "earbuds",
    price: 1299,
    name: "Wireless earbuds",
    category: "Audio",
    image: "earbuds-catalog.jpg",
    previewImage: "audio.jpg",
    attribute: "Wireless · Compact charging case",
    description:
      "Pocket-friendly audio for calls and your daily soundtrack. Available models, features, and compatibility are confirmed on enquiry.",
  },
  {
    id: "charger",
    price: 649,
    name: "Wall charger",
    category: "Chargers & Cables",
    image: "charger-photo.jpg",
    previewImage: "charger-desk.jpg",
    attribute: "Compact design · USB charging",
    description:
      "A tidy addition to your charging setup. Confirm supported power output and regional plug options with the shop.",
  },
  {
    id: "stand",
    price: 399,
    name: "Desk phone stand",
    category: "Everyday Essentials",
    image: "stand-catalog.jpg",
    previewImage: "stand-photo.jpg",
    attribute: "Desktop companion · Upright design",
    description:
      "Keep your screen comfortably in view at your desk. Ask about dimensions and compatibility with your device and case.",
  },
];

// Temporary indicative INR prices, editable in the product records above.
export function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
