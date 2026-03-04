import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";
import { Card, CardContent } from "@/shared/ui/Card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-12 text-center">Контакты</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href="tel:+73830000000" className="text-muted-foreground hover:text-primary transition-colors">+7 (383) 000-00-00</a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:info@mebel.ru" className="text-muted-foreground hover:text-primary transition-colors">info@mebel.ru</a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Адрес</h3>
                  <p className="text-muted-foreground">г. Новосибирск, Красный проспект 1</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Режим работы</h3>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-muted-foreground">Сб-Вс: выходной</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 rounded-2xl overflow-hidden border border-border shadow-medium aspect-video bg-secondary/10 flex items-center justify-center">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=82.920430%2C55.030199&z=11"
              width="100%"
              height="100%"
              allowFullScreen={true}
              className="w-full h-full min-h-[400px]"
              title="Наш адрес на Яндекс-картах"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
