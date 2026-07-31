export type Subcategory = {
  slug: string;
  name: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  icon: string; // lucide icon name
  color: string;
  subcategories: Subcategory[];
};

export type Product = {
  id: string;
  name: string;
  categorySlug: string; // references a SUBcategory slug (leaf level)
  price: number;
  compareAtPrice?: number;
  unit: string; // e.g. "الكيلو", "العلبة", "القطعة"
  description: string;
  hasOffer?: boolean;
  emoji: string; // fallback if `image` fails to load
  image?: string; // product photo: a URL, or a base64 data URL from an admin upload
};

export const categories: Category[] = [
  {
    id: "1",
    slug: "fresh-food",
    name: "طعام طازج",
    icon: "Drumstick",
    color: "#2C5389",
    subcategories: [
      { slug: "meat-poultry", name: "لحوم ودواجن" },
      { slug: "fish-seafood", name: "أسماك ومأكولات بحرية" },
      { slug: "dairy-eggs", name: "ألبان وبيض" },
    ],
  },
  {
    id: "2",
    slug: "fruits-vegetables",
    name: "خضار وفاكهة",
    icon: "Carrot",
    color: "#F4A22A",
    subcategories: [
      { slug: "fruits", name: "فاكهة" },
      { slug: "herbs", name: "أعشاب" },
      { slug: "vegetables", name: "خضار" },
    ],
  },
  {
    id: "3",
    slug: "food-cupboard",
    name: "بقالة جافة",
    icon: "Package",
    color: "#2C5389",
    subcategories: [
      { slug: "cooking-ingredients", name: "مكونات الطبخ" },
      { slug: "jams-honey-spreads", name: "مربى وعسل ومعجنات للدهن" },
      { slug: "biscuits-cakes", name: "بسكويت وكيك" },
      { slug: "chocolate-sweets", name: "شوكولاتة وحلويات" },
      { slug: "chips-dips", name: "شيبسي وصوصات" },
      { slug: "home-baking", name: "مستلزمات الخبيز المنزلي" },
      { slug: "breakfast", name: "فطار" },
      { slug: "nuts-dried-fruits", name: "مكسرات وفواكه مجففة" },
      { slug: "world-specialities", name: "أطعمة عالمية" },
      { slug: "condiments-dressings", name: "صلصات وتتبيلات" },
      { slug: "rice-pasta-pulses", name: "أرز ومكرونة وبقوليات" },
    ],
  },
  {
    id: "4",
    slug: "beverages",
    name: "مشروبات",
    icon: "CupSoda",
    color: "#F4A22A",
    subcategories: [
      { slug: "water", name: "مياه" },
      { slug: "coffee", name: "قهوة" },
      { slug: "tea", name: "شاي" },
      { slug: "soft-drinks", name: "مشروبات غازية" },
      { slug: "juices", name: "عصائر" },
      { slug: "powder-drinks", name: "مشروبات بودرة" },
      { slug: "kids-drinks", name: "مشروبات أطفال" },
    ],
  },
  {
    id: "5",
    slug: "baby-care",
    name: "عناية الطفل",
    icon: "Baby",
    color: "#2C5389",
    subcategories: [
      { slug: "feeding", name: "أدوات إطعام" },
      { slug: "baby-healthcare", name: "رعاية صحية للطفل" },
      { slug: "milk-food-juices", name: "حليب وأطعمة وعصائر أطفال" },
      { slug: "baby-essentials", name: "مستلزمات أساسية للطفل" },
    ],
  },
  {
    id: "6",
    slug: "frozen-food",
    name: "أغذية مجمدة",
    icon: "Snowflake",
    color: "#F4A22A",
    subcategories: [
      { slug: "frozen-fish-seafood", name: "أسماك ومأكولات بحرية مجمدة" },
      { slug: "frozen-fruits-vegetables", name: "خضار وفاكهة مجمدة" },
      { slug: "frozen-meat-poultry", name: "لحوم ودواجن مجمدة" },
      { slug: "fries-nuggets", name: "بطاطس ونجتس" },
    ],
  },
  {
    id: "7",
    slug: "bio-organic-food",
    name: "أغذية عضوية",
    icon: "Leaf",
    color: "#2C5389",
    subcategories: [
      { slug: "organic-baby-food", name: "أطعمة أطفال عضوية" },
      { slug: "organic-dairy-products", name: "ألبان عضوية" },
      { slug: "free-from", name: "خالي من مسببات الحساسية" },
      { slug: "organic-fruits-vegetables", name: "خضار وفاكهة عضوية" },
      { slug: "organic-food-cupboard", name: "بقالة عضوية" },
    ],
  },
  {
    id: "8",
    slug: "bakery",
    name: "مخبوزات",
    icon: "Croissant",
    color: "#F4A22A",
    subcategories: [
      { slug: "oriental-sweets", name: "حلويات شرقية" },
      { slug: "flatbread", name: "عيش بلدي وفينو" },
      { slug: "pastries", name: "معجنات" },
      { slug: "bread-rolls", name: "عيش وتوست" },
    ],
  },
  {
    id: "9",
    slug: "pet-supplies",
    name: "مستلزمات الحيوانات الأليفة",
    icon: "PawPrint",
    color: "#2C5389",
    subcategories: [
      { slug: "pet-care", name: "عناية بالحيوانات الأليفة" },
      { slug: "pet-food", name: "أطعمة الحيوانات الأليفة" },
      { slug: "pet-accessories", name: "إكسسوارات الحيوانات الأليفة" },
    ],
  },
  {
    id: "10",
    slug: "beauty-personal-care",
    name: "عناية شخصية وتجميل",
    icon: "Sparkles",
    color: "#F4A22A",
    subcategories: [
      { slug: "dental-care", name: "عناية بالأسنان" },
      { slug: "ladies-hair-removal", name: "إزالة شعر حريمي" },
      { slug: "hair-care", name: "عناية بالشعر" },
      { slug: "shower-bath-soap", name: "استحمام وصابون" },
      { slug: "suncare-travel-size", name: "عناية بالشمس ومقاسات سفر" },
      { slug: "face-body-skin-care", name: "عناية بالبشرة" },
      { slug: "spray-perfume", name: "بخاخات وعطور" },
      { slug: "nail-care", name: "منتجات عناية بالأظافر" },
      { slug: "mens-grooming", name: "عناية رجالي" },
      { slug: "makeup-nails", name: "مكياج وأظافر" },
      { slug: "personal-care-wellbeing", name: "عناية شخصية وصحة عامة" },
    ],
  },
  {
    id: "11",
    slug: "health",
    name: "الصحة",
    icon: "HeartPulse",
    color: "#2C5389",
    subcategories: [
      { slug: "healthcare-nutrition", name: "رعاية صحية وتغذية" },
    ],
  },
  {
    id: "12",
    slug: "cleaning-household",
    name: "منظفات ومستلزمات المنزل",
    icon: "SprayCan",
    color: "#F4A22A",
    subcategories: [
      { slug: "cleaning-supplies", name: "مستلزمات تنظيف" },
      { slug: "garbage-bags", name: "أكياس قمامة" },
      { slug: "laundry-detergents", name: "غسيل ومنظفات" },
      { slug: "tissues", name: "مناديل" },
      { slug: "candles-air-fresheners", name: "شموع ومعطرات جو" },
      { slug: "food-storage-foil-cling-film", name: "تخزين طعام وفويل ونايلون" },
      { slug: "insect-pest-control", name: "مبيدات حشرية" },
      { slug: "kitchen-toilet-rolls", name: "ورق مطبخ وتواليت" },
      { slug: "disposable-tableware", name: "أدوات مائدة يوزّة" },
    ],
  },
  {
    id: "13",
    slug: "home-appliances",
    name: "أدوات ومستلزمات منزلية",
    icon: "Home",
    color: "#2C5389",
    subcategories: [
      { slug: "party-supplies", name: "مستلزمات حفلات" },
      { slug: "bedroom", name: "غرفة نوم" },
      { slug: "diy-electricals", name: "أدوات وكهربائيات" },
      { slug: "home-storage", name: "تخزين منزلي" },
      { slug: "bathroom-laundry", name: "حمام وغسيل" },
      { slug: "outdoor-furniture", name: "أثاث خارجي" },
      { slug: "gardening-equipment", name: "أدوات حديقة" },
      { slug: "kitchen-dining", name: "مطبخ وسفرة" },
      { slug: "home-decor", name: "ديكور منزلي" },
      { slug: "barbeques-camping", name: "شوايات وتخييم" },
    ],
  },
];

export const products: Product[] = [];

// ---- Lookup helpers -------------------------------------------------

export function findMainCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Finds a subcategory by its slug, returning it together with its parent main category. */
export function findSubcategory(
  slug: string
): { main: Category; sub: Subcategory } | undefined {
  for (const main of categories) {
    const sub = main.subcategories.find((s) => s.slug === slug);
    if (sub) return { main, sub };
  }
  return undefined;
}

/** Given a product's categorySlug (a subcategory slug, normally), returns the
 *  owning main category — falling back to treating the slug as a main
 *  category slug directly, for resilience with older/custom data. */
export function getMainCategoryForSlug(slug: string): Category | undefined {
  return findSubcategory(slug)?.main ?? findMainCategory(slug);
}

export function getProductsBySubcategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

/** All products across every subcategory under a given main category. */
export function getProductsByMainCategory(mainSlug: string) {
  const main = findMainCategory(mainSlug);
  if (!main) return [];
  const subSlugs = new Set(main.subcategories.map((s) => s.slug));
  return products.filter((p) => subSlugs.has(p.categorySlug));
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export const offers = products.filter((p) => p.hasOffer);
