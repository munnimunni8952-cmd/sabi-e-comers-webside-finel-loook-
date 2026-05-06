export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  tag?: string;
  specifications?: string[];
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  { id: 'watches', name: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800' },
  { id: 'sunglasses', name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800' },
  { id: 'bracelets', name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800' },
  { id: 'perfumes', name: 'Perfumes', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800' },
  { id: 'wallets', name: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800' },
  { id: 'cufflinks', name: 'Cufflinks', image: 'https://images.unsplash.com/photo-1613919429712-498f37d3910c?q=80&w=800' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'w1',
    name: 'Royal Chronograph Gold',
    price: 99000,
    category: 'watches',
    description: 'Immerse yourself in timeless luxury with the Royal Chronograph. Featuring a precision movement and 24k gold accents.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800'
    ],
    tag: 'New Arrival',
    isTrending: true,
    specifications: ['42mm Case Size', 'Swiss Quartz Movement', 'Water Resistant to 100m', 'Sapphire Crystal']
  },
  {
    id: 'w2',
    name: 'Midnight Onyx Edition',
    price: 69000,
    category: 'watches',
    description: 'A masterpiece of minimalism. The Midnight Onyx features a matte black finish with subtle gold hour markers.',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800',
    isTrending: true,
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=800',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800'
    ],
    specifications: ['40mm Case Size', 'Japanese Automatic Movement', 'Premium Leather Strap']
  },
  {
    id: 'w3',
    name: 'Oceanic Diver Pro',
    price: 115000,
    category: 'watches',
    description: 'The ultimate tool watch for the modern explorer. Built to withstand the depths with unmistakable style.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800',
      'https://images.unsplash.com/photo-1526333665835-d248386bca77?q=80&w=800',
      'https://images.unsplash.com/photo-1539533377285-bb4255b72260?q=80&w=800',
      'https://images.unsplash.com/photo-1619423248224-b15265463f13?q=80&w=800'
    ],
    tag: 'Special Offer'
  },
  {
    id: 's1',
    name: 'Aviator Gold Classics',
    price: 35000,
    category: 'sunglasses',
    isTrending: true,
    description: 'Timeless aviator silhouette reimagined for the modern luxury seeker. Polarized lenses and gold-plated frames.',
    image: 'https://images.unsplash.com/photo-1511499767350-a1590fdb2e4e?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1511499767350-a1590fdb2e4e?q=80&w=800',
      'https://images.unsplash.com/photo-1604433132791-a9606552bc66?q=80&w=800',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800'
    ]
  },
  {
    id: 'b1',
    name: 'Titanium Link Bracelet',
    price: 25000,
    category: 'bracelets',
    description: 'Sophisticated craftsmanship meets industrial strength. A versatile piece for every occasion.',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?q=80&w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800'
    ]
  },
  {
    id: 'p1',
    name: 'Essence of Gold Pour Homme',
    price: 14500,
    category: 'perfumes',
    description: 'A bold, sophisticated fragrance with notes of oud, leather, and dark amber.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800',
      'https://images.unsplash.com/photo-1583445013765-48c227339831?q=80&w=800',
      'https://images.unsplash.com/photo-1512777576244-b846ac3d412f?q=80&w=800'
    ]
  },
  {
    id: 'wt1',
    name: 'Heritage Leather Wallet',
    price: 19500,
    category: 'wallets',
    description: 'Full-grain Italian leather wallet designed to age beautifully while keeping your essentials organized.',
    image: 'https://images.unsplash.com/photo-1606503175654-b4a62164aa12?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1606503175654-b4a62164aa12?q=80&w=800',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800',
      'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800',
      'https://images.unsplash.com/photo-1524311545627-1428f7311181?q=80&w=800'
    ]
  },
  {
    id: 'cl1',
    name: 'Masterpiece Cufflinks',
    price: 12000,
    category: 'cufflinks',
    description: 'The perfect finishing touch for your formal attire. Crafted from sterling silver with gold inlay.',
    image: 'https://images.unsplash.com/photo-1613919429712-498f37d3910c?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1613919429712-498f37d3910c?q=80&w=800',
      'https://images.unsplash.com/photo-1613843513337-9759714856b3?q=80&w=800',
      'https://images.unsplash.com/photo-1531303435785-3bc738421359?q=80&w=800',
      'https://images.unsplash.com/photo-1530514101736-eff876a47a2f?q=80&w=800'
    ]
  },
];
