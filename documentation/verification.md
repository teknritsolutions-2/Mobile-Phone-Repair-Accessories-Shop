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

## Accessories real-photo and framing audit

The remaining USB-C illustration is replaced with a real, full-cable CC0 photograph. All six catalog files and the hero image are verified at 1000×750. Shared product previews and dialogs use the same photographs. An explicit catalog 4:3 rule prevents the small-phone square-frame override from changing image presentation. All primary products were visually inspected for complete framing, including both ends of the cable.

Focused checks cover 24 catalog combinations across 320/390/600/768/1024/1440px in light/dark and LTR/RTL; native file dimensions, rendered sizes, contain fitting, all six product dialogs and the cable enquiry are checked. The site browser suite also asserts six real JPEG photos with uniform 1000×750 files and equal 4:3 frames at every catalog test width. Evidence is outside the repository in `/private/tmp/pp-accessories-real/`.

Visual review also found that the detail badge could cover the new cable’s connector on small cards. The detail symbol now belongs to the product-name button, keeping all image pixels unobstructed while retaining both image and title detail actions.

## Temporary accessory pricing

At the user’s request, six fixed temporary INR prices are now stored in `product-data.js`: case ₹449, cable ₹299, screen protector ₹179, earbuds ₹1,299, charger ₹649, and stand ₹399. Cards, both homepage previews, and product dialogs share one formatter and the same “Indicative price” caption. The amounts remain stable across navigation and reloads until edited. Existing catalogue search, categories, alphabetical sorting, and enquiry behavior are preserved.

## Home 2 middle accessory image replacement

Replaced the hand-held charger with a real 4:3 photograph of a wall charger and coiled cable. The new `charger-desk.jpg` is 1000×750, resized without cropping or padding, and is shared by the Home 2 card, catalogue and product dialog. Cache versions are refreshed for existing browsers.

Static and behavior checks pass. Focused browser QA passes 28 combinations across seven mobile/tablet/desktop widths, light/dark themes and LTR/RTL, checking matching native/rendered dimensions, contain fitting, overflow, and all three product dialog/enquiry mappings. Desktop and mobile screenshots were reviewed; the middle charger is fully in frame.

## Distinct photographs across the site

Each photographic placement now owns its image: Home 1 and Home 2 previews use dedicated preview sources, the catalogue uses six different product photographs, the Accessories hero has a separate earbuds photo, and About and the Home 2 screen spotlight have distinct relevant photos. The requested Home 2 middle charger photo is retained there only. Product detail dialogs no longer repeat card imagery; description, indicative price, keyboard dismissal and enquiry actions remain available. Product prices and category IDs are unchanged.

A browser regression check inventories all seven rendered pages and rejects repeated image URLs or identical SHA-256 file contents under different names. Source credits, individual framing decisions and the cable photo’s visible CC BY-SA attribution are documented in image-credits.md.

Validation passes: static references/JS syntax, behavior checks, the 24-placement source/hash inventory, and the full 168-case responsive/theme/direction browser matrix with no page errors or failed requests. Product dialog close controls, prices, filtering and enquiry prefills pass. Screenshots of the changed catalogue, hero, About purpose and Home 2 spotlight were captured at 390/768/1440px and reviewed alongside the compact text-only product dialog. Evidence is outside the repository under `/private/tmp/pp-unique/`.

## Remove visible cable attribution strip

Removed the cable credit line beneath the Accessories catalogue. The required author, source, license and modification notice are available through a footer Photo credits dialog instead. Static/behavior checks pass, plus 12 focused responsive cases covering phone/tablet/desktop, light/dark and LTR/RTL, dialog opening, close button/Escape, source/license links and horizontal overflow.

## Consistent accessory card alignment

Home 1 previews, Home 2 essentials and the Accessories catalogue now share content rows for photograph, category, title, description, indicative price and enquiry action. Row heights follow the longest visible content in that row without fixed text heights or truncation. Titles wrap naturally with inline detail symbols; enquiry links retain their compact width. Small-screen Home 1 cards use a consistent stacked 4:3 photograph instead of switching to a mixed horizontal/square layout.

Focused measurements pass 84 cases across seven widths (320/390/600/768/820/1024/1440), both themes and reading directions, plus filtered and alphabetically sorted catalogue rows. Each visible content row is checked for matching top coordinates. Visual evidence is outside the repository at `/private/tmp/pp-cards/`. The site-wide browser suite now includes content-row alignment assertions for all three product grids.

Static and behavior checks and the full 168-case site browser suite pass with no layout failures, page errors or failed requests. Product photo uniqueness, filtering/sorting, enquiry prefills, dialogs and navigation remain verified.

## Home 1 background hero on tablet and phone

