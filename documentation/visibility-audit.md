# Sitewide visibility and responsive audit

Verified November 6, 2026 against all six physical pages. No framework or runtime dependency was added. Temporary axe-core/Playwright tooling, screenshots and raw reports are outside the repository in `/private/tmp/pp-visibility/`.

## Confirmed issues and fixes

| Issue                                                    | Reproduction                                                                                                                        | Fix and evidence                                                                                                                                                                                            |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Faint field boundaries                                   | Name field border against its surface measured 1.33:1 in light mode and 1.79:1 in dark mode.                                        | Separate `--control-line` tokens strengthen form fields, device/service choices, search, sorting and outline controls. Dark field contrast is now 4.21:1. Decorative dividers retain their original colors. |
| Weak keyboard focus on dark panels                       | Light-theme banner focus used blue against dark blue, measuring 2.81:1.                                                             | A pale focus-ring token on both heroes, closing banners and finder recommendations measures 11.15:1 against the Home 2 banner base. Normal surfaces retain their theme accent.                              |
| Mobile dialog close control disappeared during scrolling | At 390×667, scrolling the earbuds dialog moved the close control above the dialog: top −15.66px, while the dialog began at 33.34px. | A sticky 44px close control stays within the dialog at 46.34px after scrolling. All six accessory dialogs and privacy were checked on short phone, tablet and landscape screens in both directions.         |
| Small mobile sort text                                   | Accessory sorting used 15px text.                                                                                                   | Increased to 16px, consistent with the form controls and previous project’s dropdown readability conventions.                                                                                               |

## Reference and criteria

Read the earlier Waylark project’s architecture and theme QA (`Travel Agency & Holiday Packages/README.md` and `documentation/theme-brand-qa.md`) for shared theme actions, responsive navigation, 16px select text, 44px controls and focus-state checks. Port & Pixel keeps its own Steel & Ice palette and structure.

The audit uses [W3C text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [control/focus contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), and [target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). Functional field boundaries and keyboard focus are checked against a 3:1 threshold; this is distinct from the text contrast checks.

## Executed verification

- Existing browser suite: 144 page/width/theme/direction combinations, with no page overflow, broken images, clipped headings/actions, JavaScript errors or failed requests. Widths: 320, 390, 768, 1024, 1280 and 1440px.
- axe-core: 48 page/width/theme combinations for color contrast and target size. No detected violations. Widths: 390, 768, 1024 and 1440px, light and dark.
- Expanded-state audit: 32 dark-mode states covering navigation and Home dropdown, all six product dialogs, privacy, form errors and expanded notes, pricing selection and finder results. No detected contrast/target failures or horizontal clipping.
- New regressions in `browser-check.mjs`: field-boundary and dark-panel focus contrast in both themes; at least 16px sort text; close-control visibility after scrolling all six product dialogs and privacy at 390×667, 768×600 and 844×390 in LTR and RTL.
- Existing booking prefills, service finder, accessory filters/sorts, form validation and local request review/download/edit, theme/direction persistence, privacy and back-to-top checks pass.
- Static references, JavaScript syntax, behavior checks and Git whitespace checks pass.

The photographic Home 2 banner uses gradients/pseudo-elements, so axe reports its text-background checks as incomplete. Banner compositions were reviewed visually in light/dark and both directions; these checks are not represented as automated contrast passes. Actual physical devices, screen-reader sessions, Safari and Firefox were not tested in this audit. This report describes the tested scope, not a whole-site accessibility certification.

Stylesheet versions refresh the corrected colors and dialog positioning for returning visitors.
