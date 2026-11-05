# Layout repair and GitHub Pages verification

November 5, 2026. The approved buildless HTML/CSS/JavaScript structure is preserved.

## Production investigation before edits

GitHub Actions run `42007048892` completed successfully for commit `483a40c99a5294de025a42afc778f67860cbf775`. The actual Pages settings report workflow deployment, branch `main`, repository root. Live browser visits and refreshes returned 200 for the homepage and all five `pages/*.html` files, with no failed asset requests or JavaScript errors.

The old `/services`, `/home-2`, `/accessories`, `/pricing`, and `/contact` URLs returned 404. These obsolete bookmarks were a reproducible navigation failure. Static directory-index redirect files now take them to the correct physical pages. `/home2` is supported as well. Query strings and hashes are preserved by the redirect script. `404.html` recognizes only the known old paths and provides a usable fallback for unknown pages.

## Page-by-page work

- **Home 1:** replaced the panoramic image and oversized heading with a balanced workshop composition; kept the complete technician, phone, and tools in a natural 3:2 frame. Made issue choices compact and connected their result to booking. Rebuilt the repair feature, reduced the workflow treatment, replaced the tall retail image with product displays, and tightened the trust/estimate/closing sections.
- **Home 2:** rebuilt the device controls and result spacing; used full-width choices/results at tablet to prevent a tall empty sidebar. Converted symptoms to a two-column index with its heading above. Kept the battery spotlight's portrait photograph at its natural ratio, beside a concise breakdown. Simplified the care section.
- **Services:** retained the category navigator while recomposing the screen service around a full portrait image and readable explanations. Removed the previous wide crop, improved power-service hierarchy, and tightened secondary service rows. Tablet navigation becomes a scrollable category strip.
- **Accessories:** built a two-product hero with complete products visible. Standardized product frames with contain fitting and compact padding, shortened product names, and used readable mobile product rows. Replaced the tall cable editorial with an appropriately framed landscape charging image and concise compatibility guidance.
- **Pricing:** joined controls and results in one surface, removed redundant estimate text, and moved tablet controls above the result. Each model still requires an individual quotation. Reduced the cost-factor and FAQ spacing.
- **Contact:** gave the introduction a concise local-handling explanation, balanced the form against a lighter pre-visit sidebar, grouped contact fields without an orphan half-row, and reduced fieldset gaps. Review, editing, and download remain local and honest.

Global changes include a 17px desktop / 16px mobile body, 15–16px action and form labels, context-specific image rules, a consistent 1200px maximum container, shorter content-driven sections, full-width FAQ lists, logical RTL spacing, and cleanup of superseded styles. The broad `img` cover/100%-height rule has been removed. No image is enlarged beyond its source's native width in the normal layouts.

## Actual browser review

Before screenshots of all six live pages were captured at 390px, 768px, and 1440px. After screenshots of all six redesigned pages were captured at the same widths in light and dark mode. Additional dark RTL samples covered Services and Contact. Individual images, typography, grid proportions, and section spacing were reviewed, rather than relying only on overflow checks. This review drove further corrections to the symptom index, tablet pricing, FAQ layout, and hidden-linebreak spacing.

The final local browser suite covered six pages × six widths (320, 390, 768, 1024, 1280, 1440) × two themes × two reading directions: 144 layout combinations. It also exercised navigation, dropdowns, the mobile menu, preference persistence, issue selection, the guided finder, the repair journey, service prefill, catalog categories/search/sort/reset/details, accessory context, pricing selections, form validation, request review/download/edit, FAQs, dialog closing, and back-to-top. It checks direct visits, refreshes, and all rendered internal links. Machine-readable results are in `verification.json`.

Screenshots and raw runtime reports are kept outside the published source to avoid serving test artifacts. `browser-check.mjs` accepts `QA_BASE_URL`, `QA_ROOT_URL`, `QA_OUTPUT_DIR`, `PLAYWRIGHT_MODULE`, and `BROWSER_EXECUTABLE` so the same checks can run against the actual GitHub Pages URL after publication. Delivery also verifies the published HTML matches the source and the deployment run corresponds to the pushed commit.

## Repeatable dependency-free checks

```sh
python3 documentation/check-static.py
node documentation/check-behavior.mjs
```

These validate physical HTML references, local fonts/images/module imports, syntax, architecture cleanup, request handling, relative links, safe rendering, and catalog behavior. Neither is a build step. The GitHub Pages workflow now runs them before upload.

## Remaining business configuration

No real booking endpoint or business contact details have been provided. Requests stay in page memory until a delivery endpoint is configured; no appointment is confirmed. Approved prices are not invented. Verification uses Chromium; Safari and Firefox remain untested.
