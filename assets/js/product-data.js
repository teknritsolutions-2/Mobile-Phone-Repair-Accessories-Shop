export const products = [
  {
    id: "case",
    samplePrice: 399,
    name: "Protective phone case",
    category: "Cases & Protection",
    image: "case.jpg",
    attribute: "Everyday protection · Model-specific fit",
    description:
      "A comfortable everyday layer for your phone. Ask about available colors and fit for your exact device.",
  },
  {
    id: "cable",
    samplePrice: 299,
    name: "USB-C cable",
    category: "Chargers & Cables",
    image: "cable.svg",
    attribute: "USB-C · Everyday connection",
    description:
      "Practical connection options for your daily setup. Confirm connector compatibility, length, and charging capability before purchase.",
  },
  {
    id: "glass",
    samplePrice: 249,
    name: "Screen protector",
    category: "Screen Protectors",
    image: "protector.svg",
    attribute: "Clear finish · Model-specific fit",
    description:
      "An extra layer for the display you use every day. Ask about compatible options and fitting for your phone.",
  },
  {
    id: "earbuds",
    samplePrice: 1499,
    name: "Wireless earbuds",
    category: "Audio",
    image: "audio.jpg",
    attribute: "Wireless · Compact charging case",
    description:
      "Pocket-friendly audio for calls and your daily soundtrack. Available models, features, and compatibility are confirmed on enquiry.",
  },
  {
    id: "charger",
    samplePrice: 699,
    name: "Wall charger",
    category: "Chargers & Cables",
    image: "charger.jpg",
    attribute: "Compact design · USB charging",
    description:
      "A tidy addition to your charging setup. Confirm supported power output and regional plug options with the shop.",
  },
  {
    id: "stand",
    samplePrice: 349,
    name: "Desk phone stand",
    category: "Everyday Essentials",
    image: "stand.svg",
    attribute: "Desktop companion · Upright design",
    description:
      "Keep your screen comfortably in view at your desk. Ask about dimensions and compatibility with your device and case.",
  },
];

// All displayed prices are illustrative INR amounts from this single source.
export function formatSamplePrice(product) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.samplePrice);
}
