# Интернет-магазин "Мебель"

Современный интернет-магазин мебели с элегантным скандинавским дизайном на Next.js 15 + Supabase.

## Дизайн

Светлая нежная эстетика:
- **Палитра:** кремовый (#FFF8F0), пыльная роза (#D4A0A0), мятный (#8B9E8B)
- **Шрифты:** Inter (основной), Playfair Display (заголовки - элегантный serif)
- **Стиль:** Скандинавский минимализм, мягкие тени, закруглённые углы, воздушность

## Технологии

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 3
- Supabase (PostgreSQL)
- Zustand (state management)
- СДЭК API v2

## Структура (Feature-Sliced Design)

```
src/
├── app/          # Страницы Next.js
├── features/     # Фичи (catalog, product, cart)
├── shared/       # Общие UI компоненты
├── core/         # Типы, утилиты, Supabase
└── store/        # Zustand stores
```

## Установка

```bash
npm install
cp .env.local.example .env.local
# Заполнить .env.local ключами Supabase
npm run dev
```

## База данных

Выполните `schema.sql` в Supabase SQL Editor.

Особенности схемы:
- Поля для мебели: `material`, `color`, `featured`
- Авто-генерация `order_number`
- RLS политики

## Функции

- ✅ Элегантный дизайн (светлая тема)
- ✅ Каталог с фильтрами (material, color, price)
- ✅ Галерея товаров
- ✅ Корзина (Zustand + localStorage)
- ✅ СДЭК интеграция
- ✅ SEO (metadata, sitemap)
- ✅ Админ-панель

## Деплой

```bash
vercel
```

Добавьте переменные окружения в Vercel Dashboard.
