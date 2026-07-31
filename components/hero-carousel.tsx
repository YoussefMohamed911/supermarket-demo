"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    tag: "عروض الأسبوع",
    title: "خصومات لحد 30% على الألبان والمخبوزات",
    subtitle: "منتجات طازة، أسعار تنافسية، وتوصيل سريع لحد باب البيت.",
    cta: "ابدأ التسوق",
  },
  {
    tag: "توصيل سريع",
    title: "طلبك يوصلك في أقل من 60 دقيقة",
    subtitle: "اختار فرعك القريب واستمتع بتوصيل سريع كل يوم.",
    cta: "اطلب دلوقتي",
  },
  {
    tag: "منتجات طازة يوميًا",
    title: "خضار وفاكهة طازة تدخل المتجر كل صباح",
    subtitle: "جودة مضمونة، مصادر موثوقة، أسعار عادلة.",
    cta: "شوف الخضار والفاكهة",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="hero-gradient mashrabiya-pattern relative overflow-hidden">
      {/* Decorative depth element — large soft circle, purely visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute -end-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl md:h-96 md:w-96"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div key={active} className="max-w-md animate-fade-up">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">
            {slide.tag}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">
            {slide.title}
          </h1>
          <p className="mt-3 text-sm text-white/80 md:text-base">{slide.subtitle}</p>
          <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-primary transition-transform hover:scale-[1.02] active:scale-95">
            {slide.cta}
          </button>
        </div>

        {/* Dots */}
        <div className="mt-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`سلايد ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
