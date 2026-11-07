# Steel & Ice refinement verification

November 6, 2026. The six physical HTML pages and existing CSS/vanilla JavaScript architecture are preserved.

## Reproduced issue and fixes

An actual browser scroll of 900px put the old header at -900px: the nested sticky header was constrained by its 81px parent. Sticky positioning now belongs to `#site-header`, while the injected header establishes menu positioning. All six pages are tested after 650px scrolling at every required width; their header top remains 0px. Anchor scroll padding clears the header.

The footer back-to-top action was removed. Its replacement is a body-level fixed control, shown above 400px and hidden near the top or while the mobile menu is open. Logical inline positioning supports RTL; safe-area offsets, focus indication, keyboard activation, and reduced-motion handling are present. On long pages, the smooth-scroll assertion waits for completion instead of relying on a fixed delay.

Home 2 opens with a real photographic banner, then the service browser, portrait repair spotlight, middle-page repair finder, accessory enquiries, process, FAQs, and booking. The illustrated demonstration and its JavaScript/CSS are removed. The former banner is retained as the middle-page finder, with a proper section heading instead of another h1. Navigation still uses the explicitly requested Home 1/Home 2 labels; page content does not.

Accessory cards, homepage previews, and dialogs say “Price on enquiry.” Sample amounts and numeric price sorting have been removed rather than presented as real selling prices. Search, category filters, alphabetical sorting, product dialogs and enquiry prefills remain functional. Repair estimates stay quotation-based; booking delivery is unchanged.

## Actual checks

Brave/Chromium: six pages × six widths (320, 390, 768, 1024, 1280, 1440) × light/dark × LTR/RTL = 144 layout cases, with no overflow, broken images, heading/action clipping, JavaScript errors, or failed requests. Scroll checks verify the sticky header and floating-control threshold separately on all 36 page/width combinations.

The browser suite exercises Home dropdown and keyboard focus, mobile navigation and scroll lock, theme/direction persistence, repair selector, finder and booking context, journey, the photographic banner and relocated finder, FAQs, all service booking actions, enquiry pricing, alphabetical sorting with combined filters, reset, modal enquiry messaging, product enquiry, pricing device context, required/email/phone/date/consent errors, local review/download/edit, privacy dialogs, floating back-to-top with keyboard and reduced motion, page refreshes, and rendered internal links.

Before screenshots were captured at 390/768/1440px. After screenshots cover 390/768/1024/1440px in light and dark, plus representative RTL. Actual compositions were viewed directly. Review corrected overly long mobile product rows, portrait-image letterboxing, a cramped mobile demonstration, repeated estimate text, and the verbose pre-visit sidebar. Source sizes and rendered image measurements at four widths, plus all six product modals, are recorded outside the repository in `/private/tmp/pp4-*`. See `image-credits.md` for the source/framing audit.

Dependency-free checks:

```sh
python3 documentation/check-static.py
node documentation/check-behavior.mjs
```

The optional browser suite remains outside the public artifact, with screenshots and raw reports stored outside the repository. GitHub Pages deploys the same physical HTML and assets without a build or package installation. Release verification checks the actual Actions run and published files before claiming live verification.

## Limits

No real submission endpoint is configured: requests stay local and visits need confirmation. Actual request delivery, Safari, Firefox, physical devices, and screen-reader sessions remain unverified. Old bookmarks use the documented `404.html` map; current navigation uses physical files directly.

## Services layout and dimension correction

Services now uses six full-width editorial rows with alternating photo/text placement on desktop and tablet, stacking photo before text on mobile. This replaces the outlined three-column cards, padded mounts, and singled-out dark card. A centered introduction and a compact repair index lead into the rows. Each row keeps symptoms and booking/cost actions visible.

All six real photograph files are exactly 1200×800, with matching HTML dimensions and a 3:2 rendered ratio. A new software-update photograph replaces the previous 1200×904 image; a controlled background trim preserves the complete phone. Photos display edge to edge without padded frames or hover zoom. Exact sources and framing decisions are documented in `image-credits.md` and credited on the published page.

Static and behavior checks pass. The browser suite passes 144 layout/theme/direction combinations and checks native dimensions plus equal rendered image widths/heights at all six screen widths. All six service booking prefills and keyboard-accessible source credits pass. Visual review covers desktop, tablet and mobile in light and dark modes. Screenshots and reports remain outside the repository under `/private/tmp/pp-service-rows/`.

## Expanded shared footer

