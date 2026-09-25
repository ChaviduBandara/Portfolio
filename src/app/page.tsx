import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
      </main>
    </>
  );
}
