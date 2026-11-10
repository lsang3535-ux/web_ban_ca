"use client";

import { useState } from "react";
import {
  Fish,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Phone,
  MapPin,
  Clock,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { cn, formatVND } from "@/lib/utils";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  origin: string;
  image: string;
  badge?: string;
};

type CartItem = Product & { qty: number };

const products: Product[] = [
  {
    id: 1,
    name: "Cá Hồi Na Uy",
    price: 480000,
    unit: "kg",
    origin: "Na Uy",
    image:
      "https://images.pexels.com/photos/1727564/pexels-photo-1727564.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Bán chạy",
  },
  {
    id: 2,
    name: "Cá Basa Phi Lê",
    price: 85000,
    unit: "kg",
    origin: "Đồng bằng sông Cửu Long",
    image:
      "https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Cá Mực Tươi",
    price: 220000,
    unit: "kg",
    origin: "Nha Trang",
    image:
      "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Mới",
  },
  {
    id: 4,
    name: "Cá Thu Khô",
    price: 350000,
    unit: "kg",
    origin: "Quảng Bình",
    image:
      "https://images.pexels.com/photos/3296394/pexels-photo-3296394.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Cá Trê Phi Lê",
    price: 120000,
    unit: "kg",
    origin: "An Giang",
    image:
      "https://images.pexels.com/photos/3296280/pexels-photo-3296280.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Cá Ngừ Đại Dương",
    price: 380000,
    unit: "kg",
    origin: "Philippines",
    image:
      "https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Đặt trước",
  },
];

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-ocean-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-600 text-white">
              <Fish className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-ocean-900">Hải Sản Đại Dương</h1>
              <p className="text-xs text-slate-500">Cá tươi ngon mỗi ngày</p>
            </div>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 rounded-xl bg-ocean-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ocean-700 active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-coral-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-600 via-ocean-700 to-ocean-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-coral-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-ocean-100 ring-1 ring-white/20">
              <span className="h-2 w-2 rounded-full bg-coral-400" />
              Giao hàng trong 2 giờ
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Cá Tươi Ngon,<br />Bắt Từ Đại Dương
            </h2>
            <p className="mt-4 text-lg text-ocean-100">
              Được đánh bắt mỗi sáng và giao tận nhà bạn trong vòng 2 giờ.
              Đảm bảo tươi sống 100% hoặc hoàn tiền.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-ocean-700 shadow-lg transition hover:scale-105 active:scale-95"
              >
                Mua ngay
              </a>
              <a
                href="#contact"
                className="rounded-xl bg-ocean-500/30 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-ocean-500/50"
              >
                Liên hệ
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 60%)" }} />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Giao nhanh 2 giờ", desc: "Nội thành TP.HCM & Hà Nội" },
            { icon: ShieldCheck, title: "Tươi 100%", desc: "Hoàn tiền nếu không tươi" },
            { icon: Clock, title: "Đặt hàng 24/7", desc: "Giao theo giờ bạn chọn" },
          ].map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-4 rounded-2xl border border-ocean-100 bg-ocean-50/50 p-5 transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ocean-600 text-white">
                <f.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-ocean-900">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-ocean-900">Sản Phẩm Cá Tươi</h2>
          <p className="mt-2 text-slate-500">Chọn cá yêu thích, thêm vào giỏ hàng</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-ocean-100 bg-white transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ocean-50">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-coral-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-ocean-900">{p.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5" /> {p.origin}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-coral-600">
                      {formatVND(p.price)}
                    </span>
                    <span className="text-sm text-slate-400"> / {p.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="flex items-center gap-1.5 rounded-xl bg-ocean-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ocean-700 active:scale-90"
                  >
                    <Plus className="h-4 w-4" /> Thêm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Order */}
      <section id="contact" className="bg-ocean-50/50 py-16">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-3xl border border-ocean-100 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-ocean-900">Đặt Hàng Nhanh</h2>
            <p className="mt-1 text-sm text-slate-500">
              Để lại thông tin, chúng tôi sẽ gọi xác nhận trong 15 phút.
            </p>
            {orderPlaced ? (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-green-50 p-8 text-center ring-1 ring-green-200">
                <ShieldCheck className="h-12 w-12 text-green-600" />
                <p className="text-lg font-semibold text-green-800">
                  Đặt hàng thành công!
                </p>
                <p className="text-sm text-green-600">
                  Chúng tôi sẽ gọi xác nhận trong ít phút nữa.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-ocean-900 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Số điện thoại"
                    className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-ocean-900 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
                  />
                </div>
                <input
                  required
                  type="text"
                  placeholder="Địa chỉ giao hàng"
                  className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-ocean-900 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
                />
                <textarea
                  placeholder="Ghi chú (tùy chọn)"
                  rows={3}
                  className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-ocean-900 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-coral-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-coral-600 active:scale-95"
                >
                  Đặt hàng ngay
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-900 py-10 text-ocean-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Fish className="h-5 w-5" />
            <span className="font-semibold">Hải Sản Đại Dương</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" /> 1900 1234
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> TP. Hồ Chí Minh
            </span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition",
          cartOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            cartOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setCartOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300",
            cartOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-ocean-100 p-4">
            <h3 className="text-lg font-bold text-ocean-900">
              Giỏ hàng ({cartCount})
            </h3>
            <button
              onClick={() => setCartOpen(false)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-ocean-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-slate-400">
              <ShoppingBag className="h-12 w-12" />
              <p>Giỏ hàng trống</p>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-ocean-100 p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-ocean-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-coral-600">
                        {formatVND(item.price)} / {item.unit}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-ocean-200 text-ocean-700 transition hover:bg-ocean-50"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-ocean-200 text-ocean-700 transition hover:bg-ocean-50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-ocean-900">
                        {formatVND(item.price * item.qty)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-1 text-xs text-slate-400 transition hover:text-coral-600"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-ocean-100 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">Tổng cộng</span>
                  <span className="text-xl font-bold text-coral-600">
                    {formatVND(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full rounded-xl bg-ocean-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-ocean-700 active:scale-95"
                >
                  Thanh toán
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
