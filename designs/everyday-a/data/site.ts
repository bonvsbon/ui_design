import type { SiteSettings } from '~/types'
import { media } from './media'

/** Global settings (CMS: "Site settings"). Announcement bar, navigation and footer are all editable. */
export const site: SiteSettings = {
  freeShippingThreshold: 599,
  announcements: [
    { text: 'ส่งฟรีทั่วประเทศ เมื่อช้อปครบ ฿599', to: '/products' },
    { text: 'คอลเลกชันใหม่ Summer Escape มาแล้ว', to: '/products?collection=summer-escape' },
    { text: 'สั่งออนไลน์ รับที่ร้านใกล้บ้านได้ฟรี', to: '/stores' },
  ],
  nav: [
    {
      label: 'Men', to: '/products?gender=men',
      mega: {
        columns: [
          { heading: 'Shop by Style', links: [
            { label: 'Flip Flops', to: '/products?gender=men&type=flip-flops' },
            { label: 'Slides', to: '/products?gender=men&type=slides' },
            { label: 'Sandals', to: '/products?gender=men&type=sandals' },
            { label: 'Sneakers', to: '/products?gender=men&type=sneakers' },
            { label: 'Shop All Men', to: '/products?gender=men' },
          ] },
          { heading: 'Featured', links: [
            { label: 'New Arrivals', to: '/products?gender=men&badge=new' },
            { label: 'Best Sellers', to: '/products?gender=men&badge=best-seller' },
            { label: 'Everyday Comfort', to: '/products?gender=men&collection=everyday-comfort' },
            { label: 'Online Exclusive', to: '/products?gender=men&badge=online-exclusive' },
          ] },
          { heading: 'Collections', links: [
            { label: 'GBOLD Technology™', to: '/products?gender=men&collection=gbold' },
            { label: 'Summer Escape', to: '/products?gender=men&collection=summer-escape' },
            { label: 'ZAPP · JOIN THE WAY', to: '/products?gender=men&style=ZAPP' },
          ] },
        ],
        feature: { media: media.travelRoad, eyebrow: 'New Season', title: 'Weekend, Unplanned', to: '/products?gender=men&lifestyle=weekend' },
      },
    },
    {
      label: 'Women', to: '/products?gender=women',
      mega: {
        columns: [
          { heading: 'Shop by Style', links: [
            { label: 'Flip Flops', to: '/products?gender=women&type=flip-flops' },
            { label: 'Slides', to: '/products?gender=women&type=slides' },
            { label: 'Sandals', to: '/products?gender=women&type=sandals' },
            { label: 'Sneakers', to: '/products?gender=women&type=sneakers' },
            { label: 'Shop All Women', to: '/products?gender=women' },
          ] },
          { heading: 'Featured', links: [
            { label: 'New Arrivals', to: '/products?gender=women&badge=new' },
            { label: 'Best Sellers', to: '/products?gender=women&badge=best-seller' },
            { label: 'Everyday Comfort', to: '/products?gender=women&collection=everyday-comfort' },
          ] },
          { heading: 'Collections', links: [
            { label: 'GBOLD Technology™', to: '/products?gender=women&collection=gbold' },
            { label: 'Summer Escape', to: '/products?gender=women&collection=summer-escape' },
            { label: 'ZAH Collection', to: '/products?gender=women&style=ZAH' },
          ] },
        ],
        feature: { media: media.legsWall, eyebrow: 'Summer Escape', title: 'Soft Days, Pink Hours', to: '/products?gender=women&collection=summer-escape' },
      },
    },
    {
      label: 'Kids', to: '/products?gender=kids',
      mega: {
        columns: [
          { heading: 'Shop Kids', links: [
            { label: 'Boys', to: '/products?gender=kids&kids=boys' },
            { label: 'Girls', to: '/products?gender=kids&kids=girls' },
            { label: 'Flip Flops', to: '/products?gender=kids&type=flip-flops' },
            { label: 'Slides', to: '/products?gender=kids&type=slides' },
          ] },
          { heading: 'Featured', links: [
            { label: 'New for Kids', to: '/products?gender=kids&badge=new' },
            { label: 'Best Sellers', to: '/products?gender=kids&badge=best-seller' },
            { label: 'Size Guide', to: '/stories/size-guide' },
          ] },
        ],
        feature: { media: media.kidPaint, eyebrow: 'Little Steps', title: 'Big Adventures', to: '/products?gender=kids' },
      },
    },
    { label: 'Sneakers', to: '/products?type=sneakers' },
    { label: 'New Arrivals', to: '/products?badge=new' },
    { label: 'GBOLD Technology', to: '/technology' },
    { label: 'Stories', to: '/stories' },
  ],
  footer: [
    { heading: 'Shop', links: [
      { label: 'Men', to: '/products?gender=men' },
      { label: 'Women', to: '/products?gender=women' },
      { label: 'Kids', to: '/products?gender=kids' },
      { label: 'Sneakers', to: '/products?type=sneakers' },
      { label: 'New Arrivals', to: '/products?badge=new' },
    ] },
    { heading: 'Discover', links: [
      { label: 'GBOLD Technology™', to: '/technology' },
      { label: 'Stories', to: '/stories' },
      { label: 'About GAMBOL', to: '/stories/about-gambol' },
    ] },
    { heading: 'Support', links: [
      { label: 'Contact', to: '/stores#contact' },
      { label: 'FAQ', to: '/stories/size-guide' },
      { label: 'Shipping', to: '/stories/size-guide' },
      { label: 'Returns', to: '/stories/size-guide' },
      { label: 'Size Guide', to: '/stories/size-guide' },
    ] },
    { heading: 'Store', links: [
      { label: 'Find a Store', to: '/stores' },
    ] },
  ],
  social: [
    { label: 'Facebook GambolThailand', href: 'https://www.facebook.com/GambolThailand', icon: 'facebook' },
    { label: 'Instagram GambolThailand', href: 'https://www.instagram.com/gambolthailand', icon: 'instagram' },
    { label: 'TikTok', href: 'https://www.tiktok.com/', icon: 'tiktok' },
    { label: 'LINE Official', href: 'https://line.me/', icon: 'line' },
  ],
}
