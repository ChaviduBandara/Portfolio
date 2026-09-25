import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
