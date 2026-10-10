import React from 'react';
import { ShieldCheck, Flame, Sparkles, Truck, Award } from 'lucide-react';

interface QualityPillarsProps {
  lang: 'en' | 'ur';
}

export const QualityPillars: React.FC<QualityPillarsProps> = ({ lang }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: lang === 'en' ? '100% Fresh Halal Chicken' : '۱۰۰٪ تازہ حلال چکن',
      desc: lang === 'en'
        ? 'Never frozen. Premium whole breast fillets marinated for 24 hours in our secret herbal spice blend.'
        : 'روزانہ تازہ حاصل کیا گیا حلال چکن، بغیر کسی منجمد کیمیکل کے۔'
    },
    {
      icon: Flame,
      title: lang === 'en' ? 'Artisan Wood-Fired Crust' : 'دستکار اطالوی پیزا کرسٹ',
      desc: lang === 'en'
        ? 'Dough naturally fermented and hand-stretched for a crispy, charred crust and light airy center.'
        : 'قدرتی طور پر خمیر شدہ آٹا جو ہر پیزا کو کرسپی اور شاندار ذائقہ دیتا ہے۔'
    },
    {
      icon: Sparkles,
      title: lang === 'en' ? 'Molten Cheddar Lava' : 'اصلی لاوا چیز کی کوالٹی',
      desc: lang === 'en'
        ? 'Our famous lava burgers feature velvety, authentic melted cheddar crafted in-house daily.'
        : 'خالص چیز اور چائلڈ فرینڈلی سوسز جو ہر نوالے کو یادگار بناتی ہیں۔'
    },
    {
      icon: Truck,
      title: lang === 'en' ? 'Thermal Insulated Delivery' : 'تھرمل ہاٹ ڈلیوری',
      desc: lang === 'en'
        ? 'Dispatched directly from Total Parco Multan Road in thermal heat bags to ensure piping-hot delivery.'
        : 'گرما گرم تھرمل بیگز میں ۲۵ سے ۳۵ منٹ میں پتوکی بھر میں ڈلیوری۔'
    }
  ];

  return (
    <section className="py-12 bg-[#090a0f] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#11121a]/80 border border-white/[0.06] hover:border-amber-500/30 transition-all hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
