export interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  parent_id: string | null;
  image: string | null;
  description: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  sku: string | null;
  brand: string | null;
  price: number;
  old_price: number | null;
  description: string | null;
  images: string[];
  category_id: string | null;
  material: string | null;
  color: string | null;
  weight: number | null;
  dimensions: {
    width?: number;
    height?: number;
    depth?: number;
    unit?: string;
  } | null;
  stock: number;
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
  featured: boolean;
}

export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  order_number: string;
  status: "new" | "processing" | "completed" | "cancelled";
  customer_info: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  items: Array<{
    product_id: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  total: number;
  cdek_order_uuid: string | null;
  cdek_tracking: string | null;
  delivery_info: any;
  user_id: string | null;
  notes: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
