import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="flex-1 py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-center text-balance">
                        Политика обработки персональных данных
                    </h1>
                    <div className="prose prose-lg mx-auto">
                        <p className="text-muted-foreground text-lg mb-6">
                            Настоящая Политика обработки персональных данных разработана в соответствии с Федеральным законом «О персональных данных» № 152-ФЗ.
                        </p>
                        <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground mt-8">Общие положения</h3>
                        <p className="text-muted-foreground mb-6">
                            Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
                        </p>
                        <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground mt-8">Основные понятия</h3>
                        <ul className="text-muted-foreground list-disc pl-6 space-y-2 mb-6">
                            <li>Персональные данные — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу.</li>
                            <li>Сайт — совокупность графических и информационных материалов, обеспечивающих их доступность в сети интернет по сетевому адресу.</li>
                        </ul>
                        <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground mt-8">Цели обработки</h3>
                        <p className="text-muted-foreground mb-6">
                            Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки электронных писем; заключение, исполнение и прекращение гражданско-правовых договоров; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
