import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
      </main>
    </>
  );
}
