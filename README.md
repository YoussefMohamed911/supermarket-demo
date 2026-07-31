# Moamen & Bashar — متجر سوبر ماركت أونلاين (M&B)

## اللي اتعمل لحد دلوقتي

**الخطوة 1 — Database Schema** (`supabase/migrations/`)
- `00001` enums + branches + categories (هرمية) + profiles
- `00002` products (بدون variants، مع حقل `unit`) + product_images + inventory (لكل فرع)
- `00003` coupons + coupon_usages
- `00004` orders (رقم أوردر تلقائي، عنوان مخزّن كـ snapshot، constraint للتكامل المالي) + order_items
- `00005` Row Level Security — deny-by-default، كل الكتابة الإدارية عن طريق service_role

**الخطوة 2 — Project Setup**
- Next.js 15 (App Router) + TypeScript + Tailwind + `pnpm`
- هيكل جاهز لربط Supabase (`lib/supabase/client.ts` — لسه محتاج `pnpm add @supabase/supabase-js @supabase/ssr` بعد ما تدخل الـ API keys بتاعتك في `.env.local`)

**الخطوة 3 — الصفحات والمكونات**
- هوية بصرية: أخضر `#1B6B4A` + مانجو `#F4A22A`، خط Cairo، نقشة مشربية في الـ Hero
- `components/ui/badge.tsx`, `components/product-card.tsx`, `components/category-card.tsx`, `components/site-header.tsx`
- `app/page.tsx` — الصفحة الرئيسية (Hero + أقسام + عروض)
- `app/category/[slug]/page.tsx` — صفحة القسم
- `lib/mock-data.ts` — هيكل تصنيفات هرمي احترافي (13 قسم رئيسي، 75 قسم فرعي، زي كارفور) بدون أي منتجات تجريبية — الـ `products` array فاضية تمامًا، والمنتجات كلها بتتضاف يدويًا من `/admin/products`

**ملحوظة عن الصور:** الصور الحالية جايه من loremflickr (صور Flickr عامة حسب كلمة بحث، زي "tomatoes" أو "milk carton") — دي مش صور منتجات العميل الفعلية ومش مضمون ترخيصها التجاري بالكامل، فهي بس بديل شكلي مؤقت لحد ما ياخد صور حقيقية مرخّصة من منتجاته الفعلية (أو يشتري صور Stock مرخّصة). الكومبوننت `ProductImage` مبني بحيث لو رابط الصورة اتعطل أو مش موجود، يرجع تلقائي للإيموجي كـ fallback — فالبنية جاهزة لاستبدال الروابط دي بصور حقيقية بسهولة (مجرد تغيير حقل `image` لكل منتج، أو لاحقًا سحبها من `product_images` في قاعدة البيانات).

## علشان تشغّله عندك

```bash
pnpm install
cp .env.example .env.local   # حط الـ Supabase keys بتاعتك
pnpm dev
```

## ملحوظة عن الاستمرارية

الشات ده اتبني من ملف تصدير المحادثة السابقة اللي بعتهولي — مكنش فيه أكواد الـ artifacts نفسها (كانت متسجلة كـ "block not supported")، فأعدت بناء الـ migrations والمكونات من القرارات المعمارية المكتوبة في السامري. لو عندك أي كود سابق فعلي (SQL أو TSX) عايز تلزقه بدل اللي أعدت بناءه، ابعتهولي وهظبطه.

## الخطوات الجاية المقترحة

1. عمل مشروع Supabase فعلي وتشغيل الـ migrations
2. تركيب `@supabase/supabase-js` و `@supabase/ssr` وربط الـ client (browser + server)
3. صفحة السلة (state management) والـ Checkout
4. ربط لوحة إدارة المنتجات (`/admin/products`) بـ Supabase بدل localStorage، وإضافة تسجيل دخول للأدمن (حاليًا مفتوحة لأي حد يعرف الرابط — مقبول للتجربة، لازم تتقفل قبل النشر الفعلي)
5. رفع صور حقيقية (Supabase Storage) بدل الرابط اليدوي في نموذج الإضافة

## هيكل الأقسام (Main / Subcategory)

`app/category/[slug]/page.tsx` بيتعامل مع نفس المسار لحالتين:
- **زيارة قسم رئيسي** (مثلاً `/category/beverages`) → بتظهر تابات لكل الأقسام الفرعية بتاعته + تاب "الكل" مختار افتراضيًا، وبتعرض منتجات كل الأقسام الفرعية مجمّعة.
- **زيارة قسم فرعي مباشرة** (مثلاً `/category/tea`) → بتفتح نفس الصفحة بس التاب بتاع القسم الفرعي ده يبقى مختار تلقائيًا والمنتجات متفلترة عليه بس.

الدوس على أي تاب بيغيّر الـ URL (عن طريق `router.push`) عشان يفضل قابل للمشاركة ومتزامن مع الصفحة.

## لوحة إدارة المنتجات (`/admin/products`)

تقدر تضيف منتجاتكم الحقيقية (اسم، قسم، سعر، رابط صورة، وصف) من غير أي كود. المنتجات المضافة بتتخزن في `localStorage` بتاع المتصفح وبتظهر فورًا في الصفحة الرئيسية وصفحات الأقسام وصفحة تفاصيل المنتج. **ملحوظة:** ده تخزين محلي مؤقت — كل جهاز/متصفح هيشوف بس المنتجات اللي أضافها هو، ومش هيبقى متزامن بين الزوار لحد ما نربطها بقاعدة بيانات حقيقية (خطوة 4 فوق).
