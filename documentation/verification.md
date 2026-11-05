# Redesign and static migration verification

Verified November 5, 2026 using headless Brave (Chromium) through Playwright.

## Architecture

The requested Waylark repository was inspected through GitHub: root `index.html`, physical pages under `pages/`, the four CSS files under `assets/css/`, shared JavaScript under `assets/js/`, and local images/fonts. Port & Pixel follows that structure without adopting Waylark's visual identity.

The old `dist` source tree, custom Node server, package files, obsolete assets, and intermediate Vite/source structure have been removed. There is no build or dependency-installation step. The existing GitHub Pages workflow now checks the six HTML entrypoints and uploads the repository root.

## Visual checks

Nine before screenshots were captured across 390px, 768px, and 1440px for the previous homepage, catalog, and booking page. The main weaknesses were small supporting text, repetitive split layouts, flat product presentation, and image proportions.

After screenshots were captured for every redesigned page at 390px, 768px, and 1440px in both themes, with additional mobile RTL samples. Visual review covered all six pages, their distinct section types, both themes, and mobile/tablet/desktop layouts. Corrections included the retail feature's height, narrow pricing layout, photography selection, and mobile menu event handling.

Automated layout checks covered six pages × six widths (320, 390, 768, 1024, 1280, 1440) × two themes × two reading directions: 144 combinations. Final result: no document overflow, out-of-bounds primary headings/buttons, broken images, failed asset requests, or uncaught JavaScript errors.

## Interaction checks

- Desktop Home dropdown and links to physical pages.
- Device, issue, and symptom finder with booking context.
- Homepage repair selector and interactive repair journey.
- All six service booking links and FAQ expansion.
- Catalog category/search/sort/reset and no-match state.
- Product details, Escape closing, and accessory enquiry preselection.
- Pricing category/device selection and estimate links.
- Required/email/phone/date/consent validation.
- Honest local request review, download, and editing.
- Mobile menu/submenu, outside/Escape closing, background scroll lock.
- Persistent dark/light and RTL/LTR preferences across navigation.
- Privacy dialog and back-to-top behavior.
- Every rendered internal link, direct visits, and refreshes under the exact GitHub Pages repository subpath.
- All six pages at a normal origin root.

The final machine-readable browser result is `verification.json`.

## Repeating checks

Run from the project root:

```sh
python3 documentation/check-static.py
node documentation/check-behavior.mjs
```

The static check validates all six physical files, local HTML/CSS/JS references, JavaScript syntax, local fonts, unique HTML IDs, and removal of obsolete architecture. The behavior check uses only Node's standard library for form validation, safe text rendering, relative URLs, and catalog logic. Neither command is needed to serve or publish the website.

`browser-check.mjs` is optional QA tooling. It expects Playwright to be installed separately, outside the website. Set `PLAYWRIGHT_MODULE` to that installation's module path if needed, `BROWSER_EXECUTABLE` to a local Chromium executable if needed, and `QA_BASE_URL` to a running static site. `QA_ROOT_URL` optionally tests an additional origin-root server. `QA_OUTPUT_DIR` selects an external screenshot/report directory. No project package manager or build step is introduced.

## Limits

Verification was local, including a static server mounted at `/Mobile-Phone-Repair-Accessories-Shop/`; no push or live GitHub Actions deployment was triggered. The production Pages deployment remains unverified until the changes are published. Safari and Firefox were not tested. Booking delivery remains unconfigured and was not represented as working; requests remain local. Actual shop details and approved prices still need owner configuration.