The footer now has 16 directory links grouped into Explore, Repair services, and Plan your visit, plus a repair-finder link in the brand introduction. All six physical pages and all six repair anchors are reachable. New section IDs link directly to repair FAQs, the repair process, and pre-visit guidance; booking links reach the existing form. No placeholder pages or contact details were added.

The desktop footer uses four columns; tablet places the introduction above three link groups, and mobile uses two link columns with a separate visit-planning row. Light/dark and RTL layouts pass the existing 144-case browser suite. A focused browser check verifies all footer destinations and fragments from each of the six pages, the privacy dialog, and screenshots at 390/768/1440px. Evidence is outside the repository in `/private/tmp/pp-footer/`. Updated stylesheet and module URLs refresh the shared footer for returning visitors; static checks resolve query-versioned module imports.

Explore now lists Home 1, Home 2, About, Services, Accessories, and Contact in that order. About targets the existing studio introduction (`index.html#about`). Repair services and Plan your visit retain their existing links. Focused browser verification checks all footer destinations and fragments across the six physical pages.

## Home 2 banner and demo-content cleanup

The new opening uses a locally hosted, real Pexels repair photograph with dark directional gradients, a prominent headline, repair-booking and finder links, and a mobile treatment that retains the whole 3:2 image. The image and copy placement were reviewed at 390/768/1440px in both reading directions. The old opening finder now follows the service browser and repair spotlight. The six-page browser suite passes all 144 responsive/theme/direction cases and verifies that the main Home 2 content contains no Home 2 label, sample price or illustrated demonstration copy. Screenshots and reports are outside the repository under `/private/tmp/pp-home2-banner/`.

## Visibility and responsive audit

See [visibility-audit.md](visibility-audit.md) for measured before/after findings, the previous Waylark reference, all executed checks and testing limits. The release strengthens functional borders, dark-panel focus rings and mobile sort readability, and keeps dialog close controls visible during scrolling. Existing 144-case site checks and new short-screen/LTR/RTL dialog regressions pass.

## Home 2 third-section redesign

The screen-repair spotlight now uses a full-width heading/action row above a landscape repair photograph and a structured three-check panel. It replaces the narrow portrait and uneven side-by-side copy. The real `screen-repair.jpg` photograph retains its native 1000×667 proportions without a CSS crop. Desktop places checks alongside the photo; tablet places three columns beneath it, and mobile stacks the checks. The section remains third and the following repair finder is unchanged.

Focused browser QA passes 32 combinations at 320/390/600/768/820/900/1024/1440px in light/dark and LTR/RTL, including contrast, touch targets, image proportions, overflow, and the screen-repair booking prefill. Screenshots and reports are outside the repository at `/private/tmp/pp-section-qa/`. Existing site-wide responsive and functional checks are also run for this release.

## Matching real photos in A little extra care

The screen protector and phone-stand illustrations and tightly framed charger source are replaced with three real Pexels photographs. All three local files and image attributes are 1000×750, and the Home 2 section uses equal 4:3 frames with contain fitting and no zoom. Larger photographs sit above the product copy; all three product dialogs and catalogue records use the same photos. Source crops preserve the complete primary products; exact source links and crop decisions are in `image-credits.md`.

Focused browser checks cover seven widths (320/390/600/768/820/1024/1440), both themes and both directions: 28 combinations. File dimensions, equal rendered photo dimensions, complete contain fitting, product/photo mappings, and enquiry links pass. Screenshots and raw reports are outside the repository under `/private/tmp/pp-essentials/`. The existing site-wide browser suite also verifies matching Home 2 accessory frames at each tested width.

## Dedicated About Us page

The About link previously targeted the Home 1 introduction, exposing unrelated homepage sections. It now opens `pages/about.html`, a dedicated page with five sections: brand introduction, purpose, repair/care principles, repair and accessory scope, and a contact invitation. It includes a real repair photograph and avoids invented founding dates, staff identities, awards, statistics, or testimonials. About is available in the header and the requested Explore group; the remaining footer groups are unchanged.

The buildless architecture now has seven physical pages. Static validation, deployment entrypoint checks, and the existing browser route list include About. The browser layout matrix is calculated from the route count (168 cases). Focused About QA covers 36 combinations at 320/390/600/768/820/1024/1100/1280/1440px, light/dark and LTR/RTL, checking text contrast, touch targets, overflow, header overlap, relevant sections, every footer About destination, and the repair-services link. Evidence is outside the repository at `/private/tmp/pp-about/`.
