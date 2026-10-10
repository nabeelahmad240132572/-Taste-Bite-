import React from 'react';
import { Sparkles, Check, ShoppingBag, Flame, Tag, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

interface DealsSectionProps {
  onSelectItem: (item: MenuItem) => void;
  lang: 'en' | 'ur';
}

export const DealsSection: React.FC<DealsSectionProps> = ({ onSelectItem, lang }) => {
  const deals = MENU_ITEMS.filter((item) => item.category === 'deals');

  return (
    <section id="deals" className="py-16 sm:py-24 bg-[#0a0b10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Super Value Combos' : 'سپر ویلیو ڈیلز'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase text-white tracking-tight">
              {lang === 'en' ? 'Taste & Bite Exclusive Deals' : 'ٹیسٹ اینڈ بائٹ اسپیشل ڈیلز'}
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              {lang === 'en'
                ? 'Handcrafted combo packages designed for maximum taste and unbeatable savings for solo meals, couples, and family feasts.'
                : 'بڑے سائز اور شاندار بچت کے ساتھ تیار کردہ فلائر کی تمام آفیشل ڈیلز۔'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-semibold bg-[#12131b] border border-white/10 px-3.5 py-2 rounded-xl">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{lang === 'en' ? 'Chilled Soft Drink Included with Every Deal' : 'ہر ڈیل کے ساتھ ٹھنڈی ڈرنک شامل ہے'}</span>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, idx) => {
            const savings = deal.originalPrice ? deal.originalPrice - deal.price : null;

            return (
              <div
                key={deal.id}
                className="group relative rounded-3xl bg-[#12131c] border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-black"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12131c] via-[#12131c]/30 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="bg-slate-950/90 text-amber-400 font-display font-black text-xs px-3 py-1 rounded-lg border border-amber-500/30 shadow uppercase">
                      {deal.name.split('(')[0].trim()}
                    </span>
                  </div>

                  {savings && (
                    <div className="absolute top-3.5 right-3.5 bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg shadow">
                      {lang === 'en' ? `SAVE Rs. ${savings}` : `${savings} بچت`}
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">
                      {lang === 'en' ? deal.name : deal.urduName}
                    </h3>

                    {/* Breakdown items */}
                    <div className="mt-4 space-y-2.5 bg-zinc-900/60 p-3.5 rounded-2xl border border-white/[0.04]">
                      {deal.contents?.map((itemContent, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span className="font-medium">{itemContent}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-3 text-[11px] text-zinc-400 italic">
                      {lang === 'en' ? deal.description : deal.urduDescription}
                    </p>
                  </div>

                  {/* Card Price & CTA */}
                  <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                    <div>
                      {deal.originalPrice && (
                        <span className="text-[11px] text-zinc-500 line-through tabular-nums block">
                          Rs. {deal.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <div className="text-2xl font-black text-amber-400 tabular-nums font-display">
                        Rs. {deal.price.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectItem(deal)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Order Deal' : 'ڈیل لیں'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
