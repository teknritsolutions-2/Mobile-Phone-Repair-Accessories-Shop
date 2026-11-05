# Port & Pixel

A complete six-page, buildless ES-module frontend. No runtime dependencies or build step.

Run `npm run dev`, then open http://127.0.0.1:4173. Run `npm run check` for JavaScript syntax validation.

Routes: `/`, `/home-2`, `/services`, `/accessories`, `/pricing`, `/contact`.

Content and business settings live in `dist/data.js`. Add actual contact details there; blank fields are omitted. No business prices, ratings, opening hours, or guarantees have been invented. Product imagery and names form an enquiry selection; availability, exact specification, and compatibility must be confirmed.

Booking works locally until `business.submissionEndpoint` is configured. Requests remain in page memory, with review, editing, and a downloadable text copy. They are never silently stored or reported as delivered. To connect delivery, supply an HTTPS endpoint accepting POST JSON and returning a successful status only after accepting the request. Production integration should add server validation, abuse protection, and an appropriate privacy policy. Confirm CORS and actual delivery before enabling. No appointment is automatically confirmed.

Deploy `dist` to a static host with a fallback to `index.html` for clean routes. `.openai/hosting.json` configures Sites hosting. `server.mjs` provides the same fallback locally.

Theme and direction preferences are stored in localStorage. Service and accessory context is passed through query parameters and validated against the content catalog. Personal form data is never put into URLs.

Images: Pexels photography by Tima Miroshnichenko and Unsplash product photography; source details in `ASSETS.md`.
