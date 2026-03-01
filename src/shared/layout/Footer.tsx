import Link from "next/link";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-5 w-5 text-primary" />
              <span className="font-serif text-xl font-semibold">Мебель</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Создаём уют в каждом доме с 2020 года
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-muted-foreground">Доставка СДЭК</li>
              <li className="text-muted-foreground">Оплата при получении</li>
              <li className="text-muted-foreground">Гарантия качества</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>+7 (XXX) XXX-XX-XX</li>
              <li>info@mebel.ru</li>
              <li>г. Новосибирск</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Мебель. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
