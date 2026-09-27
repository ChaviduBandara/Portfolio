# Software Engineering Portfolio

Chavidu Bandara's portfolio, built with Next.js. The current page contains a responsive header, hero, About section, Projects showcase, and Contact section with light/dark themes. Header links navigate to About, Projects, and Contact, and the hero's View Projects action opens the showcase.

## Local development

```powershell
npm.cmd run dev
```

Open http://localhost:3000 in your browser.

## About section

The CV-based introduction and education/experience highlights live in `src/components/sections/about.tsx`. The section uses the existing design tokens, responsive cards, and subtle hover and scroll effects. Motion effects respect reduced-motion settings; browsers without scroll-animation support show the content normally.

No Download CV button is displayed because `public/documents` does not currently contain a CV for publication.

## Projects section

Project titles, descriptions, technology tags, and illustration variants are maintained in `src/data/projects.ts`. The reusable card is `src/components/ui/project-card.tsx`, and `src/components/sections/projects.tsx` controls the initial three projects and See More / Show Less behavior.

Cards are keyboard focusable, and expanding the list moves focus to the first newly revealed card. The reveal button reports its expanded state and the visible project count is announced. CSS concept illustrations are original decorative artwork, not screenshots. No demo, repository, or Details links are shown because none have been supplied.

The responsive layout uses one, two, or three columns. Hover and scroll effects respect reduced-motion settings and remain readable without scroll-animation support.

## Contact section

`src/components/sections/contact.tsx` has three contact cards and a Name, Email, and Message form. The email card copies the address and briefly confirms it; if clipboard access is blocked, a selected, read-only field enables manual copying. LinkedIn and GitHub open in a new tab. No phone number is displayed.

The form sends JSON to `src/app/api/contact/route.ts`, which sends a plain-text email through Resend with the visitor's address as `replyTo`. Client and server share validation in `src/lib/contact.ts`: all fields are required, the email must be valid, and lengths are limited to 100 characters for names, 254 for email addresses, and 5,000 for messages. The API also rejects invalid JSON and bodies over 32 KiB. It returns safe errors without exposing provider details.

While sending, the form is disabled. Failures preserve the entered values and offer a retry; success resets the form and displays “Message sent successfully” only after Resend accepts the request. This indicates provider acceptance, not confirmed inbox delivery.

### Email configuration

Use `.env.example` as the configuration template. Set these server-only variables in your local environment or hosting provider, then restart the app:

```dotenv
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=chavidunethmika@gmail.com
CONTACT_FROM_EMAIL="Chavidu Portfolio <onboarding@resend.dev>"
```

No credentials or `.env.local` are included. All `.env*` files except the blank-key `.env.example` template are ignored by Git. The project builds without email configuration; submissions receive a helpful failure response until it is configured.

Resend's `onboarding@resend.dev` sender is for testing and can send only to the email address associated with your Resend account. Use a sender on your verified domain for production. See [Resend's sender restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain). Keep the API key private; do not prefix it with `NEXT_PUBLIC_`. Deploy with a Next.js server runtime so `/api/contact` can run.

## Profile portrait

The hero uses `public/images/profile-sketch.png` through `next/image`, with the alt text “Pencil sketch portrait of Chavidu Bandara”. The square frame and `object-fit: contain` preserve the full sketch, including its hair and shoulders.

The image retains its ivory paper background in both themes. The padded outer frame uses the existing light/dark palette, a subtle orange border, and a soft orange glow. Entrance and hover movement respect reduced-motion preferences.

## Verification

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

The project uses the App Router, TypeScript, Tailwind CSS, and `next-themes`. Design tokens are defined in `src/app/globals.css`.

The contact API tests exercise validation, configuration checks, provider failures, and the outgoing email payload through the real Resend SDK with network calls mocked. They do not send email or require real credentials.

## Metadata and browser identity

`src/app/layout.tsx` defines the portfolio title, future-page title template, description, author, creator, keywords, index/follow settings, and Open Graph/Twitter cards. `src/app/opengraph-image.tsx` generates the 1200 × 630 sharing image with `ImageResponse` at build time using its bundled font. The Twitter card reuses that image. `src/app/icon.svg` and its 16/32/48px `favicon.ico` counterpart provide the cb. browser identity.

No canonical URL, production domain, or `metadataBase` is configured yet. Next.js consequently warns that social-image URLs use its localhost fallback. Once the final public URL is known, set `metadataBase`, the homepage canonical, and `openGraph.url`, then rebuild. Add a sitemap with that same origin and confirm the public sharing-image URLs and crawler access after deployment.

## Accessibility and performance

The light theme uses darker orange variants for large text, small interactive text, and focus outlines; orange fills and decoration keep the original accent. Form borders and small project labels also have sufficient contrast against their backgrounds. All motion, including the header logo hover, respects reduced-motion preferences.

The portrait has a reserved square frame, responsive sizes, eager loading, and high fetch priority. Geist is self-hosted by `next/font` with a preloaded Latin subset. Below-the-fold project illustrations are CSS, with no extra image downloads; the other three projects are mounted only when requested. Interactive client components remain limited to theme state, project expansion, the contact form, and footer controls. The unused `motion` dependency has been removed; existing animations continue to use CSS.
