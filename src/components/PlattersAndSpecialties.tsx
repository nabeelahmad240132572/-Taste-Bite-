import React from 'react';
import { Sparkles, Check, ShoppingBag, ArrowRight, Flame } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

interface PlattersProps {
  onSelectItem: (item: MenuItem) => void;
  lang: 'en' | 'ur';
}

export const PlattersAndSpecialties: React.FC<PlattersProps> = ({ onSelectItem, lang }) => {
  const platterItem = MENU_ITEMS.find((m) => m.id === 'taste-bite-special-platter');
  const calzoneItem = MENU_ITEMS.find((m) => m.id === 'stuffed-calzone');
  const zingerItem = MENU_ITEMS.find((m) => m.id === 'crispy-zinger-single');
  const friesItem = MENU_ITEMS.find((m) => m.id === 'regular-golden-fries');

  return (
    <section id="platters" className="py-16 sm:py-24 bg-[#0c0d13] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Chef Signature Platters' : 'شیف اسپیشل پلیٹرز'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase text-white tracking-tight">
              {lang === 'en' ? 'Platters & Stuffed Calzones' : 'پلیٹرز اور سٹفڈ کیلزون'}
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              {lang === 'en'
                ? 'Feast on full-course platters with Bihari rolls and wings, or hand-folded golden calzones baked with overflowing mozzarella.'
                : 'بہاری رولز، ہاٹ ونگز، فرائز اور لذیذ سوس کے ساتھ تیار کردہ بھرپور فیملی پلیٹرز۔'}
            </p>
          </div>
        </div>

        {/* 2 Flagship Horizontal Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Special Platter */}
          {platterItem && (
            <div className="rounded-3xl bg-[#12131c] border border-white/[0.08] overflow-hidden hover:border-amber-500/40 transition-all duration-300 shadow-2xl flex flex-col md:flex-row group">
              <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto overflow-hidden bg-zinc-950">
                <img
                  src={platterItem.image}
                  alt={platterItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3.5 left-3.5 bg-amber-500 text-slate-950 font-display font-black text-xs px-2.5 py-1 rounded-lg shadow">
                  {lang === 'en' ? 'CHEF PLATTER' : 'اسپیشل پلیٹر'}
                </div>
              </div>

              <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-black text-2xl text-white uppercase group-hover:text-amber-400 transition-colors tracking-tight">
                    {lang === 'en' ? platterItem.name : platterItem.urduName}
                  </h3>

                  <div className="mt-4 space-y-2.5 bg-zinc-900/60 p-3.5 rounded-2xl border border-white/[0.04]">
                    {platterItem.contents?.map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-semibold">{c}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3.5 text-xs text-zinc-400 leading-relaxed">
                    {lang === 'en' ? platterItem.description : platterItem.urduDescription}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    {platterItem.originalPrice && (
                      <span className="text-[11px] text-zinc-500 line-through tabular-nums block">
                        Rs. {platterItem.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-black text-amber-400 tabular-nums font-display">
                      Rs. {platterItem.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectItem(platterItem)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Order Platter' : 'پلیٹر لیں'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stuffed Calzone */}
          {calzoneItem && (
            <div className="rounded-3xl bg-[#12131c] border border-white/[0.08] overflow-hidden hover:border-amber-500/40 transition-all duration-300 shadow-2xl flex flex-col md:flex-row group">
              <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto overflow-hidden bg-zinc-950">
                <img
                  src={calzoneItem.image}
                  alt={calzoneItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3.5 left-3.5 bg-red-600 text-white font-display font-black text-xs px-2.5 py-1 rounded-lg shadow">
                  {lang === 'en' ? 'STUFFED CHEESE' : 'چیز کیلزون'}
                </div>
              </div>

              <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-black text-2xl text-white uppercase group-hover:text-amber-400 transition-colors tracking-tight">
                    {lang === 'en' ? calzoneItem.name : calzoneItem.urduName}
                  </h3>

                  <div className="mt-4 space-y-2.5 bg-zinc-900/60 p-3.5 rounded-2xl border border-white/[0.04]">
                    {calzoneItem.contents?.map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-semibold">{c}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3.5 text-xs text-zinc-400 leading-relaxed">
                    {lang === 'en' ? calzoneItem.description : calzoneItem.urduDescription}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    {calzoneItem.originalPrice && (
                      <span className="text-[11px] text-zinc-500 line-through tabular-nums block">
                        Rs. {calzoneItem.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-black text-amber-400 tabular-nums font-display">
                      Rs. {calzoneItem.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectItem(calzoneItem)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Order Calzone' : 'کیلزون لیں'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2 Quick Sidebar Items with new photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {zingerItem && (
            <div className="rounded-2xl bg-[#12131c] border border-white/[0.08] hover:border-amber-500/30 p-4 sm:p-5 flex items-center justify-between gap-4 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/5 bg-zinc-950">
                  <img
                    src={zingerItem.image}
                    alt={zingerItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    {lang === 'en' ? 'CRISPY ZINGER' : 'کرسپی زنگر'}
                  </span>
                  <h4 className="font-display font-black text-lg text-white group-hover:text-amber-400 transition-colors">
                    {lang === 'en' ? zingerItem.name : zingerItem.urduName}
                  </h4>
                  <p className="text-sm text-amber-400 font-bold mt-0.5 tabular-nums">
                    Rs. {zingerItem.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectItem(zingerItem)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-all border border-white/10 cursor-pointer shrink-0"
              >
                {lang === 'en' ? 'Quick Add' : 'شامل کریں'}
              </button>
            </div>
          )}

          {friesItem && (
            <div className="rounded-2xl bg-[#12131c] border border-white/[0.08] hover:border-amber-500/30 p-4 sm:p-5 flex items-center justify-between gap-4 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/5 bg-zinc-950">
                  <img
                    src={friesItem.image}
                    alt={friesItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    {lang === 'en' ? 'HOT SIDE ORDER' : 'سائیڈ آرڈر'}
                  </span>
                  <h4 className="font-display font-black text-lg text-white group-hover:text-amber-400 transition-colors">
                    {lang === 'en' ? friesItem.name : friesItem.urduName}
                  </h4>
                  <p className="text-sm text-amber-400 font-bold mt-0.5 tabular-nums">
                    Rs. {friesItem.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectItem(friesItem)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-all border border-white/10 cursor-pointer shrink-0"
              >
                {lang === 'en' ? 'Quick Add' : 'شامل کریں'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
