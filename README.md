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

`src/components/sections/contact.tsx` contains the published email, GitHub, and LinkedIn links and a required Name, Email, and Message form. The form validates empty/whitespace-only fields and email format, then opens a URL-encoded `mailto:` draft with the visitor's name, reply email, and message. The visitor must send it from their own email app. The form keeps its contents and never reports that a message was sent.

There is no email delivery service or server endpoint. Copy email address uses the clipboard when available; if access is blocked, a selected, read-only address field enables manual copying. No phone number is displayed.

## Profile portrait

The hero uses `public/images/profile-sketch.png` through `next/image`, with the alt text “Pencil sketch portrait of Chavidu Bandara”. The square frame and `object-fit: contain` preserve the full sketch, including its hair and shoulders.

The image retains its ivory paper background in both themes. The padded outer frame uses the existing light/dark palette, a subtle orange border, and a soft orange glow. Entrance and hover movement respect reduced-motion preferences.

## Verification

```powershell
npm.cmd run lint
npm.cmd run build
```

The project uses the App Router, TypeScript, Tailwind CSS, and `next-themes`. Design tokens are defined in `src/app/globals.css`.
