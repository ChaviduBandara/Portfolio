# Software Engineering Portfolio

Chavidu Bandara's portfolio, built with Next.js. The current page contains a responsive header and hero with light/dark themes. Other portfolio sections and their links will be added in a later step.

## Local development

```powershell
npm.cmd run dev
```

Open http://localhost:3000 in your browser.

## Profile photo

Add your portrait at `public/images/profile.jpg`. The hero checks for this file on the server and uses `next/image` with descriptive alt text when it exists. Until then, it displays an original abstract portrait placeholder.

Use a portrait-oriented image (the frame is 4:5). After adding the file, restart the development server and refresh. For production, run a new build to replace the placeholder. Adjust `object-position` in `src/components/sections/hero.module.css` if the photo needs a different crop.

## Verification

```powershell
npm.cmd run lint
npm.cmd run build
```

The project uses the App Router, TypeScript, Tailwind CSS, and `next-themes`. Design tokens are defined in `src/app/globals.css`.
