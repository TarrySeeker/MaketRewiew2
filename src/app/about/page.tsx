import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-8 text-center">О компании</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-secondary/20 border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <span className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">2020</span>
              <span className="text-muted-foreground">Год основания на рынке</span>
            </div>
            <div className="bg-secondary/20 border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <span className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">20k+</span>
              <span className="text-muted-foreground">Довольных клиентов</span>
            </div>
            <div className="bg-secondary/20 border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <span className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">30</span>
              <span className="text-muted-foreground">Дней гарантии на возврат</span>
            </div>
          </div>

          <div className="prose prose-lg mx-auto mb-16">
            <p className="text-muted-foreground text-lg mb-6">
              Мы — команда профессионалов, которая уже более нескольких лет создаёт качественную
              и стильную мебель для вашего дома. Наша мебель разработана с учетом современных
              трендов в архитектуре и дизайне, объединяя форму, функцию и эстетику.
            </p>
            <p className="text-muted-foreground text-lg">
              Наша миссия — сделать уютный интерьер доступным каждому. Мы работаем
              напрямую с производителями и строго контролируем качество на каждом этапе.
              Мы считаем, что покупка мебели — это инвестиция в комфорт на долгие годы,
              поэтому каждая деталь продумана до мелочей.
            </p>
          </div>

          <div className="flex justify-center">
            <a href="/contacts" className="inline-flex items-center justify-center rounded-none text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-primary text-primary-foreground hover:bg-white/90 uppercase tracking-widest">
              Связаться с нами
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
