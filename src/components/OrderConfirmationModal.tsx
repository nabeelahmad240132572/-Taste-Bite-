import React from 'react';
import { CheckCircle, Phone, Clock, MapPin, X, ArrowRight, MessageCircle } from 'lucide-react';
import { CustomerOrderDetails } from '../types/cart';
import { RESTAURANT_INFO } from '../data/menuData';

interface OrderConfirmationModalProps {
  orderId: string;
  total: number;
  orderDetails: CustomerOrderDetails | null;
  onClose: () => void;
  lang: 'en' | 'ur';
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  orderId,
  total,
  orderDetails,
  onClose,
  lang,
}) => {
  if (!orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
          {lang === 'en' ? 'Order Confirmed' : 'آرڈر کنفرم ہو گیا'}
        </span>

        <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mt-2">
          {lang === 'en' ? 'Thank You!' : 'شکریہ!'}
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          {lang === 'en'
            ? `Your order #${orderId} has been sent to Taste & Bite kitchen.`
            : `آپ کا آرڈر #${orderId} کچن کو بھیج دیا گیا ہے۔`}
        </p>

        {/* Live Delivery Status Stepper */}
        <div className="my-6 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-zinc-850 pb-2.5">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'Estimated Delivery' : 'متوقع ڈلیوری وقت'}:</span>
            </span>
            <span className="font-bold text-amber-400">25 - 40 Mins</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold">
                {lang === 'en' ? 'Order Received & Verified' : 'آرڈر موصول ہو گیا'}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-amber-400">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-semibold">
                {lang === 'en' ? 'Preparing in Kitchen (Pattoki)' : 'کچن میں تیار ہو رہا ہے'}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-500">
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
              <span>
                {lang === 'en' ? 'Rider Out for Delivery' : 'رائڈر روانہ ہو گا'}
              </span>
            </div>
          </div>
        </div>

        {/* Order Details summary */}
        <div className="p-4 rounded-xl bg-zinc-850/50 border border-zinc-800 text-left text-xs space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-slate-400">{lang === 'en' ? 'Customer' : 'گاہک'}:</span>
            <span className="font-semibold text-white">{orderDetails.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">{lang === 'en' ? 'Contact' : 'رابطہ'}:</span>
            <span className="font-semibold text-white">{orderDetails.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">{lang === 'en' ? 'Delivery Address' : 'پتہ'}:</span>
            <span className="font-semibold text-white truncate max-w-[220px]">
              {orderDetails.address}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold text-white">
            <span>{lang === 'en' ? 'Total Payable' : 'کل رقم'}:</span>
            <span className="text-amber-400 text-sm tabular-nums">
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`tel:${RESTAURANT_INFO.rawPhone1}`}
            className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>{lang === 'en' ? 'Call Branch Helpline' : 'ہیلپ لائن پر کال کریں'}</span>
          </a>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>{lang === 'en' ? 'Continue Browsing' : 'مزید مینو دیکھیں'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
