import { Truck, ShieldCheck, BadgePercent, Clock } from "lucide-react";

const features = [
  { icon: Truck, label: "توصيل مجاني", sub: "لأوردر أكتر من 300 جنيه" },
  { icon: Clock, label: "توصيل سريع", sub: "خلال 60 دقيقة" },
  { icon: BadgePercent, label: "عروض يومية", sub: "أسعار تنافسية" },
  { icon: ShieldCheck, label: "دفع آمن", sub: "كاش أو أونلاين" },
];

export function TrustBar() {
  return (
    <section className="border-b border-ink/5 bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-5 md:grid-cols-4">
        {features.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-ink">{label}</span>
              <span className="text-[11px] text-ink-muted">{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
