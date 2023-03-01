import { apiUrl } from './data/siteDetails'

export default defineAppConfig({
  apiUrl: 'https://shop.loesje.nl/',
  shopUrl: `${apiUrl}winkeltje`,
  // apiUrl: 'http://localhost:8000/',
  baseUrl: 'https://www.loesje.nl',
  categories: ['politics'],
  facebook: 'https://www.facebook.com/loesjevdposters/',
  themeColor: '#000000',
  backgroundColor: '#ffffff',
  title: 'Loesje',
  twitter: '@LoesjeNL',
  address: {
    title: 'Loesjes winkeltje',
    companyName: 'Loesje',
    street: 'Utrechtseweg 310',
    city: 'Arnhem',
    zipcode: '6812 AR',
    email: 'loesje@loesje.nl',
    emailShop: 'winkeltje@loesje.nl',
    kvk: 'KVKnummer: 40122845',
  },
  socialMedia: {
    twitterUrl: 'https://twitter.com/LoesjeNL',
    facebookUrl: 'https://twitter.com/LoesjeNL',
    instagramUrl: 'https://instagram.com/loesjevdposters',
    pinterestUrl: 'https://www.pinterest.com/loesjenl/',
    linkedinUrl: 'https://www.linkedin.com/company/loesje/',
  },
})
