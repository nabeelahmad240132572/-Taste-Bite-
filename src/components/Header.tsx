import React from 'react';
import { ShoppingBag, Phone, MessageCircle, Flame, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  lang: 'en' | 'ur';
  setLang: (lang: 'en' | 'ur') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  lang,
  setLang
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0b10]/95 backdrop-blur-xl border-b border-white/[0.08] text-slate-100 transition-all">
      {/* Top Professional Notice Strip */}
      <div className="bg-[#12131b] border-b border-white/[0.05] text-slate-300 px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            {/* Live Status indicator */}
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{lang === 'en' ? 'Kitchen Live Now' : 'کچن کھلا ہے'}</span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-400 hidden sm:inline truncate">
              {lang === 'en'
                ? 'Delivery in 25–35 Mins • Total Parco, Multan Road, Pattoki'
                : 'ڈلیوری ۲۵ تا ۳۵ منٹ • ٹوٹل پارکو، ملتان روڈ، پتوکی'}
            </span>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span className="text-amber-400 hidden md:inline font-semibold">
              {lang === 'en' ? 'Free Delivery on Orders above Rs. 2,000' : '۲۰۰۰ روپے سے زائد پر مفت ڈلیوری'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs">
            <a
              href={`tel:${RESTAURANT_INFO.rawPhone1}`}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.phone1}</span>
            </a>
            <div className="h-3 w-px bg-zinc-700" />
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-white/5 hover:bg-white/10 text-slate-200 transition-colors cursor-pointer border border-white/10"
              title="Switch Language"
            >
              {lang === 'en' ? 'اردو' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar - Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#hero" className="flex items-center gap-3.5 shrink-0 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-[1px] shadow-lg shadow-amber-500/15">
            <div className="w-full h-full bg-[#0d0e14] rounded-[11px] flex items-center justify-center group-hover:bg-[#14151f] transition-colors">
              <span className="font-display font-black text-amber-400 text-xl tracking-tighter">
                T&B
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors uppercase">
                Taste & Bite
              </span>
            </div>
            <span className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
              {lang === 'en' ? 'Gourmet Fast Food & Pizza' : 'پتوکی فاسٹ فوڈ اور پیزا'}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-zinc-300">
          <a
            href="#chef-specials"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 relative py-1"
          >
            {lang === 'en' ? 'Chef Specials' : 'شیف اسپیشل'}
          </a>
          <a
            href="#deals"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 relative py-1"
          >
            {lang === 'en' ? 'Exclusive Deals' : 'سپر ڈیلز'}
          </a>
          <a
            href="#platters"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 relative py-1"
          >
            {lang === 'en' ? 'Platters & Calzones' : 'پلیٹرز اور کیلزون'}
          </a>
          <a
            href="#menu"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 relative py-1"
          >
            {lang === 'en' ? 'Explore Menu' : 'مکمل مینو'}
          </a>
          <a
            href="#location"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 relative py-1"
          >
            {lang === 'en' ? 'Branch Details' : 'برانچ کی تفصیلات'}
          </a>
        </nav>

        {/* Zone 3: Primary Action + Quick WhatsApp */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Taste & Bite Pattoki, I would like to place an order from your online menu.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all text-xs font-bold whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'en' ? 'Order on WhatsApp' : 'واٹس ایپ آرڈر'}</span>
          </a>

          <button
            onClick={onOpenCart}
            className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-105 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <div className="relative flex items-center">
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 font-display">
              <span className="hidden xs:inline">
                {lang === 'en' ? 'Cart' : 'کارٹ'}
              </span>
              <span className="bg-slate-950 text-amber-300 text-xs px-2 py-0.5 rounded-md font-bold tabular-nums">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
