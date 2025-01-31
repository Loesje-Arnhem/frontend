import { apiUrl } from "./data/siteDetails";

export default defineAppConfig({
  // apiUrl: 'https://shop.loesje.nl/',
  shopUrl: `${apiUrl}winkeltje`,
  // apiUrl: 'http://localhost:8000/',
  wpUrl: "https://shop.loesje.nl",
  apiUrl: "https://shop.loesje.nl/wp-json/wp/v2/",
  woocommerceApiUrl: "https://shop.loesje.nl/wp-json/wc/store/v1/",
  baseUrl: "https://www.loesje.nl",
  categories: ["politics"],
  facebook: "https://www.facebook.com/loesjevdposters/",
  themeColor: "#000000",
  backgroundColor: "#ffffff",
  title: "Loesje",
  twitter: "@LoesjeNL",
  address: {
    title: "Loesjes winkeltje",
    companyName: "Loesje",
    street: "Utrechtseweg 310",
    city: "Arnhem",
    zipcode: "6812 AR",
    email: "loesje@loesje.nl",
    emailShop: "winkeltje@loesje.nl",
    kvk: "KVKnummer: 40122845",
  },
  socialMedia: {
    twitterUrl: "https://twitter.com/LoesjeNL",
    facebookUrl: "https://www.facebook.com/loesjevdposters/",
    instagramUrl: "https://instagram.com/loesjevdposters",
    pinterestUrl: "https://www.pinterest.com/loesjenl/",
    linkedinUrl: "https://www.linkedin.com/company/loesje/",
    youtubeUrl: "https://www.youtube.com/user/LoesjeNederland",
    blueskyUrl: "https://bsky.app/profile/loesjevdposters.bsky.social",
  },
  pageIds: {
    home: 6434,
    join: 430,
    about: 415,
    workshops: 362,
    posts: 757,
    shop: 30777,
    cart: 30779,
    checkout: 30780,
    newsletter: 27758,
    school: 114505,
  },
  mediaQueryStandAlone:
    "(display-mode: standalone), (display-mode: window-controls-overlay)",
  rssHead: {
    site_url: "https://www.loesje.nl",
    language: "nl-NL",
    generator: "Loesje rss generator 3000",
    image_url: "https://www.loesje.nl/icons/logo.svg",
  },
  newsletterLists: {
    website: "website",
    products: "products",
  },
  clubCollect: {
    widgets: 'https://app.clubcollect.com/widgets.js'
  }
});
