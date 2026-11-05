// All page links are relative to the current physical HTML file.
export function pageUrl(page = "", params = {}) {
  const prefix = document.body.dataset.page === "home" ? "" : "../";
  const file = page
    ? `pages/${page === "home-2" ? "home2" : page}.html`
    : "index.html";
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value),
  );
  return `${prefix}${file}${query.size ? `?${query}` : ""}`;
}

export function assetUrl(file) {
  return `${document.body.dataset.page === "home" ? "" : "../"}assets/images/${file}`;
}

export function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

export function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Preferences remain optional. */
  }
}
