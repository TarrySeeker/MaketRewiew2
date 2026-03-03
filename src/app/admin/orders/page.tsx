"use client";

import { useEffect, useState } from "react";
import { mockDbInfo } from "@/core/mocks/data";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { formatPrice } from "@/core/utils/format";
import { Eye, Package } from "lucide-react";

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  total: number;
  status: string;
  delivery_type: string;
  delivery_address: string | null;
  cdek_point_code: string | null;
  items: any[];
}

const statusLabels: Record<string, string> = {
  new: "Новый",
  confirmed: "Подтверждён",
  paid: "Оплачен",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменён",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);



  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 200));
    setOrders(mockDbInfo.getOrders());
    setLoading(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    mockDbInfo.updateOrderStatus(orderId, newStatus);
    fetchOrders();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  if (loading) {
    return <div className="text-center py-20">Загрузка...</div>;
  }

  if (selectedOrder) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-4xl font-bold">
            Заказ №{selectedOrder.id.slice(0, 8)}
          </h1>
          <Button variant="outline" onClick={() => setSelectedOrder(null)}>
            Назад к списку
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Информация о заказе</h2>
              <dl className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Дата:</dt>
                  <dd className="font-medium">
                    {new Date(selectedOrder.created_at).toLocaleString("ru-RU")}
                  </dd>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Статус:</dt>
                  <dd>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${statusColors[selectedOrder.status]
                        }`}
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </dd>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Сумма:</dt>
                  <dd className="font-serif text-2xl font-bold text-primary">
                    {formatPrice(selectedOrder.total)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Контакты покупателя</h2>
              <dl className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Имя:</dt>
                  <dd className="font-medium">{selectedOrder.customer_name}</dd>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Телефон:</dt>
                  <dd className="font-medium">{selectedOrder.customer_phone}</dd>
                </div>
                {selectedOrder.customer_email && (
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-muted-foreground">Email:</dt>
                    <dd className="font-medium">{selectedOrder.customer_email}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Доставка</h2>
              <dl className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Тип:</dt>
                  <dd className="font-medium">
                    {selectedOrder.delivery_type === "cdek" ? "СДЭК" : "Самовывоз"}
                  </dd>
                </div>
                {selectedOrder.delivery_address && (
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-muted-foreground">Адрес:</dt>
                    <dd className="font-medium">{selectedOrder.delivery_address}</dd>
                  </div>
                )}
                {selectedOrder.cdek_point_code && (
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-muted-foreground">Пункт выдачи СДЭК:</dt>
                    <dd className="font-medium">{selectedOrder.cdek_point_code}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Товары</h2>
              <div className="space-y-4">
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-serif font-bold text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl font-bold">Заказы ({orders.length})</h1>
      </div>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Package className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-serif font-semibold text-lg">
                        Заказ №{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleString("ru-RU")} •{" "}
                        {order.customer_name} • {order.customer_phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${statusColors[order.status]
                        }`}
                    >
                      {statusLabels[order.status]}
                    </span>

                    <div className="text-right">
                      <p className="font-serif text-xl font-bold text-primary">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} товар(ов)
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Заказов пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
}
