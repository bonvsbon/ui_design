import type { SiteContent, VisualCard } from '~/types'
const media = (src: string, alt: string, position?: string) => ({
  src: `/images/${src}.webp`,
  alt,
  position,
})
const card = (
  id: string,
  title: string,
  photo: string,
  alt: string,
  href: string,
  subtitle?: string,
  position?: string
): VisualCard => ({ id, title, image: media(photo, alt, position), href, subtitle })
export const defaultContent: SiteContent = {
  announcement: {
    text: 'Good days start with a comfortable pair.',
    link: { label: 'พบคอลเลกชันใหม่', href: '/products?new=true' },
  },
  sections: [
    {
      id: 'main-campaign',
      type: 'hero',
      enabled: true,
      eyebrow: 'GO EASY. GO GAMBOL.',
      title: 'EVERYDAY\nFEELS BETTER.',
      subtitle: 'ความสบายที่ไปได้กับทุกวัน',
      body: 'Flip flops, slides & everyday good company.',
      media: {
        ...media('coast', 'Two friends enjoying the Thai coast in casual sandals', '65% center'),
        mobileSrc: '/images/coast-mobile.webp',
      },
      cta: { label: 'SHOP MEN', href: '/products?gender=Men' },
      secondaryCta: { label: 'SHOP WOMEN', href: '/products?gender=Women' },
    },
    {
      id: 'categories',
      type: 'categories',
      enabled: true,
      title: 'FIND YOUR PAIR.',
      subtitle: 'คู่ที่ใช่ สำหรับทุกวันของคุณ',
      cards: [
        card(
          'men',
          'MEN',
          'city-life',
          'A man exploring a Bangkok cafe in black slides',
          '/products?gender=Men'
        ),
        card(
          'women',
          'WOMEN',
          'coast',
          'A woman relaxing by the sea in white flip flops',
          '/products?gender=Women',
          undefined,
          '66% 55%'
        ),
        card(
          'kids',
          'KIDS',
          'little-adventures',
          'Children playing outside in blue and pink sandals',
          '/products?gender=Kids'
        ),
        card(
          'sneakers',
          'SNEAKERS',
          'sneaker-life',
          'Burgundy GAMBOL-style sneakers worn on sunlit Bangkok stairs',
          '/products?type=Sneakers'
        ),
      ],
    },
    {
      id: 'bestsellers',
      type: 'products',
      enabled: true,
      title: 'GOOD DAYS. GREAT PAIRS.',
      subtitle: 'คู่โปรดที่ทุกคนเลือก · Best sellers',
      productIds: [
        'ezy-everyday',
        'ezy-cloud',
        'zah-weekender',
        'ezy-classic',
        'ezy-soft-step',
        'zaap-energy',
      ],
      cta: { label: 'SHOP BEST SELLERS', href: '/products?best=true' },
    },
    {
      id: 'brand-story',
      type: 'brandStory',
      enabled: true,
      title: 'MADE FOR\nEVERYDAY\nMOVEMENT.',
      subtitle: 'ทุกวันธรรมดา มีเรื่องดี ๆ รออยู่',
      body: 'The coffee run. The long way home. The weekend with no plans. A little more comfort for everything that makes your day yours.',
      media: media('city-life', 'A relaxed city walk in GAMBOL-style slides'),
      cta: { label: 'MEET YOUR EVERYDAY', href: '/stories/everyday-movement' },
    },
    {
      id: 'lifestyles',
      type: 'lifestyles',
      enabled: true,
      title: 'MADE FOR YOUR DAY.',
      subtitle: 'Where are we going today?',
      cards: [
        card(
          'everyday',
          'EVERYDAY',
          'city-life',
          'Morning coffee in the city',
          '/products?lifestyle=Everyday',
          'ทุกวัน ไปได้สบาย'
        ),
        card(
          'travel',
          'TRAVEL',
          'coast',
          'A coastal escape with friends',
          '/products?lifestyle=Travel',
          'พร้อมไปกับทุกทริป',
          '75% center'
        ),
        card(
          'city',
          'CITY WALK',
          'city',
          'Bangkok city streets',
          '/products?lifestyle=City%20Walk',
          'เบา สบาย พร้อมเดินทั้งวัน'
        ),
        card(
          'weekend',
          'WEEKEND',
          'little-adventures',
          'Family adventures outside',
          '/products?lifestyle=Weekend',
          'ปล่อยวันหยุดให้พาไป'
        ),
        card(
          'outdoor',
          'OUTDOOR',
          'outdoor',
          'Open mountain landscape',
          '/products?lifestyle=Outdoor',
          'ออกไปเจอสิ่งใหม่'
        ),
        card(
          'relax',
          'RELAX',
          'beach',
          'Quiet beach in the sunshine',
          '/products?lifestyle=Relax',
          'พักสักนิด สบายอีกหน่อย'
        ),
      ],
    },
    {
      id: 'men-new',
      type: 'collection',
      enabled: true,
      title: 'NEW FOR MEN.',
      subtitle: 'Your everyday rotation, refreshed.',
      media: media('city-life', 'A man wearing black slides outside a Bangkok cafe'),
      productIds: ['ezy-everyday', 'ezy-classic', 'zaap-energy', 'zah-weekender'],
      cta: { label: 'EXPLORE MEN', href: '/products?gender=Men&new=true' },
    },
    {
      id: 'women-new',
      type: 'collection',
      enabled: true,
      title: 'NEW FOR WOMEN.',
      subtitle: 'A little lighter. A little more you.',
      media: media('coast', 'A woman wearing white flip flops on the coast', '68% center'),
      reverse: true,
      productIds: ['ezy-cloud', 'zeek-sunshine', 'ezy-soft-step', 'weekend-soft'],
      cta: { label: 'EXPLORE WOMEN', href: '/products?gender=Women&new=true' },
    },
    {
      id: 'technology',
      type: 'technology',
      enabled: true,
      title: 'THE COMFORT\nBEHIND EVERY STEP.',
      subtitle: 'GBOLD TECHNOLOGY™',
      body: 'Good days start from the ground up. Get to know the four things that make a GAMBOL pair feel like GAMBOL.',
      media: media('shoe-3-alt', 'Close-up of the GAMBOL slide footbed and straps'),
      cta: { label: 'EXPLORE GBOLD', href: '/technology' },
    },
    {
      id: 'summer',
      type: 'featured',
      enabled: true,
      title: 'SUMMER\nSTATE OF MIND.',
      subtitle: 'รองเท้าที่พร้อมไปกับทุกทริป',
      eyebrow: 'THE SUMMER ESCAPE EDIT',
      media: media('coast', 'Friends finding their summer rhythm by the Thai sea'),
      productIds: ['zah-weekender', 'zeek-sunshine', 'weekend-soft'],
      cta: { label: 'FIND YOUR ESCAPE', href: '/products?collection=Summer%20Escape' },
    },
    {
      id: 'hero-product',
      type: 'heroProduct',
      enabled: true,
      title: 'LESS WEIGHT.\nMORE WEEKEND.',
      subtitle: 'The EZY Everyday Slide',
      body: 'An easy-on shape. A soft landing. Your everyday favourite, for all the places you call your own.',
      productIds: ['ezy-everyday'],
      media: media('shoe-3-alt', 'Black GAMBOL slide with a soft shaped footbed'),
      cta: { label: 'MEET THE EZY SLIDE', href: '/product/ezy-everyday' },
    },
    {
      id: 'kids',
      type: 'kids',
      enabled: true,
      title: 'LITTLE STEPS.\nBIG ADVENTURES.',
      subtitle: 'พร้อมสนุก ไปกับทุกก้าวเล็ก ๆ',
      media: media('little-adventures', 'Two children playing in a tropical park wearing sandals'),
      cta: { label: 'SHOP BOYS', href: '/products?gender=Kids&kidsGroup=Boys' },
      secondaryCta: { label: 'SHOP GIRLS', href: '/products?gender=Kids&kidsGroup=Girls' },
      productIds: ['kids-blue-day', 'kids-playtime', 'kids-easy'],
    },
    {
      id: 'stories',
      type: 'stories',
      enabled: true,
      title: 'A LITTLE GAMBOL IN YOUR DAY.',
      subtitle: 'Style, good places & everyday inspiration.',
      storyIds: ['a-day-on-your-feet', 'weekend-style-guide', 'find-your-fit'],
      cta: { label: 'ALL STORIES', href: '/stories' },
    },
    {
      id: 'stores',
      type: 'stores',
      enabled: true,
      title: 'GOOD COMFORT.\nCLOSER THAN YOU THINK.',
      subtitle: 'FIND GAMBOL NEAR YOU',
      body: 'ลองคู่ที่ใช่ สัมผัสความสบายด้วยตัวคุณเอง',
      media: media('city-life', 'An inviting Bangkok neighbourhood cafe and walkway'),
      cta: { label: 'FIND A STORE', href: '/stores' },
    },
    {
      id: 'community',
      type: 'social',
      enabled: true,
      title: 'YOUR DAY. YOUR WAY.',
      subtitle: '#GAMBOLSTYLE',
      cards: [
        card(
          'community-1',
          'Coffee, then wherever.',
          'city-life',
          'Weekend cafe style',
          '/products?lifestyle=City%20Walk'
        ),
        card(
          'community-2',
          'A slower kind of Sunday.',
          'coast',
          'By the coast in casual flip flops',
          '/products?lifestyle=Travel'
        ),
        card(
          'community-3',
          'Small feet. Big plans.',
          'little-adventures',
          'Playful family days',
          '/products?gender=Kids'
        ),
        card(
          'community-4',
          'A little colour goes a long way.',
          'product-1',
          'GAMBOL pink campaign styling',
          '/products?gender=Men'
        ),
        card(
          'community-5',
          'Take the scenic route.',
          'product-2',
          'GAMBOL street style with yellow flip flops',
          '/products?lifestyle=Weekend'
        ),
      ],
    },
  ],
}
