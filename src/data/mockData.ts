import { Author, Disease, Remedy, Ingredient, Article } from '../types';

export const AUTHORS: Record<string, Author> = {
  dr_sharma: {
    id: 'dr_sharma',
    name: 'Vaidya Anand Sharma',
    credentials: 'BAMS, MD (Ayurveda Dravyaguna)',
    role: 'Chief Ayurvedic Medical Editor',
    avatarUrl: 'https://images.pexels.com/photos/5480036/pexels-photo-5480036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
  dr_priya: {
    id: 'dr_priya',
    name: 'Dr. Priya Varma',
    credentials: 'BAMS, Fellowship in Panchakarma',
    role: 'Senior Clinical Ayurveda Practitioner',
    avatarUrl: 'https://images.pexels.com/photos/7615621/pexels-photo-7615621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
  dr_menon: {
    id: 'dr_menon',
    name: 'Vaidya K. Raghavan Menon',
    credentials: 'PhD (Rasashastra), BAMS',
    role: 'Traditional Herbology Researcher',
    avatarUrl: 'https://images.pexels.com/photos/34086126/pexels-photo-34086126.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  }
};

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'ing_turmeric',
    slug: 'turmeric-haridra',
    commonName: 'Turmeric',
    botanicalName: 'Curcuma longa',
    sanskritName: 'Haridra',
    hindiName: 'Haldi',
    category: 'Root / Rhizome',
    shortDescription: 'The golden sovereign of Ayurvedic medicine, famed for clearing toxins (Ama), purifying the blood (Rakta Shodhana), and reducing systemic inflammation.',
    fullDescription: 'Haridra (Curcuma longa) is regarded in classical Ayurvedic texts like Charaka Samhita as one of the premier anti-inflammatory, antimicrobial, and blood-purifying rhizomes. It stimulates liver function, kindles digestive fire (Agni) without aggravating Pitta when taken appropriately, and supports respiratory immunity.',
    featuredImage: 'https://images.pexels.com/photos/30688214/pexels-photo-30688214.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ayurvedicProperties: {
      rasa: ['Tikta (Bitter)', 'Katu (Pungent)'],
      guna: ['Ruksha (Dry)', 'Laghu (Light)'],
      virya: 'Ushna (Heating)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Pacifies Kapha and Vata; balances Pitta in moderation (excessive dosage may warm Pitta).'
    },
    keyBenefits: [
      'Potent natural anti-inflammatory & antioxidant',
      'Supports healthy liver function & bile secretion',
      'Purifies blood (Rakta-shodhaka) and enhances complexion',
      'Promotes joint mobility and relieves morning stiffness',
      'Soothes throat irritation and seasonal bronchial congestion'
    ],
    therapeuticUses: [
      'Prameha (Metabolic disorders & early diabetes)',
      'Kushta (Skin ailments, acne & dermatitis)',
      'Sandhivata (Joint aches & osteoarthritis)',
      'Kasa & Shwasa (Cough & respiratory congestion)'
    ],
    recommendedDosage: {
      churna: '1 to 3 grams daily with warm milk or honey',
      decoction: '30 to 50 ml freshly boiled root decoction'
    },
    safetyAndContraindications: [
      'Use with caution in acute gallstone obstructions or active bile duct colic',
      'Excess raw turmeric may dry mucosal linings in high-Vata constitutions; best paired with healthy fats like A2 ghee or whole milk',
      'Discontinue high supplementary doses 2 weeks before elective surgical procedures'
    ],
    featuredRemediesIds: ['rem_golden_milk', 'rem_kashayam_cough'],
    associatedDiseasesIds: ['dis_acidity', 'dis_joint_pain', 'dis_cough_cold']
  },
  {
    id: 'ing_ginger',
    slug: 'ginger-ardraka-shunthi',
    commonName: 'Ginger (Fresh / Dry)',
    botanicalName: 'Zingiber officinale',
    sanskritName: 'Ardraka (Fresh) / Shunthi (Dry)',
    hindiName: 'Adrak / Sonth',
    category: 'Root / Rhizome',
    shortDescription: 'Celebrated as "Vishwa Bheshaja" (the universal medicine) in Ayurveda for igniting digestive Agni, eliminating mucus, and restoring warmth.',
    fullDescription: 'Ginger holds a supreme place in Ayurvedic pharmacopeia. In its fresh form (Ardraka), it is a moistening digestive stimulant and diaphoretic; in dried form (Shunthi), it possesses a sweet post-digestive effect (Madhura Vipaka), making it exceptionally nourishing for joints and digestive tissues without drying the colon.',
    featuredImage: 'https://images.pexels.com/photos/8704811/pexels-photo-8704811.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ayurvedicProperties: {
      rasa: ['Katu (Pungent)'],
      guna: ['Guru (Heavy)', 'Ruksha (Dry - Shunthi) / Snigdha (Unctuous - Fresh)'],
      virya: 'Ushna (Heating)',
      vipaka: 'Madhura (Sweet post-digestive effect for dried Shunthi)',
      doshaEffect: 'Pacifies Vata and Kapha; safe for Pitta in dried moderate form.'
    },
    keyBenefits: [
      'Kindles Agni (gastric fire) without producing hyperacidity when balanced',
      'Relieves bloating, flatulence, and sluggish post-meal digestion',
      'Clears mucus accumulations in the respiratory tract',
      'Natural anti-emetic for morning sickness and travel nausea'
    ],
    therapeuticUses: [
      'Agnimandya (Loss of digestive fire)',
      'Adhmana (Abdominal gas & fullness)',
      'Pratishyaya (Sinus congestion & rhinitis)',
      'Amavata (Rheumatoid inflammatory aches)'
    ],
    recommendedDosage: {
      churna: '1 to 2 grams dry Shunthi powder',
      decoction: '15 to 30 ml freshly simmered ginger infusion'
    },
    safetyAndContraindications: [
      'Moderate usage in people with active peptic ulcers or acute bleeding disorders',
      'High fresh ginger consumption on an empty stomach may cause mild heartburn in hyper-Pitta types'
    ],
    featuredRemediesIds: ['rem_ginger_lemon_digestive', 'rem_kashayam_cough'],
    associatedDiseasesIds: ['dis_acidity', 'dis_ibs', 'dis_cough_cold']
  },
  {
    id: 'ing_ashwagandha',
    slug: 'ashwagandha-indian-ginseng',
    commonName: 'Ashwagandha',
    botanicalName: 'Withania somnifera',
    sanskritName: 'Ashwagandha',
    hindiName: 'Asgandh',
    category: 'Root / Rhizome',
    shortDescription: 'A revered Rasayana (rejuvenator) that builds Ojas, stabilizes nervous exhaustion, regulates cortisol, and enhances deep restorative sleep.',
    fullDescription: 'Ashwagandha literally translates to "the smell of a horse," denoting the endurance and vigor it imparts. Unlike central nervous system stimulants, Ashwagandha is an adaptogen that grounds erratic Vata, calms an overactive nervous system, and replenishes depleted reproductive and bone marrow tissues (Shukra and Majja Dhatus).',
    featuredImage: 'https://images.pexels.com/photos/6978215/pexels-photo-6978215.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ayurvedicProperties: {
      rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
      guna: ['Snigdha (Unctuous)', 'Guru (Heavy)'],
      virya: 'Ushna (Heating)',
      vipaka: 'Madhura (Sweet)',
      doshaEffect: 'Deeply balances Vata and Kapha; use caution or cool milk vehicle for high Pitta.'
    },
    keyBenefits: [
      'Supports healthy stress response & hypothalamic-pituitary-adrenal balance',
      'Promotes uninterrupted, restorative deep sleep cycles',
      'Strengthens muscle tone and rejuvenates physical endurance',
      'Nourishes the brain and mental stability under cognitive strain'
    ],
    therapeuticUses: [
      'Klaibya & Daurbalya (General fatigue & debility)',
      'Anidra (Chronic insomnia & disturbed sleep)',
      'Chinta / Chittodwega (Anxiety and restlessness)',
      'Vata Vyadhi (Degenerative neuromuscular complaints)'
    ],
    recommendedDosage: {
      churna: '3 to 5 grams with warm cow milk and pinch of nutmeg at bedtime',
      decoction: '40 ml standardized root decoction'
    },
    safetyAndContraindications: [
      'Avoid during active pregnancy unless under direct physician supervision',
      'Not indicated in high Ama (toxic metabolic accumulation with coated tongue)',
      'Consult physician if taking thyroid hormone medications'
    ],
    featuredRemediesIds: ['rem_moon_milk_insomnia', 'rem_vata_oil_joints'],
    associatedDiseasesIds: ['dis_insomnia', 'dis_joint_pain']
  },
  {
    id: 'ing_tulsi',
    slug: 'tulsi-holy-basil',
    commonName: 'Holy Basil / Tulsi',
    botanicalName: 'Ocimum sanctum',
    sanskritName: 'Tulasi / Surasa',
    hindiName: 'Tulsi',
    category: 'Leaf / Herb',
    shortDescription: 'The Queen of Herbs, worshipped for its spiritual purity, respiratory cleansing, cardioprotective properties, and immune protection.',
    fullDescription: 'Considered sacred throughout the Indian subcontinent, Tulsi is unmatched in treating Pratishyaya (colds), Kasa (cough), and mild fevers. Its volatile essential oils (eugenol, caryophyllene) open the chest channels (Pranavaha Srotas), soothe bronchospasms, and provide remarkable clarity of mind.',
    featuredImage: 'https://images.pexels.com/photos/4871219/pexels-photo-4871219.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ayurvedicProperties: {
      rasa: ['Katu (Pungent)', 'Tikta (Bitter)'],
      guna: ['Laghu (Light)', 'Ruksha (Dry)'],
      virya: 'Ushna (Heating)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Balances Vata and Kapha; increases Pitta only if overused in hot seasons.'
    },
    keyBenefits: [
      'Liquefies sticky Kapha phlegm and eases natural expectoration',
      'Adaptogenic relief against ambient and emotional stress',
      'Supports cardiovascular wellness and optimal microcirculation',
      'Strong antimicrobial protection for throat and oral cavity'
    ],
    therapeuticUses: [
      'Jwara (Fevers and temperature spikes)',
      'Shwasa (Bronchial congestion & asthma relief support)',
      'Hridroga support (Heart tonic and lipid balance)'
    ],
    recommendedDosage: {
      churna: '2 to 3 grams dry leaf powder or 5 to 10 fresh crushed leaves',
      decoction: 'Fresh warm herbal infusion with crushed black pepper'
    },
    safetyAndContraindications: [
      'Safe for regular use; excessively large quantities are spermatogenesis-mildly inhibiting in classical texts if taken over months without breaks',
      'Pairs best with soothing honey once decoction cools down'
    ],
    featuredRemediesIds: ['rem_kashayam_cough'],
    associatedDiseasesIds: ['dis_cough_cold']
  },
  {
    id: 'ing_amla',
    slug: 'amla-indian-gooseberry',
    commonName: 'Indian Gooseberry / Amla',
    botanicalName: 'Phyllanthus emblica',
    sanskritName: 'Amalaki',
    hindiName: 'Amla',
    category: 'Fruit / Berry',
    shortDescription: 'One of the richest natural sources of heat-stable Vitamin C, Amalaki pacifies all three Doshas and is the primary base of Chyawanprash.',
    fullDescription: 'Amalaki contains five of the six tastes (all except salty), a rare attribute in botanical medicine. It cools systemic Pitta heat, strengthens digestive Agni without causing acid, fortifies hair follicles, and serves as a premier rasayana for longevity.',
    featuredImage: 'https://images.pexels.com/photos/20689437/pexels-photo-20689437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ayurvedicProperties: {
      rasa: ['Amla (Sour)', 'Madhura (Sweet)', 'Tikta (Bitter)', 'Katu (Pungent)', 'Kashaya (Astringent)'],
      guna: ['Guru (Heavy)', 'Ruksha (Dry)', 'Sheeta (Cooling)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Madhura (Sweet post-digestive outcome)',
      doshaEffect: 'Tridoshic; especially potent for pacifying aggravated Pitta.'
    },
    keyBenefits: [
      'Promotes radiant skin, tightens pores, and nourishes hair roots',
      'Gently balances stomach acidity while aiding nutrient absorption',
      'Potent antioxidant protection for eyes, liver, and cardiac muscles',
      'Supports natural collagen synthesis and anti-aging cell vitality'
    ],
    therapeuticUses: [
      'Amlapitta (Hyperacidity & acid reflux)',
      'Khalitya & Palitya (Premature hair fall and graying)',
      'Chakshushya (Eye strain and vision health)'
    ],
    recommendedDosage: {
      churna: '3 to 6 grams powder in morning with water',
      decoction: 'Fresh cold-pressed juice 15 to 20 ml diluted in water'
    },
    safetyAndContraindications: [
      'Extremely safe across all age groups; consume with warm water if individual has an active dry cough at night due to sour cooling quality'
    ],
    featuredRemediesIds: ['rem_amla_aloe_reflux', 'rem_triphala_digestive'],
    associatedDiseasesIds: ['dis_acidity', 'dis_ibs']
  },
  {
    id: 'ing_cinnamon',
    slug: 'cinnamon-twak',
    commonName: 'Ceylon Cinnamon',
    botanicalName: 'Cinnamomum verum',
    sanskritName: 'Twak',
    hindiName: 'Dalchini',
    category: 'Bark / Wood',
    shortDescription: 'A fragrant circulatory stimulant that regulates glycemic index, clears digestive stagnation, and dispels cold from peripheral extremities.',
    fullDescription: 'Twak warms the core digestive furnace, clears Kapha deposits in the vascular tree, and assists in carbohydrate metabolism. Ayurveda favors true Ceylon cinnamon (Twak) over Cassia due to its lower coumarin profile and sweeter, lighter medicinal essence.',
    featuredImage: 'https://images.pexels.com/photos/34086126/pexels-photo-34086126.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ayurvedicProperties: {
      rasa: ['Katu (Pungent)', 'Tikta (Bitter)', 'Madhura (Sweet)'],
      guna: ['Laghu (Light)', 'Ruksha (Dry)', 'Teekshna (Penetrating)'],
      virya: 'Ushna (Heating)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Subdues Vata and Kapha; use moderate quantities in high Pitta.'
    },
    keyBenefits: [
      'Helps maintain healthy insulin sensitivity and blood glucose balance',
      'Promotes circulatory warmth in hands and feet during cold seasons',
      'Eliminates intestinal spasms, flatulence, and sluggish bowel transit'
    ],
    therapeuticUses: [
      'Prameha (Metabolic conditions)',
      'Agnimandya (Weak digestion & slow metabolism)',
      'Pratishyaya (Colds and chills)'
    ],
    recommendedDosage: {
      churna: '1 to 2 grams finely powdered Ceylon bark',
      decoction: 'Infused stick in boiling water for 8 minutes'
    },
    safetyAndContraindications: [
      'Avoid high doses during early pregnancy; prefer authentic Ceylon cinnamon over cheap Cassia bark'
    ],
    featuredRemediesIds: ['rem_cinnamon_metabolic_tea'],
    associatedDiseasesIds: ['dis_acidity']
  }
];

