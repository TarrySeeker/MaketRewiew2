-- Временный скрипт для заполнения тестовыми данными базы магазина Мебель

-- Очищаем существующие данные (опционально)
-- DELETE FROM public.products;
-- DELETE FROM public.categories;

-- Расширение uuid уже должно быть включено

DO $$
DECLARE
    cat_sofas UUID := uuid_generate_v4();
    cat_chairs UUID := uuid_generate_v4();
    cat_tables UUID := uuid_generate_v4();
    cat_beds UUID := uuid_generate_v4();
    i INTEGER;
    p_uuid UUID;
    cat_id UUID;
    cat_name TEXT;
    p_title TEXT;
    img_url TEXT;
BEGIN

    -- 1. Создаем категории
    INSERT INTO public.categories (id, name, slug, description, sort_order) VALUES
    (cat_sofas, 'Диваны', 'sofas', 'Премиальные дизайнерские диваны', 1),
    (cat_chairs, 'Стулья и кресла', 'chairs', 'Эргономичные кресла и стулья для интерьера', 2),
    (cat_tables, 'Столы', 'tables', 'Обеденные и журнальные столы из массива', 3),
    (cat_beds, 'Кровати', 'beds', 'Роскошные кровати для спальни', 4);

    -- 2. Генерируем по 10 товаров для каждой категории
    FOR cat_id, cat_name IN 
        VALUES (cat_sofas, 'Диван'), (cat_chairs, 'Кресло'), (cat_tables, 'Стол'), (cat_beds, 'Кровать')
    LOOP
        FOR i IN 1..10 LOOP
            p_uuid := uuid_generate_v4();
            p_title := cat_name || ' Авангард ' || i;
            
            -- Подбираем случайную заглушку-картинку с unsplash для мебели
            IF cat_name = 'Диван' THEN
                img_url := 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=800';
            ELSIF cat_name = 'Кресло' THEN
                img_url := 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800';
            ELSIF cat_name = 'Стол' THEN
                img_url := 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800';
            ELSE
                img_url := 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800';
            END IF;

            INSERT INTO public.products (
                id, title, slug, sku, brand, price, old_price, description, 
                images, category_id, material, color, stock, featured, is_active
            ) VALUES (
                p_uuid, 
                p_title, 
                LOWER(cat_name) || '-avantgarde-' || i || '-' || substr(md5(random()::text), 1, 6),
                'SKU-' || UPPER(cat_name) || '-' || i || '-' || FLOOR(RANDOM() * 1000)::TEXT,
                'Maket Design',
                FLOOR(RANDOM() * 150000 + 50000), -- Цена от 50к до 200к
                CASE WHEN RANDOM() > 0.7 THEN FLOOR(RANDOM() * 200000 + 60000) ELSE NULL END,
                'Эксклюзивный ' || LOWER(cat_name) || ' из новой авангардной коллекции. Идеально подойдет для современных интерьеров премиум-класса. Создает акцент и потрясающий визуальный шок.',
                ARRAY[img_url, img_url], -- Массив картинок
                cat_id,
                CASE (RANDOM() * 2)::INT WHEN 0 THEN 'Массив дуба' WHEN 1 THEN 'Велюр' ELSE 'Металл/Стекло' END,
                CASE (RANDOM() * 2)::INT WHEN 0 THEN 'Графит' WHEN 1 THEN 'Бежевый' ELSE 'Изумрудный' END,
                FLOOR(RANDOM() * 50 + 1), -- Наличие от 1 до 50
                (RANDOM() > 0.8), -- 20% шанс быть Featured (на главной)
                true
            );
        END LOOP;
    END LOOP;

END $$;
