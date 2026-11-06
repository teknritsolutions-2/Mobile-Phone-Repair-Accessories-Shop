# Steel & Ice refinement verification

November 6, 2026. The six physical HTML pages and existing CSS/vanilla JavaScript architecture are preserved.

## Reproduced issue and fixes

An actual browser scroll of 900px put the old header at -900px: the nested sticky header was constrained by its 81px parent. Sticky positioning now belongs to `#site-header`, while the injected header establishes menu positioning. All six pages are tested after 650px scrolling at every required width; their header top remains 0px. Anchor scroll padding clears the header.

The footer back-to-top action was removed. Its replacement is a body-level fixed control, shown above 400px and hidden near the top or while the mobile menu is open. Logical inline positioning supports RTL; safe-area offsets, focus indication, keyboard activation, and reduced-motion handling are present. On long pages, the smooth-scroll assertion waits for completion instead of relying on a fixed delay.

Home 2 now includes the finder, a six-issue browser, native portrait repair spotlight, interactive illustrated symptom/approach/function checks, three priced accessory previews, a three-step process, four FAQs, and final booking invitation. Demonstrations are explicitly illustrative, with no fabricated customer outcomes. Services has a distinct power-repair pair and lighter secondary listings. Pricing has a shorter connected result. Contact retains validation and local review/edit/download, with a concise sticky desktop pre-visit guide.

Accessory sample amounts live only in `product-data.js` and use one INR formatter. Cards, both homepage previews, and dialogs share the same values and sample labels. Numeric price sorts work together with category and search. Repair estimates remain quotation-based; no actual selling prices or booking delivery are claimed.

## Actual checks

Brave/Chromium: six pages × six widths (320, 390, 768, 1024, 1280, 1440) × light/dark × LTR/RTL = 144 layout cases, with no overflow, broken images, heading/action clipping, JavaScript errors, or failed requests. Scroll checks verify the sticky header and floating-control threshold separately on all 36 page/width combinations.

The browser suite exercises Home dropdown and keyboard focus, mobile navigation and scroll lock, theme/direction persistence, repair selector, finder and booking context, journey, new demonstration examples and FAQs, all service booking actions, all sample prices, numeric sorting with combined filters, reset, modal price matching, product enquiry, pricing device context, required/email/phone/date/consent errors, local review/download/edit, privacy dialogs, floating back-to-top with keyboard and reduced motion, page refreshes, and rendered internal links.

Before screenshots were captured at 390/768/1440px. After screenshots cover 390/768/1024/1440px in light and dark, plus representative RTL. Actual compositions were viewed directly. Review corrected overly long mobile product rows, portrait-image letterboxing, a cramped mobile demonstration, repeated estimate text, and the verbose pre-visit sidebar. Source sizes and rendered image measurements at four widths, plus all six product modals, are recorded outside the repository in `/private/tmp/pp4-*`. See `image-credits.md` for the source/framing audit.

Dependency-free checks:

```sh
python3 documentation/check-static.py
node documentation/check-behavior.mjs
```

The optional browser suite remains outside the public artifact, with screenshots and raw reports stored outside the repository. GitHub Pages deploys the same physical HTML and assets without a build or package installation. Release verification checks the actual Actions run and published files before claiming live verification.

## Limits

No real submission endpoint is configured: requests stay local and visits need confirmation. Actual request delivery, Safari, Firefox, physical devices, and screen-reader sessions remain unverified. Old bookmarks use the documented `404.html` map; current navigation uses physical files directly.

## Services real-photo gallery

The Services page now uses an open photographic collection with all six repair types visible, replacing the previous accordion, device diagram, and split hero. Desktop uses three columns, tablet two, and mobile one. Each repair has a distinct real photograph, a concise description, and direct booking/estimate links. The obsolete service-directory JavaScript and its CSS were removed.

No AI-generated images are used. The chosen real sources are five Pexels photographs and a Wikimedia Commons component photograph. The speaker/microphone attribution, license, source, and resize notice are accessible from the live page. See `image-credits.md` for exact source files. Important subjects retain source framing with contain fitting and no hover zoom.

Verification includes all six image/service mappings, direct anchors, every booking prefill, accessible photo credits, and the existing responsive, theme, direction, navigation, catalog, and request checks. Real browser screenshots are stored outside the repository under `/private/tmp/pp-services-gallery/`.
