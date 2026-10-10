import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Star,
  ArrowRight,
  ShieldCheck,
  Flame,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS, MenuItem } from '../data/menuData';

interface HeroProps {
  onSelectItem: (item: MenuItem) => void;
  lang: 'en' | 'ur';
}

export const Hero: React.FC<HeroProps> = ({ onSelectItem, lang }) => {
  const specials = MENU_ITEMS.filter((m) => m.category === 'chef-specials');
  const [activeSpecialIndex, setActiveSpecialIndex] = useState(0);
  const activeSpecial = specials[activeSpecialIndex] || specials[0];

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-white/[0.06]">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-yellow-500/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Narrative & Conversion */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust Pill & Head Chef Tag */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold tracking-wider uppercase">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>{lang === 'en' ? 'New Arrivals By Head Chef' : 'ہیڈ شیف کی نئی پیشکش'}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-300 font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9 (1,450+ {lang === 'en' ? 'Pattoki Reviews' : 'ریویوز'})</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-[1.08]">
                {lang === 'en' ? (
                  <>
                    Real Gourmet Flavor. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                      Crafted In Pattoki.
                    </span>
                  </>
                ) : (
                  <>
                    اصلی گُورمے ذائقہ۔ <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                      اب آپ کے شہر پتوکی میں۔
                    </span>
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
                {lang === 'en'
                  ? 'Experience towering crispy zingers, molten cheddar cheese lava burgers, and charred wood-fired artisan pizza delivered piping hot from Multan Road.'
                  : 'کرسپی زنگرز، لاوا چیز برگرز اور گرلڈ پیزا — اب ٹوٹل پارکو ملتان روڈ پتوکی سے گرما گرم تیز رفتار ڈلیوری کے ساتھ دستیاب!'}
              </p>
            </div>

            {/* CTAs & Quick WhatsApp */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#menu"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-105 text-slate-950 font-display font-bold text-sm tracking-wide flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{lang === 'en' ? 'Explore Full Menu' : 'مکمل مینو دیکھیں'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Assalam-o-Alaikum Taste & Bite Pattoki, I would like to place an order from your chef specials menu.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#181924] hover:bg-[#222433] text-white border border-white/10 font-bold text-sm flex items-center gap-2.5 transition-all hover:border-emerald-500/50"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Instant WhatsApp Order' : 'واٹس ایپ پر آرڈر کریں'}</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.rawPhone1}`}
                className="px-4 py-3.5 rounded-xl text-zinc-300 hover:text-white font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{RESTAURANT_INFO.phone1}</span>
              </a>
            </div>

            {/* Value Metrics Row */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-0.5">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                  {lang === 'en' ? 'Avg Delivery' : 'ڈلیوری وقت'}
                </span>
                <span className="text-sm sm:text-base font-bold text-white tabular-nums flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400 inline" />
                  25–35 Mins
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                  {lang === 'en' ? 'Quality' : 'معیار'}
                </span>
                <span className="text-sm sm:text-base font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
                  100% Halal
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                  {lang === 'en' ? 'Free Shipping' : 'مفت ڈلیوری'}
                </span>
                <span className="text-sm sm:text-base font-bold text-amber-400 tabular-nums">
                  Orders &gt; 2,000
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Head Chef Spotlight Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-[#12131b] border border-amber-500/30 p-2 shadow-2xl shadow-black/80">
              {/* Outer decorative gradient border */}
              <div className="relative rounded-2xl bg-[#0e0f17] overflow-hidden p-6">
                {/* Header of Spotlight */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-display font-black uppercase tracking-wider text-amber-400">
                      {lang === 'en' ? 'Head Chef Spotlight' : 'ہیڈ شیف اسپیشل'}
                    </span>
                  </div>
                  {activeSpecial.badge && (
                    <span className="text-[11px] font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded shadow">
                      {activeSpecial.badge}
                    </span>
                  )}
                </div>

                {/* Main Product Image with subtle zoom on container */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 mb-5 group border border-white/5">
                  <img
                    src={activeSpecial.image}
                    alt={activeSpecial.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-3 bg-[#0a0b10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-baseline gap-2">
                    <span className="text-lg font-black text-amber-400 tabular-nums font-display">
                      Rs. {activeSpecial.price.toLocaleString()}
                    </span>
                    {activeSpecial.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through tabular-nums">
                        Rs. {activeSpecial.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 mb-6">
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    {lang === 'en' ? activeSpecial.name : activeSpecial.urduName}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                    {lang === 'en' ? activeSpecial.description : activeSpecial.urduDescription}
                  </p>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => onSelectItem(activeSpecial)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-98"
                >
                  <span>{lang === 'en' ? 'Customize & Order' : 'آرڈر منتخب کریں'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Thumbnails to Switch Between 3 Head Chef Arrivals */}
                <div className="mt-5 pt-4 border-t border-white/[0.08]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-2">
                    {lang === 'en' ? 'Switch Chef Arrivals:' : 'دیگر اسپیشلز:'}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {specials.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSpecialIndex(idx)}
                        className={`p-1.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                          activeSpecialIndex === idx
                            ? 'border-amber-400 bg-amber-400/10 text-white'
                            : 'border-white/5 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <div className="truncate">
                          <span className="text-[11px] font-bold block truncate text-white">
                            {item.name.split(' ')[0]}
                          </span>
                          <span className="text-[10px] text-amber-400 font-semibold tabular-nums">
                            Rs. {item.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
