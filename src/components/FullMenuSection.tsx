import React, { useState } from 'react';
import { Search, Plus, Filter, Flame, Sparkles, ArrowUpDown } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

interface FullMenuProps {
  onSelectItem: (item: MenuItem) => void;
  lang: 'en' | 'ur';
}

type CategoryKey = 'all' | 'chef-specials' | 'deals' | 'burgers' | 'pizzas' | 'platters' | 'sides' | 'drinks';

export const FullMenuSection: React.FC<FullMenuProps> = ({ onSelectItem, lang }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories: { key: CategoryKey; label: string; urduLabel: string }[] = [
    { key: 'all', label: 'All Items', urduLabel: 'تمام مینو' },
    { key: 'chef-specials', label: 'Chef Specials', urduLabel: 'شیف اسپیشل' },
    { key: 'deals', label: 'Super Deals', urduLabel: 'سپر ڈیلز' },
    { key: 'burgers', label: 'Burgers & Zingers', urduLabel: 'برگرز اور زنگرز' },
    { key: 'pizzas', label: 'Artisan Pizzas', urduLabel: 'پیزا ورائٹی' },
    { key: 'platters', label: 'Platters & Calzones', urduLabel: 'پلیٹرز اور کیلزون' },
    { key: 'sides', label: 'Sides & Wings', urduLabel: 'سائیڈز اور ونگز' },
    { key: 'drinks', label: 'Chilled Drinks', urduLabel: 'کولڈ ڈرنکس' },
  ];

  let filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.urduName && item.urduName.includes(query));
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-asc') {
    filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);
  }

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#0a0b10] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title and Controls Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Freshly Prepared Fast Food' : 'تازہ تیار کردہ فاسٹ فوڈ'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase text-white tracking-tight">
              {lang === 'en' ? 'Complete Digital Menu' : 'مکمل ڈیجیٹل مینو'}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {lang === 'en'
                ? 'Select any item to customize size, spice level, cold drink choice, and add-ons.'
                : 'اپنی پسندیدہ چیز منتخب کریں اور اپنی مرضی کے مطابق سائز اور اسپائس منتخب کریں۔'}
            </p>
          </div>

          {/* Search & Sort Row */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search burgers, pizza, deals...' : 'تلاش کریں...'}
                className="w-full pl-10 pr-4 py-2.5 bg-[#12131c] border border-white/10 focus:border-amber-400 rounded-xl text-xs text-white placeholder-zinc-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#12131c] border border-white/10 text-zinc-300 text-xs font-medium py-2.5 pl-3.5 pr-8 rounded-xl outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="featured">{lang === 'en' ? 'Sort: Featured' : 'ترتیب: منتخب'}</option>
                <option value="price-asc">{lang === 'en' ? 'Price: Low to High' : 'قیمت: کم سے زیادہ'}</option>
                <option value="price-desc">{lang === 'en' ? 'Price: High to Low' : 'قیمت: زیادہ سے کم'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none no-scrollbar mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-[#12131c] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/[0.05]'
              }`}
            >
              {lang === 'en' ? cat.label : cat.urduLabel}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#12131c] rounded-3xl border border-white/[0.06]">
            <p className="text-zinc-400 text-sm">
              {lang === 'en'
                ? 'No menu items match your search. Try another word or clear the filter.'
                : 'کوئی شے نہیں ملی۔ برائے مہربانی دوبارہ تلاش کریں۔'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-[#12131c] border border-white/[0.07] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12131c] via-transparent to-transparent opacity-80" />

                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-slate-950/90 text-amber-400 border border-amber-500/30 text-[10px] font-display font-black uppercase px-2.5 py-1 rounded-md shadow">
                      {item.badge}
                    </div>
                  )}

                  {item.originalPrice && (
                    <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      SALE
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {lang === 'en' ? item.name : item.urduName}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {lang === 'en' ? item.description : item.urduDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-semibold block">
                        {item.sizes ? (lang === 'en' ? 'Starts at' : 'شروع') : (lang === 'en' ? 'Price' : 'قیمت')}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-amber-400 tabular-nums font-display">
                          Rs. {item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-zinc-500 line-through tabular-nums">
                            Rs. {item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectItem(item)}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/10 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Add' : 'شامل'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
