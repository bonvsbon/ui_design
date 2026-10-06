export const shopCategories = ['Men', 'Women', 'Kids', 'Sneakers']
export const footwearTypes = ['Flip Flops', 'Slides', 'Sandals', 'Sneakers']
export const benefits = [
  {
    id: 'comfort',
    label: 'COMFORT',
    thai: 'สบายในทุกก้าว',
    description: 'A contoured footbed designed to support the natural shape of your foot.',
    icon: 'footprints',
    x: 40,
    y: 40,
  },
  {
    id: 'soft',
    label: 'SOFT',
    thai: 'นุ่มทุกสัมผัส',
    description: 'Soft-touch material brings a little more comfort to the everyday.',
    icon: 'cloud',
    x: 64,
    y: 32,
  },
  {
    id: 'lite',
    label: 'LITE',
    thai: 'เบา พร้อมไปต่อ',
    description: 'Lightweight construction makes it easy to keep moving through your day.',
    icon: 'feather',
    x: 71,
    y: 66,
  },
  {
    id: 'durable',
    label: 'DURABLE',
    thai: 'พร้อมทุกวันของคุณ',
    description: 'Made for the familiar routes and spontaneous detours of everyday wear.',
    icon: 'shield',
    x: 35,
    y: 72,
  },
]
export const footerGroups = [
  {
    title: 'SHOP',
    links: [
      ['Men', '/products?gender=Men'],
      ['Women', '/products?gender=Women'],
      ['Kids', '/products?gender=Kids'],
      ['Sneakers', '/products?type=Sneakers'],
    ],
  },
  {
    title: 'DISCOVER',
    links: [
      ['GBOLD Technology', '/technology'],
      ['Stories & style', '/stories'],
      ['About GAMBOL', '/about'],
      ['News & activity', '/stories?category=INSIDE%20GAMBOL'],
    ],
  },
  {
    title: 'HERE TO HELP',
    links: [
      ['Contact us', '/support#contact'],
      ['Shipping & returns', '/support#shipping'],
      ['Size guide', '/support#sizes'],
      ['FAQs', '/support#faq'],
    ],
  },
  {
    title: 'COME SAY HI',
    links: [
      ['Find a store', '/stores'],
      ['Facebook', 'https://www.facebook.com/GAMBOLThailand'],
      ['Instagram', 'https://www.instagram.com/gambolthailand/'],
    ],
  },
]
