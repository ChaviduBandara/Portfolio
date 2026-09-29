# Chavidu Bandara — Software Engineering Portfolio

A modern, responsive portfolio website showcasing my software engineering experience, technical skills, education, and projects. Built with Next.js, TypeScript, and Tailwind CSS, with accessible interactions, light and dark themes, and a server-side contact form.

## Live website

**[View the portfolio](https://portfolio-azure-five-70.vercel.app/)**

## Features

- Responsive design for desktop, tablet, and mobile
- Light and dark theme support
- Animated hero, About, Skills, Projects, and Contact sections
- Project showcase with expandable content
- Accessible navigation, keyboard interactions, and focus states
- Motion effects that respect reduced-motion preferences
- Contact form with validation and email delivery through Resend
- Search-engine and social-sharing metadata
- Optimized fonts, images, and loading behaviour

## Technology stack

- **Framework:** Next.js with App Router
- **Language:** TypeScript
- **UI:** React and Tailwind CSS
- **Theme:** next-themes
- **Email:** Resend
- **Testing:** Vitest
- **Hosting:** Vercel

## Getting started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChaviduBandara/Portfolio.git
   cd Portfolio
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file using `.env.example` as the template:

   ```dotenv
   RESEND_API_KEY=your_resend_api_key
   CONTACT_TO_EMAIL=your_email@example.com
   CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
   ```

   Keep the Resend API key private and never prefix it with `NEXT_PUBLIC_`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available commands

```bash
npm run dev
npm run lint
npm test
npm run build
```

## Contact form

The contact form submits to a Next.js API route and sends email through Resend. Validation is applied on both the client and server. The form displays clear sending, success, and error states without exposing provider or credential details.

The `onboarding@resend.dev` sender is intended for testing and can send only to the email address associated with the Resend account. A verified domain should be used for unrestricted production email delivery.

## Deployment

The portfolio is deployed on Vercel and connected to the repository's `main` branch. New commits pushed to `main` automatically trigger a production deployment.

Environment variables required by the contact form must be configured in the Vercel project settings.

## Author

**Chavidu Bandara** — Software Engineer

- [Portfolio](https://portfolio-azure-five-70.vercel.app/)
- [GitHub](https://github.com/ChaviduBandara)
- [LinkedIn](https://www.linkedin.com/in/chavidu-bandara/)
