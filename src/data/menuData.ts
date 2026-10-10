export interface MenuItem {
  id: string;
  name: string;
  urduName: string;
  category: 'chef-specials' | 'deals' | 'burgers' | 'pizzas' | 'platters' | 'sides' | 'drinks';
  description: string;
  urduDescription?: string;
  price: number;
  originalPrice?: number;
  sizes?: {
    label: string;
    price: number;
  }[];
  image: string;
  badge?: string;
  isHeadChefPick?: boolean;
  isPopular?: boolean;
  contents?: string[];
  options?: {
    drinks?: string[];
    spiceLevels?: string[];
    addCheesePrice?: number;
  };
}

export const RESTAURANT_INFO = {
  name: 'Taste & Bite',
  tagline: 'Pattoki’s Premier Gourmet Fast Food & Artisan Pizza',
  urduTagline: 'پتوکی کا سب سے معیاری اور لذیذ فاسٹ فوڈ اور پیزا',
  phone1: '0325-85 55 886',
  phone2: '0326-85 55 886',
  rawPhone1: '03258555886',
  rawPhone2: '03268555886',
  whatsappNumber: '923258555886',
  address: 'Usman Sundhu Petroleum, Total Parco Multan Road, Near Judicial Complex, Pattoki',
  urduAddress: 'عثمان سندھو پٹرولیم، ٹوٹل پارکو ملتان روڈ، نزد جوڈیشل کمپلیکس، پتوکی',
  openingHours: '12:00 PM - 02:00 AM (Open 7 Days)',
  deliveryTime: '25 - 35 Mins',
  minimumOrder: 400,
  deliveryFee: 100,
  freeDeliveryThreshold: 2000,
  rating: 4.9,
  reviewsCount: '1,450+',
  deliveryAreas: [
    'Total Parco / Multan Road',
    'Near Judicial Complex',
    'Pattoki City Center',
    'Habibabad Road',
    'Model Town Pattoki',
    'Kanganpur Road Area'
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // Head Chef Specials (from flyer top)
  {
    id: 'dynamite-grill-pizza',
    name: 'Dynamite Grill Pizza',
    urduName: 'ڈائنامائٹ گرل پیزا',
    category: 'chef-specials',
    description: 'Crisp wood-fired artisan crust loaded with spicy marinated chicken boti, mozzarella cheese, caramelized red onions, fiery jalapeños, and drizzled with signature creamy dynamite relish.',
    urduDescription: 'ڈبل چیز، اسپائسی گرلڈ چکن اور خاص ڈائنامائٹ سوس کے ساتھ سرکردہ شیف کی خاص پیشکش۔',
    price: 1549,
    originalPrice: 1750,
    sizes: [
      { label: 'Medium', price: 1549 },
      { label: 'Large', price: 2199 }
    ],
    image: '/src/assets/images/dynamite_grill_pizza_1791565828576.jpg',
    badge: 'Head Chef Pick',
    isHeadChefPick: true,
    isPopular: true,
    options: {
      spiceLevels: ['Mild', 'Spicy', 'Extra Dynamite Hot']
    }
  },
  {
    id: 'stack-lava-burger',
    name: 'Stack Lava Burger',
    urduName: 'سٹیک لاوا برگر',
    category: 'chef-specials',
    description: 'Thick gourmet fried chicken fillet nestled in a glossy toasted sesame bun, completely showered with piping-hot molten golden cheddar cheese lava cascading down the sides.',
    urduDescription: 'کرسپی چکن پیٹی، جس پر گرما گرم پگھلی ہوئی پنیر لاوا کی طرح بہتی ہے۔',
    price: 650,
    originalPrice: 750,
    image: '/src/assets/images/stack_lava_burger_1791565840006.jpg',
    badge: 'Molten Lava',
    isHeadChefPick: true,
    isPopular: true,
    options: {
      spiceLevels: ['Classic', 'Spicy Fire']
    }
  },
  {
    id: 'taste-bite-special-burger',
    name: 'Taste & Bite Special Burger',
    urduName: 'ٹیسٹ اینڈ بائٹ اسپیشل برگر',
    category: 'chef-specials',
    description: 'Our towering signature burger: dual golden-crisp whole chicken breast fillets, melted American cheddar layers, crunchy iceberg, pickles, and our secret recipe house relish.',
    urduDescription: 'ڈبل کرسپی چکن فلے، ڈبل پگھلا ہوا پنیر، تازی سلاد اور خفیہ خصوصی سوس۔',
    price: 720,
    originalPrice: 820,
    image: '/src/assets/images/taste_bite_special_burger_1791565852212.jpg',
    badge: 'House Special',
    isHeadChefPick: true,
    isPopular: true,
    options: {
      spiceLevels: ['Mild', 'Spicy']
    }
  },

  // Deals (1 to 5 from flyer)
  {
    id: 'deal-1',
    name: 'Deal - 1 (Solo Zinger Combo)',
    urduName: 'ڈیل ۱ (سولو زنگر کومبو)',
    category: 'deals',
    description: '1 Crispy Zinger Burger + Regular Golden Fries + 500ml Chilled Cold Drink',
    urduDescription: '۱ زنگر برگر + ۱ ریگولر فرائز + ۵۰۰ ملی لیٹر کولڈ ڈرنک',
    price: 680,
    originalPrice: 840,
    image: '/src/assets/images/crispy_zinger_crunch_1791602212952.jpg',
    badge: 'Best Value',
    isPopular: true,
    contents: ['1 Crispy Zinger Burger', '1 Regular French Fries', '1 Cold Drink (500ml)'],
    options: {
      drinks: ['Coca-Cola', 'Sprite', 'Fanta', 'Mountain Dew'],
      spiceLevels: ['Classic Mild', 'Spicy Zinger']
    }
  },
  {
    id: 'deal-2',
    name: 'Deal - 2 (Pizza & Nuggets Combo)',
    urduName: 'ڈیل ۲ (پیزا اور نگٹس کومبو)',
    category: 'deals',
    description: '1 Medium Artisan Pizza (Any Flavor) + 5 pcs Golden Chicken Nuggets + 500ml Chilled Cold Drink',
    urduDescription: '۱ میڈیم پیزا + ۵ نگٹس + ۵۰۰ ملی لیٹر کولڈ ڈرنک',
    price: 1500,
    originalPrice: 1850,
    image: '/src/assets/images/dynamite_grill_pizza_1791565828576.jpg',
    badge: 'Duo Favorite',
    isPopular: true,
    contents: ['1 Medium Pizza (Choice of flavor)', '5 Pcs Crispy Nuggets', '1 Cold Drink (500ml)'],
    options: {
      drinks: ['Coca-Cola', 'Sprite', 'Fanta', 'Mountain Dew']
    }
  },
  {
    id: 'deal-3',
    name: 'Deal - 3 (Large Pizza & Hot Wings)',
    urduName: 'ڈیل ۳ (لارج پیزا اور ہاٹ ونگز)',
    category: 'deals',
    description: '1 Fresh Large Artisan Pizza + 5 pcs Fiery Glazed Hot Wings + 1 Ltr Cold Drink',
    urduDescription: '۱ لارج پیزا + ۵ ہاٹ ونگز + ۱ لیٹر کولڈ ڈرنک',
    price: 1950,
    originalPrice: 2400,
    image: '/src/assets/images/dynamite_grill_pizza_1791565828576.jpg',
    badge: 'Family Saver',
    isPopular: true,
    contents: ['1 Fresh Large Pizza', '5 Pcs Spicy Hot Wings', '1 Ltr Chilled Drink'],
    options: {
      drinks: ['Coca-Cola', 'Sprite', 'Fanta', 'Mountain Dew']
    }
  },
  {
    id: 'deal-4',
    name: 'Deal - 4 (Mega 5-Zinger Party)',
    urduName: 'ڈیل ۴ (۵ زنگر فیملی پارٹی)',
    category: 'deals',
    description: '5 Monster Crispy Zinger Burgers + 1.5 Ltr Jumbo Family Cold Drink',
    urduDescription: '۵ کرسپی زنگر برگر + ۱.۵ لیٹر فیملی کولڈ ڈرنک',
    price: 2299,
    originalPrice: 2800,
    image: '/src/assets/images/taste_bite_special_burger_1791565852212.jpg',
    badge: 'Friends & Family',
    isPopular: true,
    contents: ['5 Giant Zinger Burgers', '1.5 Ltr Family Cold Drink'],
    options: {
      drinks: ['Coca-Cola', 'Sprite', 'Fanta', 'Mountain Dew'],
      spiceLevels: ['Classic Mild', 'Spicy Zinger']
    }
  },
  {
    id: 'deal-5',
    name: 'Deal - 5 (Double Large Pizza Feast)',
    urduName: 'ڈیل ۵ (ڈبل لارج پیزا فیسٹ)',
    category: 'deals',
    description: '2 Freshly Baked Large Artisan Pizzas + 1.5 Ltr Family Cold Drink',
    urduDescription: '۲ لارج پیزا + ۱.۵ لیٹر فیملی کولڈ ڈرنک',
    price: 2999,
    originalPrice: 3800,
    image: '/src/assets/images/dynamite_grill_pizza_1791565828576.jpg',
    badge: 'Mega Feast',
    isPopular: true,
    contents: ['2 Large Fresh Pizzas (Any Flavors)', '1.5 Ltr Jumbo Family Drink'],
    options: {
      drinks: ['Coca-Cola', 'Sprite', 'Fanta', 'Mountain Dew']
    }
  },

  // Platters & Calzones (from flyer left sidebar)
  {
    id: 'taste-bite-special-platter',
    name: 'Taste & Bite Special Platter',
    urduName: 'ٹیسٹ اینڈ بائٹ اسپیشل پلیٹر',
    category: 'platters',
    description: '4 pcs succulent Bihari rolls, 6 pcs spicy glazed wings, golden seasoned fries, and our signature garlic herb dip.',
    urduDescription: '۴ بہاری رول + ۶ ونگز فرائز کے ساتھ + ۱ خاص ڈپ سوس',
    price: 1080,
    originalPrice: 1250,
    image: '/src/assets/images/special_platter_calzone_1791565863040.jpg',
    badge: 'Signature Platter',
    isPopular: true,
    contents: ['4 pcs Bihari Chicken Rolls', '6 pcs Crispy Wings with Fries', 'Signature House Dip Sauce']
  },
  {
    id: 'stuffed-calzone',
    name: 'Stuffed Calzone Deluxe',
    urduName: 'سٹفڈ کیلزون ڈیلکس',
    category: 'platters',
    description: '4 pcs giant golden folded calzone chunks bursting with spiced chicken & melted cheese, served with special sauce, crispy fries, and 0.5 Ltr cold drink.',
    urduDescription: '۴ پیسز سٹفڈ کیلزون ٹکڑے، اسپیشل سوس، فرائز اور ۰.۵ لیٹر ڈرنک کے ساتھ۔',
    price: 1350,
    originalPrice: 1550,
    image: '/src/assets/images/special_platter_calzone_1791565863040.jpg',
    badge: 'Chef Creation',
    isPopular: true,
    contents: ['4 pcs Stuffed Calzone Chunks', 'Special Calzone Dip Sauce', 'Seasoned Golden Fries', '0.5 Ltr Chilled Drink'],
    options: {
      drinks: ['Coca-Cola', 'Sprite', 'Fanta', 'Mountain Dew']
    }
  },

  // Classic Burgers & Zingers
  {
    id: 'crispy-zinger-single',
    name: 'Crispy Zinger Burger',
    urduName: 'کرسپی زنگر برگر',
    category: 'burgers',
    description: 'Crispy hand-breaded golden chicken breast fillet, shredded iceberg lettuce, and velvety mayonnaise in a toasted sesame bun.',
    urduDescription: 'کرسپی فرائیڈ چکن، تازی سلاد اور مایو۔',
    price: 420,
    image: '/src/assets/images/crispy_zinger_crunch_1791602212952.jpg',
    badge: 'Top Seller',
    isPopular: true,
    options: {
      spiceLevels: ['Classic Mild', 'Extra Spicy']
    }
  },
  {
    id: 'double-zinger-tower',
    name: 'Double Zinger Tower Burger',
    urduName: 'ڈبل زنگر ٹاور برگر',
    category: 'burgers',
    description: 'Two gigantic crispy zinger fillets stacked with melted American cheese slices and smoky BBQ mayonnaise.',
    urduDescription: 'ڈبل کرسپی زنگر پیٹیز، چیز اور اسپیشل سوس۔',
    price: 680,
    originalPrice: 780,
    image: '/src/assets/images/taste_bite_special_burger_1791565852212.jpg',
    badge: 'Monster Size'
  },
  {
    id: 'classic-chicken-burger',
    name: 'Classic Tender Chicken Burger',
    urduName: 'کلاسک چکن برگر',
    category: 'burgers',
    description: 'Spiced tender minced chicken patty with sliced fresh tomatoes, crisp pickles, and creamy house slaw.',
    price: 290,
    image: '/src/assets/images/hero_taste_and_bite_1791565814293.jpg'
  },

  // Artisan Pizzas
  {
    id: 'chicken-tikka-pizza',
    name: 'Chicken Tikka Pizza',
    urduName: 'چکن تکہ پیزا',
    category: 'pizzas',
    description: 'Local favorite: smoky char-grilled chicken tikka chunks, crisp onions, marinara tomato sauce, and double mozzarella cheese.',
    price: 1250,
    sizes: [
      { label: 'Medium', price: 1250 },
      { label: 'Large', price: 1850 }
    ],
    image: '/src/assets/images/dynamite_grill_pizza_1791565828576.jpg'
  },
  {
    id: 'chicken-fajita-pizza',
    name: 'Chicken Fajita Pizza',
    urduName: 'چکن فجیتا پیزا',
    category: 'pizzas',
    description: 'Mexican marinated fajita chicken, crunchy bell peppers, black sliced olives, and rich melted mozzarella.',
    price: 1290,
    sizes: [
      { label: 'Medium', price: 1290 },
      { label: 'Large', price: 1890 }
    ],
    image: '/src/assets/images/dynamite_grill_pizza_1791565828576.jpg'
  },

  // Sides & Appetizers
  {
    id: 'regular-golden-fries',
    name: 'Hot & Golden Fries',
    urduName: 'کرسپی گولڈن فرائز',
    category: 'sides',
    description: 'Crisp golden potato fries lightly dusted in our secret aromatic chaat masala seasoning.',
    price: 220,
    sizes: [
      { label: 'Regular', price: 220 },
      { label: 'Large', price: 350 }
    ],
    image: '/src/assets/images/loaded_cheesy_fries_platter_1791602227429.jpg'
  },
  {
    id: 'loaded-cheese-fries',
    name: 'Loaded Lava Cheese Fries',
    urduName: 'لوڈڈ لاوا چیز فرائز',
    category: 'sides',
    description: 'Skillet of golden fries drowned in hot molten cheddar cheese lava, crispy chicken chunks, and jalapeños.',
    price: 490,
    image: '/src/assets/images/loaded_cheesy_fries_platter_1791602227429.jpg',
    badge: 'Crowd Favorite'
  },
  {
    id: 'crispy-nuggets',
    name: 'Crispy Chicken Nuggets (6 Pcs)',
    urduName: 'چکن نگٹس (۶ عدد)',
    category: 'sides',
    description: 'Golden crumb coated tender chicken bites served with sweet garlic chili dip.',
    price: 360,
    image: '/src/assets/images/special_platter_calzone_1791565863040.jpg'
  },
  {
    id: 'hot-wings-side',
    name: 'Spicy Buffalo Wings (6 Pcs)',
    urduName: 'ہاٹ ونگز (۶ عدد)',
    category: 'sides',
    description: 'Crispy chicken wings glazed in spicy tangy peri-peri garlic sauce.',
    price: 450,
    image: '/src/assets/images/special_platter_calzone_1791565863040.jpg'
  },

  // Drinks
  {
    id: 'drink-500ml',
    name: 'Cold Drink (500ml Bottle)',
    urduName: 'کولڈ ڈرنک (۵۰۰ ملی لیٹر)',
    category: 'drinks',
    description: 'Chilled refreshing bottled drink of your choice (Coca-Cola, Sprite, Fanta, Mountain Dew).',
    price: 120,
    image: '/src/assets/images/hero_taste_and_bite_1791565814293.jpg',
    options: {
      drinks: ['Coca-Cola', 'Sprite', 'Fanta', 'Mountain Dew']
    }
  },
  {
    id: 'drink-1-5ltr',
    name: 'Family Cold Drink (1.5 Ltr Bottle)',
    urduName: 'فیملی کولڈ ڈرنک (۱.۵ لیٹر)',
    category: 'drinks',
    description: '1.5 Liter cold drink bottle perfect for sharing with meals.',
    price: 240,
    image: '/src/assets/images/hero_taste_and_bite_1791565814293.jpg',
    options: {
      drinks: ['Coca-Cola', 'Sprite', 'Fanta', 'Mountain Dew']
    }
  }
];

export const TESTIMONIALS = [
  {
    name: 'Muhammad Usman',
    role: 'Food Blogger & Local Resident',
    comment: 'The Stack Lava Burger is genuinely unbeatable in Pattoki. The cheese quality is rich and the chicken patty stays crunchiest even after home delivery.',
    rating: 5,
    date: 'Verified Order'
  },
  {
    name: 'Hamza Tariq',
    role: 'Judicial Complex Area',
    comment: 'Dynamite Grill Pizza has that authentic wood-fired smokiness. Ordered Deal 3 for dinner, reached our door in 28 minutes piping hot!',
    rating: 5,
    date: 'Verified Order'
  },
  {
    name: 'Rana Bilal',
    role: 'Regular Customer, Multan Road',
    comment: 'Best platter in town. The Bihari rolls and wings with dip are 10/10. Professional staff and quick WhatsApp ordering.',
    rating: 5,
    date: 'Verified Order'
  }
];
