# Port & Pixel 3.0 verification

November 6, 2026. Static HTML/CSS/vanilla JavaScript; no runtime dependencies or build system.

## Scope and cleanup

All six pages were substantially redesigned. Home 1 now has six major sections; redundant trust, estimate, and editorial filler was removed. Home 2 retains the finder, symptom shortcuts, a short visual spotlight, and booking invitation. Services is a compact visual directory. Accessories centers on products and catalog controls. Pricing combines service/device selection with estimate information. Contact retains the complete form and a concise pre-visit guide.

The six legacy redirect directories, obsolete font families/licenses, unused portrait repair photo, and old verification JSON were removed. One `404.html` compatibility map handles known old bookmarks. The workflow publishes only public HTML, pages, assets, and `.nojekyll`; documentation and optional QA tools stay out of the live artifact.

The new studio hero photograph uses its complete 3:2 source. The replacement earbuds photograph shows the full case and earbuds at 4:3. Product displays use contain fitting, consistent gallery ratios, and subject-specific framing/backgrounds. Existing workshop and display photographs keep their natural proportions. The protector illustration and logo were updated to the neutral/red identity. Credits are in `image-credits.md`.

## Actual browser review and corrections

Before screenshots of all six pages were captured at 390, 768, and 1440px. New compositions were viewed directly in Brave/Chromium, including light, dark, tablet, mobile, and representative RTL screenshots. Visual corrections included vertically balancing the featured-repair tiles, reorganizing the five secondary services into a two-plus-three directory, shortening estimate copy, replacing the cropped earbuds source, and adjusting the product cover to preserve full source framing. Screenshots and raw reports are outside the repository under `/private/tmp/pp3-*`.

The release suite checks all six pages at 320, 390, 768, 1024, 1280, and 1440px, in light/dark and LTR/RTL: 144 combinations. It verifies overflow, image loading, visible heading/button boundaries, JavaScript errors, and failed requests. Screenshots are captured at 390, 768, 1024, and 1440px in both themes, plus representative RTL views.

Interaction coverage: desktop/mobile Home dropdown, physical navigation and refreshes, all rendered internal links, mobile scroll lock and Escape/outside close, persistent theme/direction, repair selector, guided finder with device/symptom booking context, four-step journey, six service booking links, FAQs, catalog categories/search/sort/reset, product modal/Escape/enquiry, pricing with device prefill, required/email/phone/date/consent errors, local review/download/edit, privacy dialog, and back-to-top.

Additional fixes have direct browser assertions: generic accessory enquiry preselection; required/optional fields when switching request type; reset restoring sort as well as search/category; and Home dropdown Escape restoring focus to its summary. Native dialogs retain focus trapping and return focus on close.

## Repeatable checks

```sh
python3 documentation/check-static.py
node documentation/check-behavior.mjs
```

Optional `browser-check.mjs` accepts `PLAYWRIGHT_MODULE`, `BROWSER_EXECUTABLE`, `QA_BASE_URL`, `QA_ROOT_URL`, and `QA_OUTPUT_DIR`. Browser tooling is installed outside this repository. These checks are verification, not a website build.

## Limitations

No real submission endpoint or approved business contact details were supplied. Requests remain local, and no appointment is confirmed. Real delivery is therefore unverified. Safari, Firefox, physical devices, and assistive-technology sessions have not been tested. Legacy bookmarks initially return a server 404 before `404.html` redirects; all current links use physical HTML files directly.