export const REMEDIES: Remedy[] = [
  {
    id: 'rem_golden_milk',
    slug: 'haldi-doodh-golden-turmeric-elixir',
    name: 'Classical Haldi Doodh (Golden Milk Elixir)',
    hindiName: 'हल्दी दूध',
    purpose: 'Anti-inflammatory restorative night tonic for joint aches, tissue repair, and deep rejuvenating sleep.',
    targetCondition: 'Joint stiffness, inflammation, physical exhaustion, and seasonal throat vulnerability.',
    diseaseId: 'dis_joint_pain',
    primaryDoshaBalancing: 'Vata',
    difficulty: 'Very Easy',
    prepTime: '7 minutes',
    featuredImage: 'https://images.pexels.com/photos/30688214/pexels-photo-30688214.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ingredients: [
      { name: 'Pure Turmeric Powder (Haridra Churna)', ingredientId: 'ing_turmeric', quantity: '½ teaspoon (approx. 2g)', notes: 'Prefer organic high-curcumin variety' },
      { name: 'Whole Cow Milk or Almond Milk', quantity: '200 ml', notes: 'Warm A2 milk is classical' },
      { name: 'Freshly Crushed Black Pepper (Maricha)', quantity: '1 tiny pinch', notes: 'Piperine increases turmeric absorption by 2000%' },
      { name: 'A2 Cow Ghee (Ghrita)', quantity: '¼ teaspoon', notes: 'Lipophilic carrier that lubricates joints and channels' },
      { name: 'Raw Honey or Crushed Mishri (Rock Candy)', quantity: '1 teaspoon', notes: 'Add ONLY when milk cools to drinking warm, never boil honey' }
    ],
    preparation: [
      'Pour milk into a small heavy-bottomed brass or steel vessel over medium-low heat.',
      'Whisk in turmeric powder, freshly ground black pepper, and A2 cow ghee thoroughly.',
      'Allow the mixture to simmer gently for 4 to 5 minutes so the fat-soluble curcumin binds with milk lipids.',
      'Remove from flame. Allow the temperature to cool to lukewarm drinking temperature.',
      'Stir in raw honey or mishri and sip immediately while comfortably warm.'
    ],
    howToUse: {
      dosage: '1 small cup (150–200 ml)',
      timing: '30 to 45 minutes before bedtime',
      frequency: 'Once every night',
      anupana: 'Warm cow milk or almond milk',
      duration: '4 to 6 weeks during seasonal changes or flare-ups'
    },
    precautions: [
      'Never boil honey directly; Ayurveda warns that heating honey above 40°C creates Ama (toxic metabolic residue).',
      'If suffering from lactose sensitivity, substitute with fresh almond milk or oat milk with 2 drops sesame oil.'
    ],
    whoShouldAvoid: [
      'Individuals with active acute gallstones without physician guidance.',
      'Patients experiencing acute productive cough with heavy white Kapha mucus (dairy may thicken phlegm temporarily).'
    ],
    traditionalContext: 'Mentioned in ancient texts as a "Rasayana Yoga" given to wrestlers and elders alike to repair microscopic muscular tears, nourish the bone marrow (Majja), and bestow peaceful sleep.',
    verifiedBy: AUTHORS.dr_sharma,
    tags: ['Joint Health', 'Sleep', 'Immunity', 'Anti-Inflammatory', 'Night Ritual'],
    featured: true
  },
  {
    id: 'rem_ginger_lemon_digestive',
    slug: 'ardraka-deepana-ginger-lemon-relish',
    name: 'Ardraka Deepana (Ginger-Rock Salt Agni Relish)',
    hindiName: 'अदरक नीम्बू दीपन योग',
    purpose: 'Awakens weak digestive fire (Mandagni), clears heavy stomach sensation, and prevents gas before meals.',
    targetCondition: 'Sluggish digestion, lack of appetite, post-meal bloating, and heavy feeling.',
    diseaseId: 'dis_acidity',
    primaryDoshaBalancing: 'Kapha',
    difficulty: 'Very Easy',
    prepTime: '3 minutes',
    featuredImage: 'https://images.pexels.com/photos/8704811/pexels-photo-8704811.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ingredients: [
      { name: 'Fresh Ginger Root (Ardraka)', ingredientId: 'ing_ginger', quantity: '1 thin 1-inch slice, julienned', notes: 'Washed and scraped' },
      { name: 'Fresh Lime or Lemon Juice', quantity: '4 to 5 drops', notes: 'Pitta-pacifying sour citrus' },
      { name: 'Saindhava Lavana (Himalayan Pink Rock Salt)', quantity: '1 small pinch', notes: 'Mineral rock salt that cools and kindles Agni' }
    ],
    preparation: [
      'Take 2 to 3 thin julienned slices of freshly washed young ginger.',
      'Squeeze 4-5 drops of fresh lime juice directly over the slices.',
      'Sprinkle a tiny pinch of Saindhava Lavana over the ginger and roll gently.'
    ],
    howToUse: {
      dosage: '1 to 2 slivers chewed thoroughly',
      timing: '10 to 15 minutes before lunch and dinner',
      frequency: 'Twice daily before main meals',
      anupana: 'Sipped saliva followed by small sip of lukewarm water if required',
      duration: 'Ongoing digestive hygiene for 2 to 3 weeks'
    },
    precautions: [
      'Do not substitute rock salt with refined iodized table salt, which produces Pitta burning.',
      'Chew slowly to stimulate salivary enzymes in the mouth.'
    ],
    whoShouldAvoid: [
      'People with bleeding hemorrhoids, active gastric bleeding, or acute hyper-Pitta burning sensation in esophagus.'
    ],
    traditionalContext: 'Charaka Samhita states: "Bhojanagre sada pathyam lavanardraka bhakshanam" — Eating ginger with salt before meals is always wholesome as it cleanses the tongue and throat while awakening Agni.',
    verifiedBy: AUTHORS.dr_priya,
    tags: ['Digestion', 'Agni Booster', 'Bloating', 'Appetite', 'Pre-meal'],
    featured: true
  },
  {
    id: 'rem_kashayam_cough',
    slug: 'tulsi-maricha-soothing-kashayam',
    name: 'Tulsi-Sunthi Pranavaha Kashayam',
    hindiName: 'तुलसी सोंठ काढ़ा',
    purpose: 'Clears chest phlegm, soothes scratching throat cough, and provides natural antimicrobial warmth.',
    targetCondition: 'Seasonal cough, running nose, chest congestion, and chills.',
    diseaseId: 'dis_cough_cold',
    primaryDoshaBalancing: 'Kapha',
    difficulty: 'Easy',
    prepTime: '10 minutes',
    featuredImage: 'https://images.pexels.com/photos/4871219/pexels-photo-4871219.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ingredients: [
      { name: 'Fresh Tulsi Leaves (Holy Basil)', ingredientId: 'ing_tulsi', quantity: '7 to 8 leaves', notes: 'Torn by hand to release volatile oils' },
      { name: 'Dry Ginger Powder (Shunthi)', ingredientId: 'ing_ginger', quantity: '½ teaspoon', notes: 'Expectorant and warming' },
      { name: 'Crushed Whole Black Pepper (Maricha)', quantity: '3 corns', notes: 'Clears sinus pathways' },
      { name: 'Green Cardamom (Elaichi)', quantity: '1 pod, bruised', notes: 'Soothes throat spasm' },
      { name: 'Water', quantity: '350 ml', notes: 'To be reduced to half' },
      { name: 'Pure Raw Forest Honey', quantity: '1 teaspoon', notes: 'Yogavahi vehicle to be added warm' }
    ],
    preparation: [
      'Crush black pepper, bruised cardamom, and dry ginger powder together.',
      'In a saucepan, bring 350 ml of fresh water to a rolling boil.',
      'Add crushed herbs along with hand-torn fresh Tulsi leaves.',
      'Lower flame and reduce the liquid until approximately 150 ml remains (about 7 to 8 minutes).',
      'Strain through a fine sieve into a mug, let cool until warmly touchable, and stir in honey.'
    ],
    howToUse: {
      dosage: 'Half cup (approx. 100–120 ml)',
      timing: 'Mid-morning and evening around sunset',
      frequency: '2 times daily',
      anupana: 'Warm decoction with raw honey',
      duration: '3 to 5 days until chest congestion subsides'
    },
    precautions: [
      'Do not boil honey directly with water on the burner.',
      'Cover saucepan with a lid during simmering to trap volatile Tulsi oils.'
    ],
    whoShouldAvoid: [
      'Infants under 1 year of age (due to honey and potent spices).',
      'Individuals with severe dry Pitta cough with blood-tinged sputum should consult a Vaidya for cooling formulations (e.g., Vasa or Yashtimadhu).'
    ],
    traditionalContext: 'A household staple across Indian villages for millennia, this classic decoction mobilizes stagnant Kapha without disturbing the lungs delicate mucosal lining.',
    verifiedBy: AUTHORS.dr_menon,
    tags: ['Respiratory', 'Cough', 'Cold', 'Kashayam', 'Immunity'],
    featured: true
  },
  {
    id: 'rem_amla_aloe_reflux',
    slug: 'amla-aloe-sheetali-drink',
    name: 'Amalaki & Ghritkumari Cooling Reflux Quencher',
    hindiName: 'आंवला एलोवेरा शीतली योग',
    purpose: 'Rapidly extinguishes excess Pitta heat in the stomach, soothes acid reflux, and heals esophageal lining.',
    targetCondition: 'Sour belching, burning in chest (heartburn), gastritis, and morning nausea.',
    diseaseId: 'dis_acidity',
    primaryDoshaBalancing: 'Pitta',
    difficulty: 'Very Easy',
    prepTime: '4 minutes',
    featuredImage: 'https://images.pexels.com/photos/20689437/pexels-photo-20689437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ingredients: [
      { name: 'Pure Cold-Pressed Amla Juice', ingredientId: 'ing_amla', quantity: '15 ml', notes: 'Unsweetened' },
      { name: 'Pure Aloe Vera Inner Leaf Gel (Ghritkumari)', quantity: '15 ml', notes: 'Alloin-free pulp' },
      { name: 'Fennel Seed (Saunf) Infusion Water', quantity: '100 ml', notes: 'Fennel seeds soaked overnight in water' },
      { name: 'Dhaga Mishri (Raw Crystallized Rock Sugar)', quantity: '½ teaspoon (optional)', notes: 'Natural cooling sweetener' }
    ],
    preparation: [
      'Soak 1 teaspoon fennel seeds in 100 ml water overnight or for at least 2 hours, then strain.',
      'Combine pure Amla juice and fresh inner-leaf Aloe Vera juice into the fennel infusion.',
      'Stir in powdered dhaga mishri if soothing extra cooling is desired.'
    ],
    howToUse: {
      dosage: '120 ml at room temperature',
      timing: 'First thing in the morning on an empty stomach',
      frequency: 'Once daily for 21 days',
      anupana: 'Fennel infused water',
      duration: '3 weeks continuous cycle'
    },
    precautions: [
      'Drink at gentle room temperature, never ice cold. Extreme cold shocks digestive Agni.',
      'Ensure Aloe Vera gel is free of latex (yellow sap).'
    ],
    whoShouldAvoid: [
      'Individuals with active watery diarrhea or acute Kapha cold with runny nose.'
    ],
    traditionalContext: 'Charaka prescribes Amalaki as the supreme Pitta-shamaka drug because its sour taste cools without burning, neutralizing excessive digestive acids at the cellular lining.',
    verifiedBy: AUTHORS.dr_sharma,
    tags: ['Acidity', 'Pitta Pacifying', 'GERD', 'Gut Health', 'Cooling'],
    featured: true
  },
  {
    id: 'rem_moon_milk_insomnia',
    slug: 'ashwagandha-jaiphal-moon-milk',
    name: 'Ashwagandha & Jaiphal Restorative Moon Milk',
    hindiName: 'अश्वगंधा जायफल निद्रा दुग्ध',
    purpose: 'Sedates hyperactive Vata thoughts, calms nervous tension, and naturally prepares the brain for sound sleep.',
    targetCondition: 'Difficulty falling asleep, midnight waking, racing mental chatter, and restless leg sensations.',
    diseaseId: 'dis_insomnia',
    primaryDoshaBalancing: 'Vata',
    difficulty: 'Very Easy',
    prepTime: '6 minutes',
    featuredImage: 'https://images.pexels.com/photos/6978215/pexels-photo-6978215.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ingredients: [
      { name: 'Ashwagandha Churna Root Powder', ingredientId: 'ing_ashwagandha', quantity: '1 level teaspoon (3g)', notes: 'Somatic nervous calmant' },
      { name: 'Freshly Grated Nutmeg (Jaiphal)', quantity: '1 very small pinch (approx 100mg)', notes: 'Natural botanical sedative in Ayurveda' },
      { name: 'Warm Whole Milk or Oat Milk', quantity: '180 ml', notes: 'Rich in natural tryptophan' },
      { name: 'Cow Ghee (Ghrita)', quantity: '½ teaspoon', notes: 'Grounding Vata lubrication' }
    ],
    preparation: [
      'Warm milk with ½ teaspoon of cow ghee in a saucepan.',
      'Stir in Ashwagandha powder thoroughly using a small whisk to prevent clumping.',
      'Simmer on gentle heat for 3 minutes.',
      'Turn off flame, grate fresh nutmeg on top, and allow to sit for 1 minute before pouring.'
    ],
    howToUse: {
      dosage: '1 warm cup (150 ml)',
      timing: '45 minutes prior to turning off lights',
      frequency: 'Every night',
      anupana: 'Warm milk vehicle',
      duration: '21 to 30 days for resetting circadian rhythms'
    },
    precautions: [
      'Keep nutmeg strictly to a pinch; excessive nutmeg can produce daytime lethargy.',
      'Turn off smartphones and blue screens immediately after sipping.'
    ],
    whoShouldAvoid: [
      'Pregnant women should avoid medicinal doses of nutmeg and Ashwagandha without physician advice.'
    ],
    traditionalContext: 'Bhavaprakasha Nighantu highlights Jaiphal as "Mada-kari" (natural hypnotic relaxant) that stabilizes the Manovaha Srotas (mental channels).',
    verifiedBy: AUTHORS.dr_priya,
    tags: ['Insomnia', 'Anxiety', 'Sleep', 'Nervous System', 'Vata Pacifying']
  },
  {
    id: 'rem_vata_oil_joints',
    slug: 'nirgundi-til-taila-warm-joint-compress',
    name: 'Warm Nirgundi-Sesame Joint Soothing Compress',
    hindiName: 'निर्गुण्डी तिल तैल धारा',
    purpose: 'Deep penetration of warming herbal oil into stiff joints, reducing cracking sounds (crepitus) and dull ache.',
    targetCondition: 'Knee stiffness, lower back tension, neck stiffness, and weather-triggered joint soreness.',
    diseaseId: 'dis_joint_pain',
    primaryDoshaBalancing: 'Vata',
    difficulty: 'Moderate',
    prepTime: '12 minutes',
    featuredImage: 'https://images.pexels.com/photos/11921158/pexels-photo-11921158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ingredients: [
      { name: 'Cold-Pressed Sesame Oil (Tila Taila)', quantity: '4 tablespoons', notes: 'The ultimate Vata penetrative base oil' },
      { name: 'Ashwagandha Powder or Nirgundi Leaf paste', ingredientId: 'ing_ashwagandha', quantity: '1 teaspoon', notes: 'Vata-hara anti-inflammatory' },
      { name: 'Camphor (Bhimseni Kapoor)', quantity: '1 small rice-grain size', notes: 'Enhances cutaneous microcirculation' }
    ],
    preparation: [
      'Warm sesame oil gently using a double boiler method (placing glass bowl over hot water).',
      'Mix in herbal powder or extract and drop the camphor to dissolve.',
      'Ensure the temperature is comfortably warm (test on inner wrist) before application.'
    ],
    howToUse: {
      dosage: '2 to 3 tablespoons applied with gentle circular massage',
      timing: 'Morning after warm shower or before bedtime',
      frequency: 'Once or twice daily',
      anupana: 'External topical application followed by warm dry cloth compress',
      duration: '4 weeks continuous application'
    },
    precautions: [
      'Do not apply on open cuts, bruised skin, or inflamed red septic joints.',
      'Keep joint sheltered from direct cold air conditioners right after application.'
    ],
    whoShouldAvoid: [
      'Persons with acute rheumatoid flare-up characterized by hot, swollen, throbbing red joints (Amavata acute stage requires dry heat, not heavy oils).'
    ],
    traditionalContext: 'Abhyanga and local Snehana are considered half of all Vata disease therapies in classical Sushruta Samhita.',
    verifiedBy: AUTHORS.dr_sharma,
    tags: ['Joint Pain', 'Arthritis', 'Abhyanga', 'Vata Care']
  }
];

