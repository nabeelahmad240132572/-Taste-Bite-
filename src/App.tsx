/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QualityPillars } from './components/QualityPillars';
import { DealsSection } from './components/DealsSection';
import { PlattersAndSpecialties } from './components/PlattersAndSpecialties';
import { FullMenuSection } from './components/FullMenuSection';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { StoreInfoFooter } from './components/StoreInfoFooter';
import { MenuItem } from './data/menuData';
import { CartItem, CustomerOrderDetails } from './types/cart';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tb_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    details: CustomerOrderDetails;
    orderId: string;
    total: number;
  } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('tb_cart_items', JSON.stringify(cartItems));
    } catch {
      // ignore storage quota issues
    }
  }, [cartItems]);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // check if identical item exists (same id / customization)
      const existingIdx = prev.findIndex(
        (i) =>
          i.menuItem.id === newItem.menuItem.id &&
          i.selectedSize === newItem.selectedSize &&
          i.selectedDrink === newItem.selectedDrink &&
          i.selectedSpice === newItem.selectedSpice &&
          i.unitPrice === newItem.unitPrice &&
          i.notes === newItem.notes
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });

    // Automatically trigger cart drawer so user gets instantaneous feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (
    details: CustomerOrderDetails,
    orderId: string,
    total: number
  ) => {
    setConfirmedOrder({ details, orderId, total });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className={`min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans ${
        lang === 'ur' ? 'direction-rtl' : ''
      }`}
    >
      {/* Top Header */}
      <Header
        cartCount={totalItemCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive Spotlight Switcher */}
        <Hero onSelectItem={(item) => setCustomizingItem(item)} lang={lang} />

        {/* Brand Quality Pillars (Fresh Halal Chicken, Molten Lava, 30m Delivery) */}
        <QualityPillars lang={lang} />

        {/* Super Deals (Deal 1 to Deal 5 matching flyer) */}
        <DealsSection
          onSelectItem={(item) => setCustomizingItem(item)}
          lang={lang}
        />

        {/* Platters & Stuffed Calzone Showcase */}
        <PlattersAndSpecialties
          onSelectItem={(item) => setCustomizingItem(item)}
          lang={lang}
        />

        {/* Full Interactive Menu with Sorting & Filter */}
        <FullMenuSection
          onSelectItem={(item) => setCustomizingItem(item)}
          lang={lang}
        />
      </main>

      {/* Footer & Location Details */}
      <StoreInfoFooter lang={lang} />

      {/* Floating Sticky Bottom Cart Pill on Mobile (cap <= 15% viewport) */}
      {totalItemCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-display font-black text-sm flex items-center justify-between shadow-2xl shadow-amber-500/30 cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span>
                {totalItemCount} {lang === 'en' ? 'Items in Cart' : 'اشیاء'}
              </span>
              <span className="text-slate-950/60">·</span>
              <span className="tabular-nums">Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-xs uppercase tracking-wider font-extrabold">
              <span>{lang === 'en' ? 'View Cart' : 'کارٹ دیکھیں'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Item Customization Modal */}
      {customizingItem && (
        <ItemCustomizeModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddToCart}
          lang={lang}
        />
      )}

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
        lang={lang}
      />

      {/* Order Confirmation Modal */}
      {confirmedOrder && (
        <OrderConfirmationModal
          orderId={confirmedOrder.orderId}
          total={confirmedOrder.total}
          orderDetails={confirmedOrder.details}
          onClose={() => setConfirmedOrder(null)}
          lang={lang}
        />
      )}
    </div>
  );
}