At widths up to 1099px, the existing studio photograph fills the hero behind the copy instead of becoming a second block below it. The photograph remains a single image element, positioned as a full-section background with cover fitting; a directional dark gradient protects text readability in both directions. The caption is hidden in this mode. Copy, repair/service actions and supporting labels stay above the image. Desktop widths of 1100px and above retain the side-by-side composition and caption.

Focused checks pass 36 combinations at 320/390/600/768/820/1024/1099/1100/1440px, light/dark and LTR/RTL. They verify exact image/hero bounds, cover fitting, caption behavior, content containment, action presence and no horizontal overflow. Phone and tablet screenshots were visually reviewed. Evidence is outside the repository at `/private/tmp/pp-hero/`.

Static/behavior checks and the complete 168-case responsive site suite pass without page errors, failed requests or layout failures, including the existing card alignment and unique-photo inventory checks.

## Desk stand photograph framing

Replaced the portrait-derived catalogue stand image with a distinct real landscape photograph, preserving its entire composition. The source is 1000×714 and sits within a 1000×750 dark canvas with 18px above and below; no photo pixels are cropped and the complete phone and holder remain visible. Home 2 retains its own different wooden-stand photograph. Static/behavior checks and 20 focused width/theme/direction cases pass, including all six matching photo dimensions, 4:3 contain fitting, overflow, stand price and enquiry. The rendered tablet card was visually reviewed.

## Readable dropdowns across the site

The repair finder, accessory sorting, pricing device choice and contact service/time controls now share readable menus: 16px text in both the trigger and opened options, minimum 48px option rows, wrapped long labels, theme-aware foregrounds and borders, and scrollable menus positioned within the viewport. The underlying six select values and form semantics are retained. Home navigation dropdown labels are 17px with 16px supporting text; additional-notes disclosure text is 16px and photo-credit disclosure targets are at least 44px.

Keyboard support includes arrows, Home/End, Page Up/Down, typeahead, Enter/Space, Tab commit and Escape cancellation. Focus stays on the labelled combobox; native validation focus and aria-invalid/required/describedby state are forwarded. Finder symptom options update when the problem changes. Catalogue reset now emits its value-change event so the visible sorting label resets alongside the native value. Scrolling an option list does not scroll the page.

Validation passes: static references/JS syntax and behavior checks; 120 opened-menu width/theme/direction combinations across 320/390/768/1024/1440px; 18 additional short phone/tablet/landscape menus; all six controls with touch selection; automated WCAG A/AA control/open-menu scans on all four form pages in light/dark; and the full 168-case site browser suite with no layout failures, page errors or failed requests. The durable suite uses visible menu selections and checks keyboard/typeahead/cancellation/Tab, dynamic choices, option sizes and popup viewport bounds. Tablet screenshots were reviewed. Raw evidence and temporary tooling remain outside the repository under `/private/tmp/pp-dropdowns/`.

## Home 1 mobile essentials: full photos and roomier copy

Below 600px, the three daily-essentials cards use a full-width photograph above a single-column copy stack. Their image containers now follow the photographs’ native 4:3 height, preventing square-frame bands without zoom or cropping. Category spacing is 20px after the image, product titles are 24px, attribute text is 16px with a 1.65 line height, and price/action spacing is increased. Subtle separators and space between cards keep the section readable. Tablet and desktop continue using shared aligned content rows.

Focused geometry checks pass 28 width/theme/direction combinations at 320/390/425/599/600/768/1440px. On phones, image/frame bounds differ only by the 1px border, native photo ratio remains 4:3, the text sits below the full-width image and has the intended spacing. Mobile screenshots were visually reviewed. The durable site suite includes these mobile geometry checks; evidence is outside the repository in `/private/tmp/pp-mobile-cards/`.

The complete 168-case site suite passes with no layout failures, page errors or failed requests. Existing dropdown behavior, unique imagery, form flows and larger-screen card alignment remain verified.

## Dropdown startup safeguard

A follow-up screenshot showed the older native menu; the published page itself passed the 120-case readable-menu checks, so the exact URL/browser cause could not be established from the screenshot. Each HTML page now loads an independent dropdown entry module, and all script versions are refreshed. If an unrelated feature interrupts main startup, the dropdowns still initialize at DOMContentLoaded. Initialization skips existing enhanced selects and shares open-menu state, preventing duplicate controls or listeners.

A deliberate interruption immediately before product-preview startup still produces usable large menus, correct battery/symptom updates and a single set of controls after repeated initialization. This failure-path test is retained in the browser suite. Static/behavior checks and the complete 168-case site suite pass with no unexpected page errors, failed requests or layout failures. The intentionally injected error is checked separately. A 425px failure-path screenshot was visually reviewed under `/private/tmp/pp-dropdowns/`.
