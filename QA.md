# Verification

Verified November 5, 2026 using headless Brave (Chromium) through Playwright.

- Six routes × six widths (320, 390, 768, 1024, 1280, 1440) × two themes × two directions: 144 layout combinations.
- Automated checks found no document horizontal overflow, out-of-bounds primary headings/buttons, unloaded or broken images, or uncaught JavaScript errors.
- Full-page screenshots generated at 390, 768, and 1440 in both themes, plus representative mobile RTL. Visual review covered both homepages, Services, Accessories, Pricing, and Contact; issues corrected included image selection, small supporting text, and the accessory feature height.
- Interaction checks covered the desktop Home dropdown, clean routing, guided finder context, issue selection, service preselection, all service booking URLs, FAQs, category filters, search, empty-state reset, alphabetical sort, product modal/Escape, accessory enquiry context, pricing selectors, required/email/phone validation, local request review/download/edit, mobile menu/submenu/Escape/scroll lock, preference persistence, privacy dialog, and back-to-top.
- `npm run check` passed.

Machine-readable results are in `qa/verification.json`. QA dependencies and screenshots were kept outside the project to avoid runtime or deployment overhead.

Limits: no live booking endpoint was configured or tested, no real appointment can be confirmed, and no business contact details or approved prices were supplied. Browser automation used Chromium; Safari and Firefox were not tested. This is a frontend, not an automatic hardware diagnostic tool.
