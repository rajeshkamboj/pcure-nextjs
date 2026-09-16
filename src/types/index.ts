export type DoshaType = 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha';

export interface Author {
  id: string;
  name: string;
  credentials: string; // e.g. "BAMS, MD (Ayurveda)"
  role: string;
  avatarUrl: string;
}

export interface Disease {
  id: string;
  slug: string;
  name: string;
  sanskritName: string;
  category: 'Digestive' | 'Respiratory' | 'Skin & Hair' | 'Metabolic & Lifestyle' | 'Musculoskeletal' | 'Mind & Stress' | 'Women Health';
  summary: string;
  primaryDosha: DoshaType;
  updatedAt: string;
  reviewedBy: Author;
  readingTime: string;
  overview: string;
  ayurvedicPerspective: {
    nidana: string[]; // Root causes
    samprapti: string; // Disease pathogenesis
    doshaImbalance: string;
    dhatusAffected: string[]; // Tissues affected
  };
  symptoms: {
    classical: string[];
    modern: string[];
    warningSigns: string[];
  };
  causes: string[];
  dietAndLifestyle: {
    pathya: string[]; // Recommended foods & habits
    apathya: string[]; // Foods & habits to strictly avoid
    lifestyleTips: string[];
    yogaPranayama: string[];
  };
  precautions: string[];
  homeRemediesIds: string[]; // Reference to remedies
  keyIngredientsIds: string[]; // Reference to ingredients
  faqs: {
    question: string;
    answer: string;
  }[];
  references: {
    title: string;
    source: string;
    year?: string;
  }[];
  featured?: boolean;
}

export interface Remedy {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  purpose: string;
  targetCondition: string;
  diseaseId?: string;
  primaryDoshaBalancing: DoshaType;
  difficulty: 'Very Easy' | 'Easy' | 'Moderate';
  prepTime: string;
  featuredImage: string;
  ingredients: {
    name: string;
    ingredientId?: string;
    quantity: string;
    notes?: string;
  }[];
  preparation: string[];
  howToUse: {
    dosage: string;
    timing: string; // e.g., "Empty stomach in the morning"
    frequency: string; // e.g., "Once daily"
    anupana: string; // Carrier liquid (e.g. warm water, cow ghee, honey)
    duration: string; // e.g., "2 to 3 weeks continuously"
  };
  precautions: string[];
  whoShouldAvoid: string[];
  traditionalContext: string;
  verifiedBy: Author;
  tags: string[];
  featured?: boolean;
}

export interface Ingredient {
  id: string;
  slug: string;
  commonName: string;
  botanicalName: string;
  sanskritName: string;
  hindiName: string;
  category: 'Root / Rhizome' | 'Leaf / Herb' | 'Spice / Seed' | 'Fruit / Berry' | 'Resin / Mineral' | 'Bark / Wood';
  shortDescription: string;
  fullDescription: string;
  featuredImage: string;
  ayurvedicProperties: {
    rasa: string[]; // Taste: Sweet, Sour, Salty, Pungent, Bitter, Astringent
    guna: string[]; // Qualities: Light, Dry, Heavy, Unctuous
    virya: 'Sheeta (Cooling)' | 'Ushna (Heating)' | string;
    vipaka: 'Madhura (Sweet)' | 'Amla (Sour)' | 'Katu (Pungent)' | string;
    doshaEffect: string; // e.g. "Balances Vata & Kapha, may aggravate Pitta in excess"
  };
  keyBenefits: string[];
  therapeuticUses: string[];
  recommendedDosage: {
    churna: string; // Powder
    decoction?: string; // Kashayam / Tea
    extract?: string;
  };
  safetyAndContraindications: string[];
  featuredRemediesIds: string[];
  associatedDiseasesIds: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  author: Author;
  tags: string[];
}
