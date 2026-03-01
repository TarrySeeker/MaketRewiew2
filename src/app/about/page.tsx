import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-8 text-center">О компании</h1>
          <div className="prose prose-lg mx-auto">
            <p className="text-muted-foreground text-lg mb-6">
              Мы — команда профессионалов, которая уже более 5 лет создаёт качественную
              и стильную мебель для вашего дома.
            </p>
            <p className="text-muted-foreground">
              Наша миссия — сделать уютный интерьер доступным каждому. Мы работаем
              напрямую с производителями и контролируем качество на каждом этапе,
              поэтому можем предложить лучшие цены без потери качества.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
