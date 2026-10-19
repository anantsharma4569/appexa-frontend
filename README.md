# Appexa frontend

The public Appexa Pharmaceuticals website. Vue 3 + Vite, with all content read
from the [appexa](https://github.com/anantsharma4569/appexa-backend) Frappe app.

Nothing on the site is hardcoded content: products, team, jobs, slides,
testimonials, FAQs, the WhatsApp presets and the contact details are all edited
in the Frappe desk and fetched over one API call.

## Running it

The backend has to be running first — a Frappe bench with the `appexa` app
installed on a site:

```bash
cd ~/apexxa && bench start
```

Then, in this repo:

```bash
yarn install
yarn dev            # http://localhost:8080
```

Requests to `/api` are proxied to the bench. Point them elsewhere with:

```bash
FRAPPE_BACKEND=http://127.0.0.1:8000 FRAPPE_SITE=mysite.localhost yarn dev
```

## Building for production

For standalone hosting — Netlify, Vercel, nginx, anything — build to `dist/`:

```bash
yarn build
```

The site then calls the API on the same origin, so put the Frappe backend
behind the same domain or add a rewrite for `/api`.

To have Frappe itself serve the site at `/site` instead, build into the backend
app and point `FRAPPE_OUT` at its public folder:

```bash
FRAPPE_OUT=../apexxa/apps/appexa/appexa/public/frontend yarn build
cd ../apexxa && bench build --app appexa
```

That switches the asset base to `/assets/appexa/frontend/` and the router base
to `/site/`, which is what `www/site.py` in the backend expects. Adjust the path
to match where your bench keeps the app.

## Where things live

| Path | Holds |
|---|---|
| `src/api.js` | The one resource that loads all site content, plus enquiry submit |
| `src/style.css` | The design system: colour tokens, layout, dark mode |
| `src/components/PackArt.vue` | Per-dosage-form pack drawings, used when a product has no photo |
| `src/components/EnquiryForm.vue` | The single form behind Contact and Careers |
| `src/pages/` | Home, Products, Team, Careers, Contact |

## Editing the content

In the Frappe desk (`/app`), under the Appexa module:

- **Product** and **Product Category** — the catalogue. Add an image to a
  product and it replaces the drawn pack art.
- **Team Member** and **Department** — the roster. A member with no name shows
  as "Name to follow", so the page works before the real names arrive.
- **Job Opening** — careers, with duties and requirements as child tables.
- **Hero Slide**, **Testimonial**, **FAQ Item**, **WhatsApp Topic** — the
  home page sections.
- **Appexa Settings** — phone, WhatsApp number, email, address, CIN, ISO
  certification, hours and social links. These feed the header and footer.

Unticking **Published** hides a record from the site without deleting it.
`display_order` sorts each list, lowest first.