export const DISEASES: Disease[] = [
  {
    id: 'dis_acidity',
    slug: 'amlapitta-hyperacidity-acid-reflux',
    name: 'Acid Reflux & Hyperacidity (Amlapitta)',
    sanskritName: 'Amlapitta (अम्लपित्त)',
    category: 'Digestive',
    summary: 'A pervasive digestive disorder marked by an imbalance in Pachaka Pitta and Agni, leading to acid regurgitation, epigastric burning, nausea, and indigestion.',
    primaryDosha: 'Pitta',
    updatedAt: 'February 2026',
    reviewedBy: AUTHORS.dr_sharma,
    readingTime: '6 min read',
    overview: 'Amlapitta is one of the most prevalent gastrointestinal disorders in contemporary life, closely mirroring gastroesophageal reflux disease (GERD) and functional dyspepsia. In Ayurveda, it arises when Pitta dosha becomes excessively heated, sour (Amla), and sharp (Teekshna), overwhelming the protective mucosal secretions of the stomach and duodenum. Rather than merely suppressing acid with synthetic blockers, Ayurvedic treatment focuses on cooling the inflamed mucous membrane, correcting the impaired digestive rhythm (Agni), and halting the fermentation of undigested toxic waste (Ama).',
    ayurvedicPerspective: {
      nidana: [
        'Excessive consumption of sour, fermented, excessively spicy, or deeply fried foods',
        'Irregular meal times, eating late at night, and skipping breakfast',
        'Chronic psychological distress, suppressed rage, deadline anxiety, and mental strain',
        'Excessive intake of coffee, alcohol, smoking, and NSAID painkillers'
      ],
      samprapti: 'Ingestion of Pitta-aggravating foods impairs Jatharagni (the main digestive fire). The partially digested food ferments into Ama and turns sour (Amlibhuta), further vitiating the liquid quality (Drava Guna) and sourness of Pitta. This vitiated fluid shoots upward into the esophagus (Urdhvaga Amlapitta) or downwards into the intestines (Adhoga Amlapitta).',
      doshaImbalance: 'Predominantly Pitta vitiation accompanied by mild Kapha or Vata obstruction (Pitta-Kapha or Vata-Pitta).',
      dhatusAffected: ['Rasa Dhatu (Plasma/Nutrient fluid)', 'Mamsa Dhatu (Esophageal lining)', 'Annavaha Srotas (Digestive tract)']
    },
    symptoms: {
      classical: [
        'Tikta-Amla Udgara (Bitter and sour eructations / belching)',
        'Hrid-Kantha Daha (Burning sensation in chest and throat)',
        'Aruchi (Loss of natural taste and appetite)',
        'Utklesha (Nausea, queasiness, especially in the morning)',
        'Gaurava (Heaviness in the epigastrium)'
      ],
      modern: [
        'Substernal chest burning after eating or while lying down',
        'Regurgitation of acid or sour fluid into the mouth',
        'Persistent throat irritation, dry chronic cough, or morning hoarseness',
        'Bloating, stomach fullness, and difficulty sleeping flat'
      ],
      warningSigns: [
        'Difficulty or sharp pain when swallowing (dysphagia)',
        'Vomiting blood or coffee-ground material',
        'Black tarry stools (melena)',
        'Unexplained rapid weight loss with chronic indigestion'
      ]
    },
    causes: [
      'Late-night dinners followed immediately by sleeping flat on the back',
      'Frequent consumption of vinegar, carbonated drinks, green chili, and heavy sauces',
      'Overeating before previous meals are fully digested (Adhyashana)',
      'High-stress corporate work hours triggering cortisol and acid surges',
      'Excessive intake of citrus on an empty stomach'
    ],
    dietAndLifestyle: {
      pathya: [
        'Old basmati rice, barley (Yava), mung bean soup, and split green gram',
        'Fresh sweet pomegranate, ripe bananas, sweet grapes, and soaked raisins',
        'Cow milk with pinch of cardamom (taken warm, not chilled)',
        'Fennel seeds (Saunf), coriander seed infusion, and coconut water',
        'Small, freshly cooked warm meals eaten in a relaxed, peaceful environment'
      ],
      apathya: [
        'Fermented batters (day-old Idli/Dosa batter), bread yeast, and aged cheese',
        'Deep fried street food, stale reheated meals, and industrial seed oils',
        'Raw garlic and raw red onions in excess',
        'Vinegar, pickles, synthetic ketchup, and hot red chilies',
        'Lying down horizontally within 2.5 hours of eating'
      ],
      lifestyleTips: [
        'Elevate the head of your bed by 6 inches or sleep comfortably on your left side (Vamkukshi posture to keep gastric valve elevated).',
        'Leave one-third of the stomach empty at every meal according to Charaka guideline: 2 parts food, 1 part liquid, 1 part space for Doshas.',
        'Drink water 45 minutes after meals rather than chugging icy water while chewing food.'
      ],
      yogaPranayama: [
        'Sheetali & Sheetkari Pranayama (Cooling breathwork to dispel Pitta fire)',
        'Vajrasana (Thunderbolt pose) for 10 minutes immediately after lunch and dinner',
        'Chandra Bhedana Pranayama (Left nostril breathing for parasympathetic calm)'
      ]
    },
    precautions: [
      'Do not rely solely on antacids for months without addressing underlying food timings.',
      'Refrain from aggressive fasting or water starvation, which concentrates caustic hydrochloric acid in an empty stomach.'
    ],
    homeRemediesIds: ['rem_amla_aloe_reflux', 'rem_ginger_lemon_digestive'],
    keyIngredientsIds: ['ing_amla', 'ing_ginger', 'ing_turmeric'],
    faqs: [
      {
        question: 'Can ginger help acidity, or will its pungent heat worsen it?',
        answer: 'Fresh ginger in small slivers with rock salt kindles Agni without aggravating Pitta if taken before meals. However, excessive dry ginger in high Pitta individuals with burning ulcers may be too hot. For acute burning, cooling remedies like Amla, Aloe Vera, and cold-pressed fennel tea are preferred.'
      },
      {
        question: 'Why does Ayurveda recommend sleeping on the left side?',
        answer: 'Known as "Vamkukshi", sleeping on the left side aligns with the anatomical curvature of the stomach, keeping the lower esophageal sphincter above gastric liquid levels, naturally preventing acid regurgitation.'
      },
      {
        question: 'Is milk good for acid reflux?',
        answer: 'Warm cow milk boiled with crushed cardamom or licorice acts as a mild mucosal buffer. However, cold commercial high-fat dairy can trigger a rebound acid surge. It should be taken lukewarm in small sips.'
      }
    ],
    references: [
      { title: 'Charaka Samhita, Chikitsa Sthana, Chapter 15: Grahani Dosha Chikitsa', source: 'Chaukhambha Orientalia', year: 'Classical Text' },
      { title: 'Clinical Evaluation of Amalaki & Yashtimadhu in Amlapitta Management', source: 'Journal of Ayurveda and Integrative Medicine', year: '2021' },
      { title: 'Pathophysiological Correlates of GERD and Urdhvaga Amlapitta', source: 'Ayu Journal (IPGTRA)', year: '2019' }
    ],
    featured: true
  },
  {
    id: 'dis_joint_pain',
    slug: 'sandhivata-osteoarthritis-joint-stiffness',
    name: 'Joint Stiffness & Pain (Sandhivata)',
    sanskritName: 'Sandhivata (संधिवाश)',
    category: 'Musculoskeletal',
    summary: 'A chronic degenerating Vata disorder causing loss of synovial fluid (Shleshaka Kapha), articular cartilage depletion, morning stiffness, and movement pain.',
    primaryDosha: 'Vata',
    updatedAt: 'January 2026',
    reviewedBy: AUTHORS.dr_sharma,
    readingTime: '8 min read',
    overview: 'Sandhivata is the classical Ayurvedic counterpart to degenerative joint disease and osteoarthritis. In this condition, aggravated Vata dosha—characterized by coldness (Sheeta), dryness (Ruksha), and mobility (Chala)—infiltrates the spaces between bones (Sandhi). It dries out the natural protective lubrication known as Shleshaka Kapha, leading to painful joint movement, friction, cracking sounds (Atopa), and progressive immobility. Ayurveda seeks not merely pain relief, but deep tissue re-lubrication (Snehana), gentle detoxification, and nourishment of Asthi and Majja Dhatus (bone and bone marrow tissues).',
    ayurvedicPerspective: {
      nidana: [
        'Excessive dry, cold, light foods without healthy unctuous fats (Ghrita/Taila)',
        'Aging (Vardhakya), which naturally marks the Vata-predominant stage of human life',
        'Repetitive trauma, excessive heavy physical exertion, or prolonged sedentary immobilization',
        'Irregular sleeping cycles, staying awake late into the night (Ratri Jagarana)'
      ],
      samprapti: 'Aggravated Vata settles in the empty spaces (Khavaigunya) of weight-bearing joints (knees, hips, lumbar spine). It depletes the Shleshaka Kapha, leading to cartilage wear, subchondral bone friction, swelling, and severe restriction of flexion and extension.',
      doshaImbalance: 'Severe Vata vitiation, often accompanied by localized Kapha stagnation or Ama blockage.',
      dhatusAffected: ['Asthi Dhatu (Bone tissue)', 'Majja Dhatu (Bone marrow & nervous tissues)', 'Sandhi Snayu (Ligaments and tendons)']
    },
    symptoms: {
      classical: [
        'Sandhishoola (Joint pain aggravated on initial movement or cold weather)',
        'Sandhishopha (Localized swelling feeling like an air-filled bladder)',
        'Atopa (Cracking and popping sounds / crepitus upon bending knees)',
        'Prasarana Akunchana Pravritti Vedana (Intense pain on extension and flexion)',
        'Stambha (Morning stiffness that eases slowly after 30 minutes of gentle movement)'
      ],
      modern: [
        'Persistent dull or aching pain in weight-bearing joints (especially knees and lower back)',
        'Stiffness following periods of rest or prolonged sitting',
        'Loss of joint flexibility and reduced walking stride',
        'Bony spurs and tenderness along joint margins'
      ],
      warningSigns: [
        'Sudden, hot, red, intensely throbbing joint with fever (signs of acute septic arthritis or gout)',
        'Inability to bear any weight on the leg after minimal strain',
        'Severe joint deformity or sudden limb numbness'
      ]
    },
    causes: [
      'Excessive dry snacks, stale packaged foods, and crash diets devoid of healthy natural lipids',
      'Cold, damp climates and prolonged exposure to air drafts',
      'Post-menopausal hormonal transitions affecting bone mineral density',
      'Untreated chronic constipation, which allows Vata gas to recirculate into peripheral channels'
    ],
    dietAndLifestyle: {
      pathya: [
        'Warm, unctuous, freshly prepared broths with a teaspoon of pure A2 cow ghee',
        'Sesame seeds (Til), flaxseeds, soaked almonds, and walnuts',
        'Seasonal garlic, ginger, and turmeric in daily cooking to warm joints',
        'Warm milk infused with Ashwagandha and nutmeg at night',
        'Hot water sips throughout the day to kindle digestion and prevent Ama'
      ],
      apathya: [
        'Dry raw salads, refrigerated ice cream, and cold carbonated drinks',
        'Excessive consumption of dry legumes (Chickpeas, Rajma, White beans) without digestive spices like hing and ginger',
        'Nightshade vegetables in high quantities (Eggplant, excess bell peppers) during active inflammation',
        'Skipping meals and excessive fasting'
      ],
      lifestyleTips: [
        'Daily Abhyanga (warm sesame oil or Mahanarayan oil massage) before a warm bath.',
        'Keep joints covered and warm; avoid sitting directly in front of air conditioning vents.',
        'Gentle low-impact movement such as walking on soft ground or swimming in warm water.'
      ],
      yogaPranayama: [
        'Sukshma Vyayama (Gentle micro-joint movements for toes, ankles, and knees)',
        'Tadasana and gentle Vrikshasana for joint alignment',
        'Nadi Shodhana Pranayama (Alternate nostril breathing to calm erratic Vata)'
      ]
    },
    precautions: [
      'Avoid high-impact jumping or jogging on hard concrete when cartilage is depleted.',
      'Do not apply freezing ice packs continuously on chronic Vata joints; Ayurveda strongly favors warm fomentation (Swedana).'
    ],
    homeRemediesIds: ['rem_golden_milk', 'rem_vata_oil_joints'],
    keyIngredientsIds: ['ing_turmeric', 'ing_ashwagandha', 'ing_ginger'],
    faqs: [
      {
        question: 'Should I apply ice or heat for chronic knee pain?',
        answer: 'For chronic, dull, non-red joint aches (Sandhivata), Ayurveda strongly recommends warm oil massage (Snehana) followed by warm herbal compresses (Swedana). Ice packs are only used for sudden acute sports trauma with bright redness and heat.'
      },
      {
        question: 'Is ghee bad for cholesterol if I take it for my joints?',
        answer: '1 to 2 teaspoons of pure grass-fed A2 cow ghee per day lubricates internal connective tissues, transports fat-soluble vitamins, and supports bone density without causing dyslipidemia when paired with an active lifestyle and clean diet.'
      }
    ],
    references: [
      { title: 'Sushruta Samhita, Nidana Sthana: Vata Vyadhi Chikitsitam', source: 'Chaukhambha Publishers', year: 'Classical Text' },
      { title: 'Efficacy of Withania somnifera and Curcuma longa in Osteoarthritis Patients', source: 'Phytomedicine Journal', year: '2020' }
    ],
    featured: true
  },
  {
    id: 'dis_cough_cold',
    slug: 'kasa-pratishyaya-respiratory-congestion',
    name: 'Cough, Cold & Bronchial Congestion (Kasa & Pratishyaya)',
    sanskritName: 'Kasa & Pratishyaya (कास एवं प्रतिश्याय)',
    category: 'Respiratory',
    summary: 'A seasonal respiratory condition triggered by Kapha-Vata aggravation, leading to airway congestion, throat tickle, nasal discharge, and heaviness.',
    primaryDosha: 'Kapha',
    updatedAt: 'January 2026',
    reviewedBy: AUTHORS.dr_priya,
    readingTime: '5 min read',
    overview: 'In Ayurveda, common upper respiratory conditions are studied under Pratishyaya (rhinitis/sinusitis) and Kasa (cough). They frequently originate in the stomach (Amashaya) when impaired digestive fire generates damp, sticky Kapha that ascends into the chest and head cavities (Urdhvajatru). This obstructs the normal downward and outward flow of Prana Vayu, triggering involuntary coughing spasms to clear the respiratory tract. Treatment focuses on clearing bronchial phlegm, restoring Agni, and fortifying mucosal immunity with warming, drying herbs.',
    ayurvedicPerspective: {
      nidana: [
        'Sudden exposure to cold air, mist, dust, pollen, or damp rooms',
        'Consuming heavy, greasy, ice-cold foods, sugary desserts, and cold water',
        'Suppression of natural urges to sneeze or yawn',
        'Seasonal transitions (Ritu Sandhi), particularly during late autumn and spring'
      ],
      samprapti: 'Vitiated Kapha and Vata combine in the Pranavaha Srotas (respiratory pathways), producing thick mucus, narrowing the bronchial lumen, and stimulating the vagal cough receptors.',
      doshaImbalance: 'Kapha-Vata dominant with possible secondary Pitta inflammation if yellowish mucus or sore throat develops.',
      dhatusAffected: ['Rasa Dhatu (Lymphatic and mucous secretions)', 'Pranavaha Srotas (Lungs, trachea, bronchi)']
    },
    symptoms: {
      classical: [
        'Shira Gaurava (Heaviness in the head and sinuses)',
        'Kanthopalepha (Feeling of mucus coating the throat)',
        'Ghranaviplava (Watery or thick nasal discharge)',
        'Kasavega (Spasmodic bouts of hacking or wet cough)',
        'Aruchi & Mandagni (Blunted sense of taste and low appetite)'
      ],
      modern: [
        'Runny or stuffy nose with sinus facial pressure',
        'Scratchy, irritating throat tickle progressing to productive phlegm',
        'Mild low-grade chills and malaise',
        'Sneezing bouts and watery eyes'
      ],
      warningSigns: [
        'High unrelenting fever above 102°F or severe chills',
        'Shortness of breath or audible wheezing at rest',
        'Coughing up rust-colored or bloody mucus',
        'Symptoms persisting longer than 10 consecutive days without relief'
      ]
    },
    causes: [
      'Seasonal shifts without adjusting diet to warming spices',
      'Sleeping during daytime (Diva Swapna), which aggressively surges Kapha',
      'Drinking chilled refrigerated water straight from the fridge'
    ],
    dietAndLifestyle: {
      pathya: [
        'Light warm soups made of roasted split mung dal and pepper',
        'Sipping freshly boiled warm water infused with dry ginger or tulsi',
        'Pungent, bitter, and astringent spices: black pepper, ginger, cloves, cinnamon',
        'Raw honey (added ONLY to lukewarm water) to act as a natural mucus-cutter (Lekhana)'
      ],
      apathya: [
        'Chilled milk, thick yogurt, ice cream, and creamy dairy sweets',
        'Bananas, oranges, and watermelon eaten in the evening',
        'Deep fried foods, oily gravies, and heavy meats'
      ],
      lifestyleTips: [
        'Herbal steam inhalation (Bashpa Sweda) with 2 drops eucalyptus or crushed ajwain seeds twice daily.',
        'Keep neck and chest covered with warm cotton or wool scarves.',
        'Practice gentle gargling with warm water, rock salt, and turmeric twice daily.'
      ],
      yogaPranayama: [
        'Bhastrika Pranayama (Bellows breath for clearing lung Kapha)',
        'Kapalabhati (Frontal skull shining breath for sinus drainage)',
        'Surya Bhedana Pranayama (Right nostril warming breath)'
      ]
    },
    precautions: [
      'Do not abruptly suppress wet productive cough with heavy narcotics without allowing sputum expectoration.',
      'Ensure steam inhalation is not performed with boiling water too close to the face to prevent burns.'
    ],
    homeRemediesIds: ['rem_kashayam_cough', 'rem_golden_milk'],
    keyIngredientsIds: ['ing_tulsi', 'ing_ginger', 'ing_turmeric'],
    faqs: [
      {
        question: 'Why should honey never be cooked or added to boiling tea?',
        answer: 'Ayurveda explicitly warns that heating honey above 40°C alters its molecular lattice and creates toxic residues (Ama) that clog subtle bodily micro-channels. Always let your herbal tea cool until comfortably warm before stirring honey.'
      },
      {
        question: 'Can I eat yogurt when suffering from a cold?',
        answer: 'Yogurt is Abhishyandi (channel-blocking) and heavily Kapha-aggravating in Ayurvedic pathology, especially when consumed cold or at night. It should be strictly avoided during active congestion.'
      }
    ],
    references: [
      { title: 'Charaka Samhita, Chikitsa Sthana, Chapter 18: Kasa Chikitsa', source: 'Chaukhambha', year: 'Classical Text' },
      { title: 'Ocimum sanctum (Tulsi) in Respiratory Health and Viral Upper Tract Infections', source: 'Indian Journal of Pharmacology', year: '2021' }
    ],
    featured: true
  },
  {
    id: 'dis_insomnia',
    slug: 'anidra-sleep-deprivation-insomnia',
    name: 'Insomnia & Restless Sleep (Anidra)',
    sanskritName: 'Anidra / Nidranasha (अनिद्रा)',
    category: 'Mind & Stress',
    summary: 'A state of nervous system hypersensitivity where aggravated Vata and Pitta disrupt the grounding quality of Tarpaka Kapha, preventing restorative deep sleep.',
    primaryDosha: 'Vata',
    updatedAt: 'January 2026',
    reviewedBy: AUTHORS.dr_priya,
    readingTime: '6 min read',
    overview: 'Sleep (Nidra) is classified in Ayurveda alongside food (Ahara) and energy regulation (Brahmacharya) as one of the three foundational pillars of life (Trayopastambha). When Vata dosha becomes erratic through hyper-mental processing, screen stimulation, and nervous exhaustion, it dries out Tarpaka Kapha—the fluid cushion that calms brain channels. This produces fragmented sleep, racing thoughts at 2:00 AM, inability to fall asleep, and non-refreshing rest upon waking. Treatment centers on somatic grounding, warm oil therapies, and adaptogenic root tonics.',
    ayurvedicPerspective: {
      nidana: [
        'Prolonged mental strain, emotional worry, grief, and unceasing screen exposure late at night',
        'Excessive fasting, irregular meal times, or skipping evening nourishment',
        'Overconsumption of caffeinated beverages, energy drinks, and stimulant drugs',
        'Suppression of fatigue, irregular travel, and crossing time zones'
      ],
      samprapti: 'Vata and Rajasic mental gunas invade the Manovaha Srotas (channels of the psyche), displacing Kapha and Tamas necessary for natural twilight sedation.',
      doshaImbalance: 'Vata-Pitta dominant with depletion of stabilizing Kapha.',
      dhatusAffected: ['Majja Dhatu (Nervous system and bone marrow)', 'Rasa Dhatu (Plasma & hormonal secretions)']
    },
    symptoms: {
      classical: [
        'Jrimbha (Frequent daytime yawning and head dullness)',
        'Angamarda (Generalized body aches and muscle heaviness upon waking)',
        'Shirogourava (Heavy, clouded forehead sensation)',
        'Netrajadya (Dryness, burning, and heaviness in eyes)',
        'Chittabhrama (Scattered thoughts, brain fog, and low memory retention)'
      ],
      modern: [
        'Prolonged sleep onset latency (taking more than 40 minutes to fall asleep)',
        'Midnight awakenings with rapid heartbeat and racing thoughts',
        'Early morning awakening with inability to return to sleep',
        'Daytime fatigue and emotional irritability'
      ],
      warningSigns: [
        'Chronic hallucinations or severe disorientation from prolonged sleep deprivation',
        'Severe depressive mood episodes or dangerous daytime microsleep while driving'
      ]
    },
    causes: [
      'Late-night blue-light phone scrolling suppressing melatonin',
      'Caffeine consumption past 2:00 PM',
      'Heavy late dinners requiring active metabolic churning while attempting to rest'
    ],
    dietAndLifestyle: {
      pathya: [
        'Warm unpasteurized or A2 milk infused with Ashwagandha, saffron, or nutmeg',
        'Sweet, heavy, nourishing evening meals (e.g., Khichdi with ghee, pumpkin soup)',
        'Warm foot baths in Epsom salts or sesame oil before bed',
        'Padabhyanga: Sole of the foot massage with warm Brahmi or Sesame oil'
      ],
      apathya: [
        'Cold raw snacks, chips, and carbonated beverages at night',
        'Watching violent, suspenseful thriller movies in bed',
        'Intense anaerobic workouts after 7:30 PM'
      ],
      lifestyleTips: [
        'Institute a non-negotiable screen curfew 60 minutes prior to sleep.',
        'Keep the sleeping chamber pitch-dark, cool, and silent.',
        'Massage 2 drops of warm sesame oil on temples and the soles of both feet.'
      ],
      yogaPranayama: [
        'Yoga Nidra (Conscious guided psychic sleep for 20 minutes)',
        'Bhramari Pranayama (Humming bee breath for calming cerebral gamma waves)',
        'Supta Baddha Konasana (Reclining bound angle pose supported by bolsters)'
      ]
    },
    precautions: [
      'Avoid habit-forming pharmaceutical sedatives without medical monitoring.',
      'Do not consume large doses of nutmeg long-term without professional guidance.'
    ],
    homeRemediesIds: ['rem_moon_milk_insomnia'],
    keyIngredientsIds: ['ing_ashwagandha'],
    faqs: [
      {
        question: 'Why does foot massage (Padabhyanga) induce sleep?',
        answer: 'Ayurvedic anatomists identify vital marmas (nerve energy centers) on the soles connected directly to the eyes and brain. Massaging the feet with warm oil pulls erratic ascending Vata energy back downward, triggering deep parasympathetic relaxation.'
      }
    ],
    references: [
      { title: 'Ashtanga Hridaya, Sutrasthana, Chapter 7: Roganutpadaniya Adhyaya', source: 'Chaukhambha', year: 'Classical Text' },
      { title: 'Clinical Evaluation of Withania somnifera on Sleep Quality and Latency', source: 'Journal of Ethnopharmacology', year: '2021' }
    ],
    featured: false
  },
  {
    id: 'dis_ibs',
    slug: 'grahani-irritable-bowel-syndrome',
    name: 'IBS & Gut Dysbiosis (Grahani Roga)',
    sanskritName: 'Grahani (ग्रहणी रोग)',
    category: 'Digestive',
    summary: 'A chronic functional intestinal dysfunction caused by deep-seated digestive fire failure, producing alternating constipation, loose stools, and abdominal cramps.',
    primaryDosha: 'Vata-Pitta',
    updatedAt: 'January 2026',
    reviewedBy: AUTHORS.dr_menon,
    readingTime: '7 min read',
    overview: 'In Ayurveda, the anatomical site between the stomach and colon responsible for digestion, absorption, and stool transit is called Grahani (the seat of Agni). When Agni is compromised by erratic food habits and mental stress, food passes through the gut partially digested, giving rise to Grahani Roga—a classic equivalent of modern Irritable Bowel Syndrome (IBS). Patients experience distressing cycles of loose stools alternating with hard dry balls, lower abdominal cramping, food intolerances, and nutritional depletion.',
    ayurvedicPerspective: {
      nidana: [
        'Eating irregularly before the previous meal is digested',
        'Consuming incompatible food combinations (Viruddha Ahara like milk with fish or citrus)',
        'Severe chronic anxiety, overthinking, and nervous tension influencing the gut-brain axis',
        'Overuse of broad-spectrum antibiotics causing gut microbiome disruption'
      ],
      samprapti: 'Weak Agni creates Ama, which adheres to intestinal villi. The vitiated Samana Vayu causes disordered peristalsis, either expelling undigested food prematurely as loose stool or stalling it into desiccated dry pellets.',
      doshaImbalance: 'Tridoshic with Vata-Pitta predominance in alternating symptoms.',
      dhatusAffected: ['Rasa Dhatu', 'Purishavaha Srotas (Excretory channels)']
    },
    symptoms: {
      classical: [
        'Muhurbaddham Muhurdravam (Alternating episodes of hard bound stools and loose watery evacuations)',
        'Ama-yukta Mala (Stool containing foul odor, floating sticky mucus, and food fragments)',
        'Udara Shoola (Lower cramping abdominal colic relieved temporarily after defecation)',
        'Trishna & Mukhashosha (Dryness of mouth and dehydration thirst)',
        'Klama (Severe chronic fatigue despite normal sleep)'
      ],
      modern: [
        'Urgent need to evacuate immediately following breakfast',
        'Abdominal bloating that worsens toward the afternoon',
        'Sense of incomplete rectal evacuation',
        'Food sensitivities to dairy, gluten, or FODMAPs'
      ],
      warningSigns: [
        'Nocturnal diarrhea awakening the patient from deep sleep',
        'Blood in stool or unexplained significant anemia'
      ]
    },
    causes: [
      'Stressful on-the-go lunches eaten while answering emails',
      'Excess raw salads and cold smoothies shocking a weakened digestive system'
    ],
    dietAndLifestyle: {
      pathya: [
        'Takra (Freshly churned spiced buttermilk with roasted cumin and ginger) — considered the premier medicine for Grahani',
        'Warm, soupy Khichdi made of aged basmati and split yellow mung',
        'Stewed apples with clove and cinnamon',
        'Nutmeg, cumin, coriander, and caraway in food preparations'
      ],
      apathya: [
        'Raw cold vegetable salads and uncooked smoothies',
        'Commercial fermented foods, carbonated drinks, and ice cubes',
        'Heavy oily gravies and red meats'
      ],
      lifestyleTips: [
        'Drink freshly prepared Takra after lunch every single day.',
        'Chew each mouthful at least 25 times to pre-digest carbohydrates with saliva.'
      ],
      yogaPranayama: [
        'Pavanamuktasana (Wind-relieving pose) to release trapped intestinal gas',
        'Ardha Matsyendrasana (Gentle spinal twist for mesenteric circulation)',
        'Nadi Shodhana for gut-brain parasympathetic regulation'
      ]
    },
    precautions: [
      'Avoid self-medicating with harsh purgatives or chemical laxatives that permanently weaken bowel tone.'
    ],
    homeRemediesIds: ['rem_ginger_lemon_digestive', 'rem_amla_aloe_reflux'],
    keyIngredientsIds: ['ing_ginger', 'ing_amla', 'ing_cinnamon'],
    faqs: [
      {
        question: 'Why is spiced buttermilk (Takra) called nectar for Grahani?',
        answer: 'Charaka states that Takra is light (Laghu), astringent-sweet (Kashaya-Madhura), and deepana (kindles Agni) without producing Pitta heat. Its natural probiotics re-colonize the microbiome while arresting gut hyper-motility.'
      }
    ],
    references: [
      { title: 'Charaka Samhita, Chikitsa Sthana: Grahani Chikitsa Adhyaya', source: 'Chaukhambha', year: 'Classical Text' },
      { title: 'Clinical Evaluation of Ayurvedic Protocol in IBS-D and IBS-M', source: 'Journal of Ayurveda and Integrated Medicine', year: '2022' }
    ],
    featured: false
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art_1',
    slug: 'the-three-pillars-of-ayurvedic-digestion-agni-ama-ojas',
    title: 'The Sacred Trinity of Gut Health: Agni, Ama, and Ojas in Daily Life',
    category: 'Philosophy & Lifestyle',
    summary: 'Why classical Ayurveda considers your digestive fire the cornerstone of all immunity, vitality, and longevity.',
    content: 'Long before modern science uncovered the microbiome and gut-brain axis, classical Ayurvedic physicians declared that all physical diseases originate from impaired Agni (the biological digestive fire). When Agni burns bright, clear, and balanced, every morsel of food is transformed into sparkling vitality, strong immune cells, and Ojas (the pure essence of longevity). Conversely, when Agni is smothered by erratic meals, chilled drinks, or stress, food turns into Ama—a sticky, foul metabolic sludge that coats the tongue and clogs bodily channels.',
    coverImage: 'https://images.pexels.com/photos/6978215/pexels-photo-6978215.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    publishedAt: 'February 12, 2026',
    readTime: '5 min read',
    author: AUTHORS.dr_sharma,
    tags: ['Agni', 'Gut Health', 'Ayurveda Fundamentals', 'Immunity']
  },
  {
    id: 'art_2',
    slug: 'dinacharya-the-ayurvedic-morning-routine-for-longevity',
    title: 'Dinacharya: The Ancient Morning Rituals That Outperform Modern Biohacks',
    category: 'Daily Routines',
    summary: 'A step-by-step practical guide to tongue scraping, oil pulling, warm water sips, and gentle movement before 8:00 AM.',
    content: 'Ayurveda places immense emphasis on how we greet the dawn. The early morning hours (Brahma Muhurta and the Vata period between 2:00 AM and 6:00 AM) are filled with lightness, clarity, and pure cosmic prana. By aligning our morning routine with Dinacharya—scraping the white metabolic Ama off the tongue, swishing with warm sesame oil (Gandusha), drinking warm copper-infused water, and taking a mindful brisk walk—we synchronize our cellular circadian clocks for lasting stamina.',
    coverImage: 'https://images.pexels.com/photos/5480036/pexels-photo-5480036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    publishedAt: 'January 28, 2026',
    readTime: '6 min read',
    author: AUTHORS.dr_priya,
    tags: ['Dinacharya', 'Morning Routine', 'Longevity', 'Habits']
  },
  {
    id: 'art_3',
    slug: 'understanding-your-prakriti-vata-pitta-kapha-balance',
    title: 'De-mystifying Doshas: How to Honor Your Inherent Mind-Body Constitution',
    category: 'Ayurvedic Principles',
    summary: 'Discover how Vata, Pitta, and Kapha influence your metabolism, emotional tendencies, and susceptibility to seasonal ailments.',
    content: 'Every human being is born with a unique genetic and energetic blueprint known as Prakriti—a precise combination of the five master elements: Ether, Air, Fire, Water, and Earth. Vata governs movement and nervous impulses; Pitta orchestrates transformation, digestion, and enzymatic heat; Kapha provides physical lubrication, structural stability, and cellular cohesion. Understanding your dominant Dosha is not a rigid label, but a compass for choosing appropriate foods, exercise levels, and herbal remedies.',
    coverImage: 'https://images.pexels.com/photos/7615621/pexels-photo-7615621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    publishedAt: 'January 14, 2026',
    readTime: '7 min read',
    author: AUTHORS.dr_menon,
    tags: ['Doshas', 'Prakriti', 'Vata', 'Pitta', 'Kapha']
  }
];
