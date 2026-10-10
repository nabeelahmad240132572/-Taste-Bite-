import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Truck,
  CheckCircle2,
  Phone,
  CreditCard,
  Banknote,
  Tag,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CartItem, CustomerOrderDetails } from '../types/cart';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderDetails: CustomerOrderDetails, orderId: string, total: number) => void;
  lang: 'en' | 'ur';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  lang,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedArea, setSelectedArea] = useState(RESTAURANT_INFO.deliveryAreas[0]);
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash_easypaisa'>('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const isFreeDelivery = orderType === 'pickup' || subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = subtotal === 0 || orderType === 'pickup' ? 0 : isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee;
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const amountNeededForFreeDelivery = Math.max(
    0,
    RESTAURANT_INFO.freeDeliveryThreshold - subtotal
  );

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'TASTE10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount({ code, amount: discount });
      setPromoError('');
    } else if (code === 'WELCOME50' || code === 'PATTOKI50') {
      setAppliedDiscount({ code, amount: 50 });
      setPromoError('');
    } else {
      setPromoError(lang === 'en' ? 'Invalid code. Try TASTE10 or PATTOKI50' : 'غلط کوڈ۔ TASTE10 آزمائیں۔');
    }
  };

  const validateDetails = (): boolean => {
    if (!customerName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your full name.' : 'براہ کرم اپنا نام درج کریں۔');
      return false;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid mobile number (e.g. 0325-8555886).' : 'براہ کرم درست فون نمبر درج کریں۔');
      return false;
    }
    if (orderType === 'delivery' && !customerAddress.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your street address / landmark in Pattoki.' : 'براہ کرم پتوکی میں مکمل پتہ درج کریں۔');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      `🍔 *TASTE & BITE PATTOKI — NEW ORDER*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📦 *Order Type:* ${orderType === 'delivery' ? 'Home Delivery' : 'Self Pickup / Takeaway'}`,
      `👤 *Customer:* ${customerName.trim()}`,
      `📞 *Phone:* ${customerPhone.trim()}`,
      `📍 *Area:* ${selectedArea}`,
    ];

    if (orderType === 'delivery') {
      lines.push(`🏠 *Address:* ${customerAddress.trim()}`);
    }

    lines.push(`💳 *Payment:* ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'JazzCash / EasyPaisa Online'}`);
    lines.push(``);
    lines.push(`📋 *ITEMS ORDERED:*`);

    cartItems.forEach((item, idx) => {
      let itemLine = `${idx + 1}. *${item.menuItem.name}* x ${item.quantity} = Rs. ${(item.unitPrice * item.quantity).toLocaleString()}`;
      const customList = [];
      if (item.selectedSize) customList.push(`Size: ${item.selectedSize}`);
      if (item.selectedDrink) customList.push(`Drink: ${item.selectedDrink}`);
      if (item.selectedSpice) customList.push(`Spice: ${item.selectedSpice}`);
      if (item.notes) customList.push(`Note: ${item.notes}`);
      if (customList.length > 0) {
        itemLine += `\n   ↳ (${customList.join(', ')})`;
      }
      lines.push(itemLine);
    });

    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`Subtotal: Rs. ${subtotal.toLocaleString()}`);
    if (orderType === 'delivery') {
      lines.push(`Delivery Fee: ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}`);
    }
    if (discountAmount > 0) {
      lines.push(`Discount (${appliedDiscount?.code}): -Rs. ${discountAmount}`);
    }
    lines.push(`💰 *TOTAL PAYABLE: Rs. ${grandTotal.toLocaleString()}*`);
    if (orderNotes.trim()) {
      lines.push(`📝 *Special Note:* ${orderNotes.trim()}`);
    }
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`Please confirm and begin kitchen preparation. Thank you!`);

    return encodeURIComponent(lines.join('\n'));
  };

  const handleWhatsAppCheckout = () => {
    if (!validateDetails()) return;
    const msg = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${msg}`;
    window.open(whatsappUrl, '_blank');

    const orderId = `TB-${Math.floor(100000 + Math.random() * 900000)}`;
    onOrderSuccess(
      {
        name: customerName,
        phone: customerPhone,
        address: orderType === 'delivery' ? `${customerAddress}, ${selectedArea}` : 'Self Pickup at Outlet',
        area: selectedArea,
        paymentMethod,
        notes: orderNotes,
      },
      orderId,
      grandTotal
    );
  };

  const handleDirectOrder = () => {
    if (!validateDetails()) return;
    const orderId = `TB-${Math.floor(100000 + Math.random() * 900000)}`;
    onOrderSuccess(
      {
        name: customerName,
        phone: customerPhone,
        address: orderType === 'delivery' ? `${customerAddress}, ${selectedArea}` : 'Self Pickup at Outlet',
        area: selectedArea,
        paymentMethod,
        notes: orderNotes,
      },
      orderId,
      grandTotal
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#11121b] border-l border-white/10 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0b0c12]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-display font-black text-lg text-white uppercase tracking-tight">
                {lang === 'en' ? 'Your Food Order' : 'آپ کا آرڈر'}
              </h2>
              <span className="text-xs font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full tabular-nums">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery / Pickup Switch */}
          <div className="p-3 bg-[#0d0e15] border-b border-white/[0.06] flex items-center gap-2">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                orderType === 'delivery'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Delivery (25-35 Mins)' : 'ہوم ڈلیوری'}</span>
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex-1 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                orderType === 'pickup'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Takeaway Pickup' : 'برانچ سے پک اپ'}</span>
            </button>
          </div>

          {/* Delivery Meter */}
          {orderType === 'delivery' && (
            <div className="px-5 py-3 bg-[#141521] border-b border-white/[0.06]">
              {isFreeDelivery ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Congratulations! Free Delivery unlocked for Pattoki.'
                      : 'مبارک ہو! آپ کو پتوکی میں مفت ڈلیوری مل گئی ہے۔'}
                  </span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {lang === 'en'
                          ? `Add Rs. ${amountNeededForFreeDelivery} more for FREE Delivery`
                          : `مفت ڈلیوری کے لیے مزید ${amountNeededForFreeDelivery} روپے شامل کریں`}
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (subtotal / RESTAURANT_INFO.freeDeliveryThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 text-zinc-400 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-base text-white">
                  {lang === 'en' ? 'Your cart is empty' : 'آپ کی باسکٹ خالی ہے'}
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  {lang === 'en'
                    ? 'Explore our head chef pizzas, lava burgers, and exclusive deals to begin.'
                    : 'شروع کرنے کے لیے مینو سے کوئی لذیذ کھانا منتخب کریں۔'}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#151622] border border-white/[0.06] flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-display font-bold text-sm text-white">
                            {lang === 'en' ? item.menuItem.name : item.menuItem.urduName}
                          </h4>
                          <span className="text-xs font-black text-amber-400 tabular-nums ml-2 font-display">
                            Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        {/* Customizations tags */}
                        <div className="flex flex-wrap gap-1.5 mt-1 text-[11px] text-zinc-400">
                          {item.selectedSize && <span className="text-amber-300/80">{item.selectedSize}</span>}
                          {item.selectedDrink && (
                            <>
                              <span>·</span>
                              <span>{item.selectedDrink}</span>
                            </>
                          )}
                          {item.selectedSpice && (
                            <>
                              <span>·</span>
                              <span>{item.selectedSpice}</span>
                            </>
                          )}
                          {item.notes && (
                            <>
                              <span>·</span>
                              <span className="italic">{item.notes}</span>
                            </>
                          )}
                        </div>

                        {/* Quantity adjuster */}
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex items-center border border-white/10 bg-zinc-900 rounded-lg">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-white tabular-nums font-display">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (e.g. TASTE10)"
                      className="flex-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 uppercase font-mono outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-amber-400 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedDiscount && (
                    <span className="text-[11px] text-emerald-400 mt-1 block">
                      ✓ Coupon {appliedDiscount.code} applied (-Rs. {appliedDiscount.amount})
                    </span>
                  )}
                  {promoError && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {promoError}
                    </span>
                  )}
                </div>

                {/* Checkout Information Form */}
                <div className="pt-4 border-t border-white/[0.08] space-y-3.5">
                  <h3 className="text-xs font-display font-black uppercase tracking-wider text-amber-400">
                    {lang === 'en' ? 'Customer & Delivery Info' : 'گاہک اور ڈلیوری کی تفصیلات'}
                  </h3>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      {lang === 'en' ? 'Your Name *' : 'آپ کا نام *'}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={lang === 'en' ? 'e.g. Nabeel Ahmad' : 'مثال: نبیل احمد'}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      {lang === 'en' ? 'Mobile / WhatsApp Number *' : 'موبائل / واٹس ایپ نمبر *'}
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0325-8555886"
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      {lang === 'en' ? 'Pattoki Delivery Zone' : 'پتوکی ڈلیوری ایریا'}
                    </label>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {RESTAURANT_INFO.deliveryAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        {lang === 'en' ? 'House / Street / Landmark *' : 'مکان / گلی / نزدیکی مقام *'}
                      </label>
                      <textarea
                        rows={2}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder={
                          lang === 'en'
                            ? 'e.g. Near Judicial Complex, Multan Road, House #...'
                            : 'مثال: نزد جوڈیشل کمپلیکس، ملتان روڈ...'
                        }
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 resize-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1.5">
                      {lang === 'en' ? 'Payment Method' : 'طریقہ ادائیگی'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'border-amber-400 bg-amber-400/10 text-white'
                            : 'border-white/5 bg-zinc-900/60 text-zinc-400'
                        }`}
                      >
                        <Banknote className="w-3.5 h-3.5 text-amber-400" />
                        <span>Cash on Delivery</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('jazzcash_easypaisa')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                          paymentMethod === 'jazzcash_easypaisa'
                            ? 'border-amber-400 bg-amber-400/10 text-white'
                            : 'border-white/5 bg-zinc-900/60 text-zinc-400'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                        <span>JazzCash / EasyPaisa</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer totals & actions */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-white/[0.08] bg-[#0c0d13] space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Subtotal' : 'سب ٹوٹل'}</span>
                  <span className="font-semibold text-white tabular-nums">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'Delivery Fee' : 'ڈلیوری فیس'}</span>
                    <span className="font-semibold text-white tabular-nums">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400 uppercase font-bold">FREE</span>
                      ) : (
                        `Rs. ${deliveryFee}`
                      )}
                    </span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-Rs. {discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-display">{lang === 'en' ? 'Grand Total' : 'کل رقم'}</span>
                  <span className="text-amber-400 font-display font-black tabular-nums text-lg">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-105 text-white font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {lang === 'en'
                      ? 'Instant WhatsApp Checkout'
                      : 'واٹس ایپ کے ذریعے آرڈر کریں'}
                  </span>
                </button>

                <button
                  onClick={handleDirectOrder}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'en'
                      ? 'Confirm Web Order'
                      : 'ویب سائٹ کے ذریعے کنفرم کریں'}
                  </span>
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Clear Shopping Cart' : 'کارٹ خالی کریں'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
