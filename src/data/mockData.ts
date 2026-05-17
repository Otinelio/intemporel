export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  available: boolean;
};

export type Category = {
  id: string;
  name: string;
  order: number;
};

export type RestaurantData = {
  categories: Category[];
  items: MenuItem[];
  settings: {
    name: string;
    tagline: string;
    whatsapp: string;
    address: string;
    hours: string;
    instagram: string;
    facebook: string;
  };
};

export const DEFAULT_DATA: RestaurantData = {
  categories: [
    { id: "cat_1", name: "Petits Déjeuners", order: 1 },
    { id: "cat_2", name: "Suggestions du Chef", order: 2 },
    { id: "cat_3", name: "Cuisine Française", order: 3 },
    { id: "cat_4", name: "Cuisine du Monde", order: 4 },
    { id: "cat_5", name: "Grillades", order: 5 },
    { id: "cat_6", name: "Desserts", order: 6 },
    { id: "cat_7", name: "Boissons & Cocktails", order: 7 }
  ],
  items: [
    // Petits Déjeuners
    {
      id: "item_pd_1",
      name: "Le Parisien",
      description: "Croissant chaud, pain au chocolat, baguette fraîche, beurre d'Isigny, confiture maison et jus d'orange pressé.",
      price: 4500,
      categoryId: "cat_1",
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_pd_2",
      name: "Petit Déjeuner Intemporel",
      description: "Œufs au choix (brouillés, au plat ou en omelette), saucisses grillées, bacon croustillant, tomates rôties et galettes de pomme de terre.",
      price: 6500,
      categoryId: "cat_1",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_pd_3",
      name: "Açai Bowl & Granola",
      description: "Mélange d'açai bio, bananes, baies sauvages, granola maison au miel du Togo et graines de chia.",
      price: 5000,
      categoryId: "cat_1",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600&auto=format&fit=crop",
      available: true
    },

    // Suggestions du Chef
    {
      id: "item_chef_1",
      name: "Assiette Intemporelle",
      description: "La suggestion du jour, selon le marché de Lomé et l'inspiration de notre Chef. Un voyage gustatif unique.",
      price: 10500,
      categoryId: "cat_2",
      image: "https://images.unsplash.com/photo-1544025162-811114092b3a?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_chef_2",
      name: "Carpaccio de Saint-Jacques",
      description: "Fines tranches de noix de Saint-Jacques, émulsion d'agrumes, huile de truffe blanche et jeunes pousses.",
      price: 14000,
      categoryId: "cat_2",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_chef_3",
      name: "Souris d'Agneau Confite",
      description: "Cuite lentement pendant 7 heures au romarin et au miel sauvage, servie sur un lit de purée de patates douces parfumée à la noix de muscade.",
      price: 15500,
      categoryId: "cat_2",
      image: "https://images.unsplash.com/photo-1544025162-811114092b3a?q=80&w=600&auto=format&fit=crop",
      available: true
    },

    // Cuisine Française
    {
      id: "item_fr_1",
      name: "Magret de Canard Miel-Épices",
      description: "Poitrine de canard laquée au miel local et aux cinq épices, jus corsé réduit et purée maison onctueuse.",
      price: 12000,
      categoryId: "cat_3",
      image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_fr_2",
      name: "Entrecôte sauce Roquefort",
      description: "Pièce de bœuf tendre (300g) grillée à la perfection, sauce crémeuse au bleu d'Auvergne, frites de maison.",
      price: 14500,
      categoryId: "cat_3",
      image: "https://images.unsplash.com/photo-1544025162-811114092b3a?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_fr_3",
      name: "Soupe à l'Oignon Traditionnelle",
      description: "Bouillon de bœuf riche, oignons caramélisés doucement, croûtons dorés et généreuse couche de gruyère gratiné.",
      price: 4500,
      categoryId: "cat_3",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop",
      available: true
    },

    // Cuisine du Monde
    {
      id: "item_monde_1",
      name: "Pad Thaï aux Crevettes",
      description: "Nouilles de riz sautées au wok, crevettes tigrées, tofu, germes de soja, cacahuètes pilées et citron vert.",
      price: 9500,
      categoryId: "cat_4",
      image: "https://images.unsplash.com/photo-1559311648-d46f4d8593d6?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_monde_2",
      name: "Tacos de Poisson à la Mexicaine",
      description: "Trois tortillas de maïs souples, filet de poisson croustillant, salsa de mangue fraîche, avocat et coriandre.",
      price: 8000,
      categoryId: "cat_4",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_monde_3",
      name: "Risotto crémeux aux Cèpes",
      description: "Riz Carnaroli cuit lentement au bouillon maison, champignons cèpes sauvages, parmesan Reggiano 24 mois.",
      price: 11000,
      categoryId: "cat_4",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=600&auto=format&fit=crop",
      available: true
    },

    // Grillades
    {
      id: "item_gri_1",
      name: "Poisson Braisé du Golfe",
      description: "Filet de capitaine grillé au feu de bois, sauce piment vert traditionnel, banane plantain dorée (Alloco).",
      price: 8500,
      categoryId: "cat_5",
      image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_gri_2",
      name: "Brochettes de Filet de Bœuf",
      description: "Morceaux de bœuf marinés aux épices de Kpalimé, oignons et poivrons colorés, servis avec riz parfumé.",
      price: 9800,
      categoryId: "cat_5",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_gri_3",
      name: "Côtelettes d'Agneau Grillées",
      description: "Côtelettes d'agneau juteuses parfumées aux herbes de Provence et à l'ail grillé, frites maison.",
      price: 13000,
      categoryId: "cat_5",
      image: "https://images.unsplash.com/photo-1544025162-811114092b3a?q=80&w=600&auto=format&fit=crop",
      available: true
    },

    // Desserts
    {
      id: "item_des_1",
      name: "Fondant au Chocolat & Glace Vanille",
      description: "Cœur coulant au chocolat noir 70%, boule de glace vanille Bourbon de Madagascar artisanale.",
      price: 4000,
      categoryId: "cat_6",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_des_2",
      name: "Crème Brûlée à la Vanille de Kpalimé",
      description: "Texture soyeuse parfumée, fine couche de sucre caramélisé à chaud au chalumeau.",
      price: 3500,
      categoryId: "cat_6",
      image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_des_3",
      name: "Tarte Tatin Maison",
      description: "Pommes caramélisées fondantes, pâte feuilletée croustillante dorée au four, pot de crème fraîche épaisse.",
      price: 4500,
      categoryId: "cat_6",
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop",
      available: true
    },

    // Boissons & Cocktails
    {
      id: "item_bev_1",
      name: "Cocktail Terrasse",
      description: "Rhum ambré, gingembre frais râpé, citron vert pressé, sirop de canne de Kpalimé.",
      price: 3500,
      categoryId: "cat_7",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_bev_2",
      name: "Bissap Maison Frais",
      description: "Jus traditionnel aux fleurs d'hibiscus séchées, infusé à la menthe poivrée fraîche et une touche d'ananas.",
      price: 2000,
      categoryId: "cat_7",
      image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=600&auto=format&fit=crop",
      available: true
    },
    {
      id: "item_bev_3",
      name: "Mojito Mangue Passion",
      description: "Rhum blanc, menthe fraîche, pulpe de fruits de la passion du Togo, mangue fraîche écrasée, eau gazeuse.",
      price: 4500,
      categoryId: "cat_7",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
      available: true
    }
  ],
  settings: {
    name: "L'Intemporel",
    tagline: "Le temps prend une autre saveur.",
    whatsapp: "+22890662320",
    address: "121 Rue des Camomilles, Kodjoviakopé — Lomé, Togo",
    hours: "Ouvert 7j/7 · 24h/24 (réception)",
    instagram: "@lintemporel.lome",
    facebook: "L'Intemporel Lomé"
  }
};

export const getRestaurantData = (): RestaurantData => {
  const data = localStorage.getItem("restaurantData");
  if (data) {
    try {
      const parsed = JSON.parse(data);
      // Force update if the user has an outdated list of items (e.g. from previous tests)
      if (!parsed.items || parsed.items.length < DEFAULT_DATA.items.length) {
        localStorage.setItem("restaurantData", JSON.stringify(DEFAULT_DATA));
        return DEFAULT_DATA;
      }
      return parsed;
    } catch (e) {
      return DEFAULT_DATA;
    }
  }
  return DEFAULT_DATA;
};

export const saveRestaurantData = (data: RestaurantData) => {
  localStorage.setItem("restaurantData", JSON.stringify(data));
};
