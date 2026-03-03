import { mockDbInfo } from "@/core/mocks/data";
import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";
import { WebGLHero } from "@/features/home/components/WebGLHero";
import { Lookbook } from "@/features/home/components/Lookbook";
import { FeaturedSlider } from "@/features/home/components/FeaturedSlider";

export default async function HomePage() {
  const featured = mockDbInfo.getFeaturedProducts().slice(0, 6);

  return (
    <>
      <Header />
      <main className="flex-1 bg-background select-none">
        <WebGLHero />
        <Lookbook />
        {featured && featured.length > 0 && <FeaturedSlider products={featured} />}
      </main>
      <Footer />
    </>
  );
}
