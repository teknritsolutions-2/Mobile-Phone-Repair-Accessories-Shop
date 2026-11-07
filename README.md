# Port & Pixel

A seven-page precision repair showroom in HTML5, CSS3, and vanilla JavaScript. Steel & Ice: desaturated blue-gray, ice, and white; self-hosted Archivo and Inter. The conventional file organization follows the approved Waylark reference.

## Run

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`. No installation, framework, build, or custom server is required. Use HTTP so browser ES modules load.

## Structure

- `index.html`: Home 1 repair showroom.
- `pages/home2.html`: photographic opening banner, service browser, screen-repair spotlight, middle-page repair finder, accessory preview, three-step process, FAQs, and booking.
- `pages/about.html`: the shop’s purpose, repair approach, care principles, and service scope.
- `pages/services.html`: real-photo service gallery, six visible repair categories, booking/estimate links, and visit FAQs.
- `pages/accessories.html`: searchable, filterable product collection.
- `pages/pricing.html`: connected service/device estimate guide.
- `pages/contact.html`: repair requests and accessory enquiries.
- `assets/css/`: local fonts, shared/responsive styles, dark theme, RTL adjustments.
- `assets/js/`: shared shell, feature modules, service/product data, configuration.
- `assets/images/`, `assets/fonts/`: local assets and font licenses.
- `documentation/`: credits and optional verification tools, excluded from deployment.

Main content is physical HTML. JavaScript inserts the common header/footer and enables interactions. All primary links use physical files and relative URLs, including on the GitHub Pages repository subpath.

## Editing and request delivery

Edit business details and the optional submission endpoint in `assets/js/site-config.js`; blank contact details are omitted. Service and product data have separate readable modules. Accessories use temporary indicative INR prices in `product-data.js`, shared by previews, cards, and dialogs. Alphabetical sorting combines with search and categories. Final pricing and compatibility are confirmed on enquiry. Repair estimates remain quotation-based. No warranties, turnaround promises, or business contact details have been invented.

Without an endpoint, request details stay in page memory. Visitors can validate, review, edit, and download a text copy. Nothing is delivered and no appointment is confirmed. Reloading clears entries. Only theme and direction preferences use local storage. A configured endpoint must accept POST JSON, validate server-side, and confirm actual acceptance before the UI reports delivery.

## GitHub Pages

The Actions workflow checks all seven pages, local references, JavaScript syntax, and request/catalog behavior. It copies only `index.html`, `404.html`, `.nojekyll`, `pages/`, and `assets/` into the public artifact. This is static file collection, with no build or dependencies. Tests, documentation, and screenshots are not published.

Old `/services`, `/accessories`, `/pricing`, `/contact`, `/home-2`, and `/home2` bookmarks use one compatibility map in `404.html`. It preserves queries and anchors and redirects only recognized paths to physical pages. GitHub initially returns HTTP 404 for these old bookmarks before the browser redirect; current physical page URLs return 200 directly. Unknown paths show a helpful homepage link. There are no route-mirror directories.

Optional checks and actual verification coverage are in `documentation/verification.md`. Image sources and font licenses are recorded in `documentation/image-credits.md`.

## Global behavior

`#site-header` is the sticky host, so its injected header is not confined by a short parent. Anchors allow for the header height. A document-level floating back-to-top control appears after 400px, hides with the mobile menu, uses logical RTL positioning and safe-area offsets, and honors reduced-motion preferences.
