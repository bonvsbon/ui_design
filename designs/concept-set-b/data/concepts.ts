import type { Concept, Campaign, SectionConfig } from '~/types'
export const concepts: Concept[] = [
  {
    id: 'concept-01',
    number: '01',
    name: 'Own your everyday.',
    label: 'Modern Minimal',
    description: 'Product-first editorial. Confident space. A fresh point of view.',
    audience: 'Style-conscious everyday shoppers',
    strength: 'Distinctive, versatile brand identity',
    risk: 'Depends on strong product photography',
    use: 'Main brand storefront',
    color: 'oklch(0.87 0.17 116)',
  },
  {
    id: 'concept-02',
    number: '02',
    name: 'Move different.',
    label: 'Bold Sport',
    description: 'Athletic typography, asymmetric composition, and a restless rhythm.',
    audience: 'Young, active, trend-aware shoppers',
    strength: 'High campaign impact and energy',
    risk: 'Motion and density need restraint',
    use: 'Launches and collaborations',
    color: 'oklch(0.65 0.2 36)',
  },
  {
    id: 'concept-03',
    number: '03',
    name: 'Life, well walked.',
    label: 'Lifestyle Stories',
    description: 'A people-first journal of the everyday places our feet take us.',
    audience: 'Families and lifestyle shoppers',
    strength: 'Emotional connection and occasion-led discovery',
    risk: 'Longer journey to individual products',
    use: 'Lifestyle and community positioning',
    color: 'oklch(0.48 0.12 27)',
  },
  {
    id: 'concept-04',
    number: '04',
    name: 'Your pair, found.',
    label: 'Smart Commerce',
    description: 'A friendly guided finder, useful recommendations, and clear choices.',
    audience: 'Purposeful, comfort-seeking shoppers',
    strength: 'Fast product discovery and conversion',
    risk: 'Less expressive brand personality',
    use: 'Core ecommerce storefront',
    color: 'oklch(0.48 0.11 230)',
  },
  {
    id: 'concept-05',
    number: '05',
    name: 'Feel what’s next.',
    label: 'Future Footwear',
    description: 'A tactile product lab that makes the feeling of comfort visible.',
    audience: 'Technology and comfort seekers',
    strength: 'Communicates product innovation',
    risk: 'Needs accurate, richer product assets',
    use: 'Flagship products and technology stories',
    color: 'oklch(0.83 0.09 220)',
  },
]
export const defaultCampaigns: Record<string, Campaign> = {
  'concept-01': {
    title: 'GO YOUR\nOWN WAY.',
    subtitle:
      'Big days. Small detours. Uncompromising comfort.\nMade for wherever you feel like going.',
    cta: 'Explore new arrivals',
    image: '/images/hero-campaign.jpg',
  },
  'concept-02': {
    title: 'LESS LIMITS.\nMORE YOU.',
    subtitle:
      'From your first move to your next adventure.\nFind your rhythm. We’ll bring the comfort.',
    cta: 'Find your next move',
    image: '/images/shoe-3.png',
  },
  'concept-03': {
    title: 'Every step\nhas a story.',
    subtitle:
      'The slow mornings. The spontaneous weekends.\nThe little moments that become your life.',
    cta: 'Find your everyday',
    image: '/images/product-4.png',
  },
  'concept-04': {
    title: 'Good days start\nwith the right pair.',
    subtitle:
      'A little about you. A pair that feels just right.\nLet’s find your everyday comfort.',
    cta: 'Find my pair',
    image: '/images/shoe-1.png',
  },
  'concept-05': {
    title: 'COMFORT,\nENGINEERED.',
    subtitle:
      'Meet the feeling behind every step.\nExplore the material. Experience the difference.',
    cta: 'Explore GBOLD',
    image: '/images/shoe-1.png',
  },
}
export const defaultSections: Record<string, SectionConfig[]> = {
  'concept-01': [
    { id: 'categories', label: 'Shop by category', enabled: true },
    { id: 'arrivals', label: 'New arrivals', enabled: true },
    { id: 'technology', label: 'GBOLD technology', enabled: true },
    { id: 'bestsellers', label: 'Best sellers', enabled: true },
    { id: 'campaign', label: 'Lifestyle campaign', enabled: true },
    { id: 'lifestyles', label: 'Shop by lifestyle', enabled: true },
    { id: 'stores', label: 'Store locator', enabled: true },
    { id: 'social', label: 'Community gallery', enabled: true },
  ],
  'concept-02': [
    { id: 'categories', label: 'Quick categories', enabled: true },
    { id: 'trending', label: 'Trending products', enabled: true },
    { id: 'technology', label: 'Interactive product', enabled: true },
    { id: 'lifestyles', label: 'Find your playground', enabled: true },
  ],
  'concept-03': [
    { id: 'lifestyles', label: 'Shop your kind of day', enabled: true },
    { id: 'story', label: 'The weekend edit', enabled: true },
    { id: 'arrivals', label: 'Everyday favourites', enabled: true },
    { id: 'stores', label: 'Find us nearby', enabled: true },
  ],
  'concept-04': [
    { id: 'categories', label: 'Quick shop', enabled: true },
    { id: 'arrivals', label: 'Recommended products', enabled: true },
    { id: 'technology', label: 'Comfort explained', enabled: true },
  ],
  'concept-05': [
    { id: 'technology', label: 'Interactive material lab', enabled: true },
    { id: 'comparison', label: 'Technology comparison', enabled: true },
    { id: 'arrivals', label: 'Meet the collection', enabled: true },
  ],
}

export const alternateCampaign = {
  title: 'COMFORT.\nNO LIMITS.',
  subtitle: 'A softer side to your everyday.\nDiscover the GBOLD collection.',
  cta: 'Meet your everyday pair',
  image: '/images/hero-campaign.jpg',
}
