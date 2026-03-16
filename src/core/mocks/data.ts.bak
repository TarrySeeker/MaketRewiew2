import { Product, Category } from "@/core/types";

export let MOCK_CATEGORIES: Category[] = [
    {
        id: "cat-1",
        name: "Диваны",
        slug: "sofas",
        parent_id: null,
        description: "Премиальные дизайнерские диваны для вашего интерьера.",
        image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=800",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sort_order: 1,
    },
    {
        id: "cat-2",
        name: "Кресла",
        slug: "chairs",
        parent_id: null,
        description: "Эргономичные кресла и стулья для интерьера.",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sort_order: 2,
    },
    {
        id: "cat-3",
        name: "Столы",
        slug: "tables",
        parent_id: null,
        description: "Обеденные и журнальные столы из массива.",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sort_order: 3,
    },
    {
        id: "cat-4",
        name: "Кровати",
        slug: "beds",
        parent_id: null,
        description: "Роскошные кровати для спальни.",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sort_order: 4,
    }
];

const generateProducts = (categoryId: string, categoryName: string, basePrice: number, imgUrl: string) => {
    const products: Product[] = [];
    for (let i = 1; i <= 10; i++) {
        const isFeatured = i <= 2;
        products.push({
            id: `prod-${categoryId}-${i}`,
            title: `${categoryName} Авангард ${i}`,
            slug: `${categoryName.toLowerCase()}-avantgarde-${i}`,
            sku: `SKU-${categoryName.toUpperCase()}-${i}`,
            brand: "Maket Design",
            price: basePrice + (Math.floor(Math.random() * 50) * 1000),
            old_price: Math.random() > 0.6 ? basePrice + (Math.floor(Math.random() * 80) * 1000) + 20000 : null,
            description: `Эксклюзивный ${categoryName.toLowerCase()} из новой авангардной коллекции. Идеально подойдет для современных интерьеров премиум-класса. Создает акцент и потрясающий визуальный шок.`,
            seo_title: `${categoryName} Авангард ${i} — Купить премиум`,
            seo_description: `Эксклюзивный ${categoryName.toLowerCase()} из новой авангардной коллекции.`,
            images: [imgUrl, imgUrl, imgUrl],
            category_id: categoryId,
            material: i % 2 === 0 ? "Массив дуба" : (i % 3 === 0 ? "Велюр" : "Керамика"),
            color: i % 2 === 0 ? "Графит" : (i % 3 === 0 ? "Изумрудный" : "Бежевый"),
            stock: 10 + i,
            is_active: true,
            featured: isFeatured,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            dimensions: {
                width: 100 + i * 10,
                height: 50 + i * 5,
                depth: 80 + i * 2,
                unit: "см"
            },
            weight: 15 + i
        });
    }
    return products;
};

export let MOCK_PRODUCTS: Product[] = [
    ...generateProducts("cat-1", "Диван", 120000, "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=800"),
    ...generateProducts("cat-2", "Кресло", 45000, "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800"),
    ...generateProducts("cat-3", "Стол", 85000, "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800"),
    ...generateProducts("cat-4", "Кровать", 150000, "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800"),
];

// Утилиты для эмуляции БД
export const mockDbInfo = {
    getCategories: () => MOCK_CATEGORIES,
    getCategoryBySlug: (slug: string) => MOCK_CATEGORIES.find(c => c.slug === slug),
    getProducts: () => MOCK_PRODUCTS,
    getFeaturedProducts: () => MOCK_PRODUCTS.filter(p => p.featured),
    getProductsByCategory: (catId: string) => MOCK_PRODUCTS.filter(p => p.category_id === catId),
    getProductById: (id: string) => MOCK_PRODUCTS.find(p => p.id === id),
    getProductBySlug: (slug: string) => MOCK_PRODUCTS.find(p => p.slug === slug),
    searchProducts: (query: string) => MOCK_PRODUCTS.filter(p => p.title.toLowerCase().includes(query.toLowerCase())),

    // Мутации для админки
    deleteProduct: (id: string) => {
        MOCK_PRODUCTS = MOCK_PRODUCTS.filter(p => p.id !== id);
    },
    addProduct: (data: Partial<Product>) => {
        const id = `prod-${data.category_id}-${Date.now()}`;
        const newProduct = { ...data, id, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Product;
        MOCK_PRODUCTS = [newProduct, ...MOCK_PRODUCTS];
    },
    updateProduct: (id: string, data: Partial<Product>) => {
        const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
        if (index > -1) {
            MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...data, updated_at: new Date().toISOString() } as Product;
        }
    },

    // Мутации для Категорий
    deleteCategory: (id: string) => {
        MOCK_CATEGORIES = MOCK_CATEGORIES.filter(c => c.id !== id);
    },
    addCategory: (data: Partial<Category>) => {
        const id = `cat-${Date.now()}`;
        const newCategory = { ...data, id, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Category;
        MOCK_CATEGORIES = [...MOCK_CATEGORIES, newCategory];
    },
    updateCategory: (id: string, data: Partial<Category>) => {
        const index = MOCK_CATEGORIES.findIndex(c => c.id === id);
        if (index > -1) {
            MOCK_CATEGORIES[index] = { ...MOCK_CATEGORIES[index], ...data, updated_at: new Date().toISOString() } as Category;
        }
    },

    // Заказы (мок)
    getOrders: () => {
        return [] as any[]; // Временно возвращаем пустой массив заказов
    },
    updateOrderStatus: (id: string, status: string) => {
        // Заглушка
    }
};
