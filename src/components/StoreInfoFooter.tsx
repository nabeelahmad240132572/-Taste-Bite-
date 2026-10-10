import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Star, ShieldCheck, Navigation, Award } from 'lucide-react';
import { RESTAURANT_INFO, TESTIMONIALS } from '../data/menuData';

interface StoreInfoFooterProps {
  lang: 'en' | 'ur';
}

export const StoreInfoFooter: React.FC<StoreInfoFooterProps> = ({ lang }) => {
  return (
    <footer id="location" className="bg-[#07080c] border-t border-white/[0.08] text-zinc-300 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Customer Reviews Section */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-display font-black uppercase tracking-wider text-amber-400">
              {lang === 'en' ? 'Verified Customer Feedback' : 'گاہکوں کے تاثرات'}
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-black uppercase text-white mt-1">
              {lang === 'en' ? 'Loved Across Pattoki' : 'شہر بھر میں پسندیدہ'}
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              {lang === 'en'
                ? 'Over 1,450+ happy families and food lovers served along Multan Road.'
                : 'پتوکی اور ملتان روڈ پر سینکڑوں مطمئن خاندانوں کا اولین انتخاب۔'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#10111a] border border-white/[0.06] flex flex-col justify-between hover:border-amber-500/20 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block font-display">{t.name}</span>
                    <span className="text-[11px] text-zinc-500">{t.role}</span>
                  </div>
                  <span className="text-[10px] text-amber-400/90 font-medium bg-amber-400/10 px-2 py-0.5 rounded">
                    {t.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08]">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 p-[1px]">
                <div className="w-full h-full bg-[#0a0b10] rounded-[11px] flex items-center justify-center font-display font-black text-amber-400 text-lg">
                  T&B
                </div>
              </div>
              <div>
                <h4 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Taste & Bite
                </h4>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  {lang === 'en' ? 'Pattoki Gourmet Fast Food' : 'پتوکی فاسٹ فوڈ اور پیزا'}
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {lang === 'en'
                ? 'Taste & Bite is Pattoki’s premier destination for molten cheese lava burgers, crispy zingers, loaded fries, and freshly baked artisan pizza. Prepared with 100% fresh chicken and premium ingredients.'
                : 'ٹیسٹ اینڈ بائٹ پتوکی میں گرما گرم چیز لاوا برگرز، کرسپی زنگرز اور لذیذ پیزا کا مستند مرکز۔'}
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-[#12131b] border border-white/5 text-zinc-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Fresh Halal Ingredients</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#12131b] border border-white/5 text-zinc-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>25–35 Min Thermal Delivery</span>
              </span>
            </div>
          </div>

          {/* Col 2: Outlet Location and Hotline Details */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-display font-black text-sm text-white uppercase tracking-wider text-amber-400">
              {lang === 'en' ? 'Branch Outlet & Hotlines' : 'برانچ کا پتہ اور فون نمبرز'}
            </h5>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block font-display">
                    {lang === 'en' ? 'Official Address' : 'مرکزی پتہ'}:
                  </span>
                  <span className="leading-relaxed text-zinc-300">{RESTAURANT_INFO.address}</span>
                  <div className="mt-2">
                    <a
                      href="https://maps.google.com/?q=Total+Parco+Multan+Road+Pattoki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline font-semibold"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>{lang === 'en' ? 'Get Directions on Google Maps' : 'گوگل میپس پر لوکیشن دیکھیں'}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-zinc-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block font-display">
                    {lang === 'en' ? 'Operating Schedule' : 'اوقات کار'}:
                  </span>
                  <span>{RESTAURANT_INFO.openingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-zinc-300 pt-1">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white block font-display">
                    {lang === 'en' ? 'Call Directly' : 'براہ راست کال کریں'}:
                  </span>
                  <div className="flex flex-col gap-1 font-bold text-amber-400 text-sm tabular-nums">
                    <a href={`tel:${RESTAURANT_INFO.rawPhone1}`} className="hover:underline">
                      {RESTAURANT_INFO.phone1}
                    </a>
                    <a href={`tel:${RESTAURANT_INFO.rawPhone2}`} className="hover:underline">
                      {RESTAURANT_INFO.phone2}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Direct WhatsApp Ordering & Zones */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-display font-black text-sm text-white uppercase tracking-wider text-amber-400">
              {lang === 'en' ? 'Delivery Coverage Areas' : 'ڈلیوری ایریاز'}
            </h5>
            <p className="text-xs text-zinc-400">
              {lang === 'en'
                ? 'Our express riders deliver across key sectors of Pattoki and surrounding highways.'
                : 'پتوکی اور ملتان روڈ کے تمام اہم علاقوں میں فاسٹ ڈلیوری دستیاب ہے۔'}
            </p>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Assalam-o-Alaikum Taste & Bite! I would like to place an order in Pattoki.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-105 text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 0325-85 55 886</span>
            </a>

            <div className="p-3.5 rounded-2xl bg-[#11121a] border border-white/[0.06] text-[11px] text-zinc-400 space-y-1.5">
              <span className="font-bold text-zinc-200 block font-display uppercase tracking-wider">
                {lang === 'en' ? 'Active Delivery Zones:' : 'فعال ڈلیوری ایریاز:'}
              </span>
              <ul className="space-y-1">
                {RESTAURANT_INFO.deliveryAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Taste & Bite Pattoki. All rights reserved.</p>
          <p className="flex items-center gap-2 text-[11px]">
            <span>Usman Sundhu Petroleum, Multan Road, Pattoki</span>
            <span aria-hidden="true">·</span>
            <span>0325-85 55 886</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
