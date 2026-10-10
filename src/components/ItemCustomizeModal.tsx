import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { CartItem } from '../types/cart';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  lang: 'en' | 'ur';
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0].label : ''
  );
  const [selectedDrink, setSelectedDrink] = useState<string>(
    item.options?.drinks && item.options.drinks.length > 0 ? item.options.drinks[0] : ''
  );
  const [selectedSpice, setSelectedSpice] = useState<string>(
    item.options?.spiceLevels && item.options.spiceLevels.length > 0
      ? item.options.spiceLevels[0]
      : 'Classic Mild'
  );
  const [addExtraCheese, setAddExtraCheese] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Calculate unit price based on size
  let basePrice = item.price;
  if (item.sizes && selectedSize) {
    const sizeObj = item.sizes.find((s) => s.label === selectedSize);
    if (sizeObj) basePrice = sizeObj.price;
  }
  const cheeseExtraPrice = addExtraCheese ? 120 : 0;
  const unitPrice = basePrice + cheeseExtraPrice;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${item.id}-${selectedSize || 'def'}-${selectedDrink || 'none'}-${selectedSpice || 'def'}-${addExtraCheese ? 'cheese' : 'no'}-${Date.now()}`,
      menuItem: item,
      selectedSize: selectedSize || undefined,
      selectedDrink: selectedDrink || undefined,
      selectedSpice: selectedSpice || undefined,
      unitPrice,
      quantity,
      notes: notes.trim() ? notes.trim() : undefined,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#12131d] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative aspect-[16/9] bg-zinc-950 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12131d] via-transparent to-transparent opacity-90" />

          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer border border-white/10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
            <span className="text-amber-400 font-display font-black text-sm tabular-nums">
              Rs. {unitPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
              {lang === 'en' ? item.name : item.urduName}
            </h3>
            <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
              {lang === 'en' ? item.description : item.urduDescription}
            </p>
          </div>

          {/* Size Options */}
          {item.sizes && item.sizes.length > 0 && (
            <div>
              <label className="text-[11px] font-display font-bold uppercase tracking-wider text-zinc-400 block mb-2.5">
                {lang === 'en' ? 'Select Pizza Size' : 'سائز منتخب کریں'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {item.sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSelectedSize(s.label)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedSize === s.label
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-white/5 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="font-display font-bold text-sm block text-white">{s.label}</span>
                      <span className="text-xs text-amber-400 font-semibold tabular-nums">
                        Rs. {s.price.toLocaleString()}
                      </span>
                    </div>
                    {selectedSize === s.label && (
                      <Check className="w-4 h-4 text-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cold Drink Choice */}
          {item.options?.drinks && item.options.drinks.length > 0 && (
            <div>
              <label className="text-[11px] font-display font-bold uppercase tracking-wider text-zinc-400 block mb-2.5">
                {lang === 'en' ? 'Choose Cold Drink Flavor' : 'کولڈ ڈرنک منتخب کریں'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {item.options.drinks.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDrink(d)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                      selectedDrink === d
                        ? 'border-amber-400 bg-amber-400/15 text-amber-300 font-bold'
                        : 'border-white/5 bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level */}
          {item.options?.spiceLevels && item.options.spiceLevels.length > 0 && (
            <div>
              <label className="text-[11px] font-display font-bold uppercase tracking-wider text-zinc-400 block mb-2.5">
                {lang === 'en' ? 'Select Spice Level' : 'مرچ کا لیول'}
              </label>
              <div className="flex flex-wrap gap-2">
                {item.options.spiceLevels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedSpice(lvl)}
                    className={`py-2 px-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedSpice === lvl
                        ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                        : 'border-white/5 bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>{lvl}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Addon (Molten Cheese Lava) */}
          <div className="pt-1">
            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-white/10 bg-zinc-900/60 cursor-pointer hover:border-amber-500/30 transition-colors">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  {lang === 'en' ? 'Add Extra Molten Cheese Blast (+ Rs. 120)' : 'اضافی لاوا چیز شامل کریں (+ ۱۲۰ روپے)'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={addExtraCheese}
                onChange={(e) => setAddExtraCheese(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Special notes */}
          <div>
            <label className="text-[11px] font-display font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
              {lang === 'en' ? 'Cooking Notes (Optional)' : 'خصوصی ہدایات'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Extra ketchup, well-toasted bun' : 'مثلاً: کم مرچ، زیادہ کیچپ...'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Footer with quantity and add to cart */}
        <div className="p-5 border-t border-white/10 bg-[#0c0d14] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-zinc-400 hover:text-white p-0.5 cursor-pointer transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm text-white w-6 text-center tabular-nums font-display">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-zinc-400 hover:text-white p-0.5 cursor-pointer transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-105 text-slate-950 font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer active:scale-98 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {lang === 'en' ? 'Add to Order' : 'آرڈر میں شامل کریں'} · Rs. {totalPrice.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
