-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CATEGORIES
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);
CREATE INDEX categories_slug_idx ON public.categories (slug);
CREATE INDEX categories_parent_id_idx ON public.categories (parent_id);

-- PRODUCTS (с полями для мебели)
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sku TEXT UNIQUE,
  brand TEXT,
  price NUMERIC NOT NULL CHECK (price >= 0),
  old_price NUMERIC CHECK (old_price >= 0),
  description TEXT,
  images TEXT[] DEFAULT array[]::text[],
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  
  -- Специфичные для мебели поля
  material TEXT,             -- Материал (ЛДСП, массив, МДФ, и т.д.)
  color TEXT,                -- Цвет
  
  weight NUMERIC CHECK (weight >= 0),
  dimensions JSONB,          -- {width, height, depth, unit}
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  seo_title TEXT,
  seo_description TEXT,
  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false  -- Избранное для главной
);
CREATE INDEX products_category_id_idx ON public.products (category_id);
CREATE INDEX products_is_active_idx ON public.products (is_active);
CREATE INDEX products_slug_idx ON public.products (slug);
CREATE INDEX products_featured_idx ON public.products (featured);
CREATE INDEX products_material_idx ON public.products (material);
CREATE INDEX products_color_idx ON public.products (color);

-- ORDERS
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  order_number TEXT UNIQUE,  -- Человеко-читаемый номер заказа
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processing', 'completed', 'cancelled')),
  customer_info JSONB DEFAULT '{}'::jsonb,
  items JSONB DEFAULT '[]'::jsonb,
  total NUMERIC NOT NULL DEFAULT 0 CHECK (total >= 0),
  cdek_order_uuid TEXT,
  cdek_tracking TEXT,
  delivery_info JSONB,
  user_id UUID REFERENCES auth.users(id),
  notes TEXT  -- Заметки к заказу
);
CREATE INDEX orders_status_idx ON public.orders (status);
CREATE INDEX orders_created_at_idx ON public.orders (created_at);
CREATE INDEX orders_order_number_idx ON public.orders (order_number);

-- PROMO CODES
CREATE TABLE public.promo_codes (
  code TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  discount_type TEXT CHECK (discount_type IN ('fixed', 'percent')),
  value NUMERIC NOT NULL CHECK (value > 0),
  is_active BOOLEAN DEFAULT true,
  valid_until TIMESTAMP WITH TIME ZONE,
  CONSTRAINT value_percent_check CHECK (
    (discount_type = 'percent' AND value <= 100) OR (discount_type = 'fixed')
  )
);

-- CMS CONTENT
CREATE TABLE public.cms_content (
  key TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  content JSONB DEFAULT '{}'::jsonb
);

-- STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- ROW LEVEL SECURITY
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS
CREATE POLICY "Enable read access for all" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all" ON public.cms_content FOR SELECT USING (true);
CREATE POLICY "Enable read access for all" ON public.promo_codes FOR SELECT USING (true);

-- AUTHENTICATED FULL ACCESS
CREATE POLICY "Enable all for authenticated" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated" ON public.orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated" ON public.promo_codes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated" ON public.cms_content FOR ALL USING (auth.role() = 'authenticated');

-- ANYONE CAN CREATE ORDERS
CREATE POLICY "Enable insert for everyone" ON public.orders FOR INSERT WITH CHECK (true);

-- STORAGE POLICIES
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'products' );
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'products' AND auth.role() = 'authenticated' );

-- TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_updated_at_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_promo_codes BEFORE UPDATE ON public.promo_codes FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_cms_content BEFORE UPDATE ON public.cms_content FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- AUTO-GENERATE ORDER NUMBER
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF new.order_number IS NULL THEN
    new.order_number := 'ORD-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD((EXTRACT(EPOCH FROM now())::bigint % 100000)::text, 5, '0');
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_order_number_trigger BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE PROCEDURE public.generate_order_number();
