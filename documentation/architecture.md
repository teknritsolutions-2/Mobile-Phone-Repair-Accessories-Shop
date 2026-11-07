# Architecture

Port & Pixel follows the buildless organization of the Waylark reference repository: root `index.html`, physical pages under `pages/`, CSS/JS/images/fonts under `assets/`, and supporting material under `documentation/`.

Page content is authored directly in HTML. There is no JavaScript page router, generated website, build step, or custom server. Relative links work both at an origin root and under the GitHub Pages repository subpath.

Shared header, footer, dialogs, preferences, and navigation behavior live in `assets/js/site-shell.js`. Common UI primitives live in `shared-ui.js`. Each substantial interactive feature has its own module. Reusable service/product content and business configuration are separate from interactions. Personal request data is kept in page memory only.

CSS is organized into the four requested entry files: local fonts, main light/responsive styles, dark-mode tokens, and semantic RTL adjustments. Main stylesheet sections follow the shared components and individual page compositions. No runtime dependency or package installation is needed.

The dedicated `pages/about.html` contains brand purpose, repair principles and scope. Together with the two homepages, Services, Accessories, Pricing and Contact, the public site has seven physical pages. Shared navigation and the static/deployment checks include this page.

`assets/js/dropdowns.js` enhances the six native select controls after page-specific initialization. Native values and form submission remain the data source; the visible combobox/listbox menus share typography, keyboard behavior and viewport-aware placement. Labels, required/error descriptions, dependent options, change events and resets synchronize with the original controls. Without enhancement, the authored native selects remain available.
