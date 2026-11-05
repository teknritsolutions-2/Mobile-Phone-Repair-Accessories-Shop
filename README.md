# Port & Pixel

A buildless, six-page HTML/CSS/vanilla JavaScript repair-shop website. The structure follows the Waylark repository; the graphite, white, and electric-blue design is original to Port & Pixel.

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173/index.html. No package manager, framework, build, generated output, or custom server is needed. Use a static HTTP server so browser ES modules load correctly.

## Structure

- `index.html` — Home 1, the main repair showroom.
- `pages/home2.html` — guided device-first repair discovery.
- `pages/services.html` — repair information and preparation guide.
- `pages/accessories.html` — searchable, filterable accessory collection.
- `pages/pricing.html` — device-specific estimate guide.
- `pages/contact.html` — repair requests and accessory enquiries.
- `assets/css/` — `fonts.css`, `style.css`, `dark-mode.css`, `rtl.css`.
- `assets/js/` — shared shell, UI helpers, configuration, reusable data, and individual interaction modules.
- `assets/images/` and `assets/fonts/` — local assets and font licenses.
- `documentation/` — architecture, image credits, QA evidence, and optional verification tooling.

All pages are physical HTML files. Their main content is authored directly in HTML. Shared navigation and footer are inserted by a common JavaScript module. Navigation uses relative URLs and works under the GitHub Pages repository subpath and a normal origin root. No server fallback or hostname detection is used.

## Editing

Business details and the optional delivery endpoint: `assets/js/site-config.js`. Blank contact details are omitted.

Reusable service definitions: `assets/js/service-data.js`. Accessory catalog: `assets/js/product-data.js`. Edit page-specific editorial content in the corresponding HTML file. Shared header/footer and dialogs: `assets/js/site-shell.js`. The main stylesheet has labeled component/page sections; dark tokens and semantic RTL adjustments are separate files.

## Request handling

With the submission endpoint blank, form data stays in page memory. Visitors can validate, review, edit, and download a text copy. Nothing is sent, no appointment is confirmed, and personal details are never put into URLs or local storage. Reloading clears entries. Theme and direction preferences alone use local storage.

A production endpoint must accept POST JSON, validate server-side, handle abuse protection and CORS, and return success only after accepting the request. Confirm actual delivery before enabling it. No backend, approved prices, business address, phone number, or opening hours have been supplied. No such details have been invented.

## Hosting

GitHub Pages uses `.github/workflows/deploy.yml` to verify entrypoints and upload the repository's static files directly. There is no dependency-installation or build job. Keep `index.html`, `pages/`, and `assets/` together.

Primary URLs:

- `/Mobile-Phone-Repair-Accessories-Shop/index.html`
- `/Mobile-Phone-Repair-Accessories-Shop/pages/home2.html`
- `/Mobile-Phone-Repair-Accessories-Shop/pages/services.html`
- `/Mobile-Phone-Repair-Accessories-Shop/pages/accessories.html`
- `/Mobile-Phone-Repair-Accessories-Shop/pages/pricing.html`
- `/Mobile-Phone-Repair-Accessories-Shop/pages/contact.html`

See `documentation/verification.md` for tested layouts and interaction coverage. Optional browser QA tooling is not required to run or publish the site.
