export interface City {
  slug: string
  name: string
  nameIn: string
  phone?: string
  address?: string
  uniqueText?: string
  image?: string
}

export const cities: City[] = [
  {
    slug: "moscow",
    name: "Москва",
    nameIn: "Москве",
    phone: "+7 (495) 123-45-67",
    address: "ул. Тверская, 1",
    uniqueText: "Самая большая школа барабанов в столице России",
    image: "/images/cities/moscow.jpg",
  },
  {
    slug: "mytischi",
    name: "Мытищи",
    nameIn: "Мытищах",
    phone: "+7 (495) 765-43-21",
    address: "ул. Центральная, 10",
    uniqueText: "Школа барабанов в Мытищах",
    image: "/images/cities/mytischi.jpg",
  },
  {
    slug: "ryazan",
    name: "Рязань",
    nameIn: "Рязани",
    phone: "+7 (491) 222-33-44",
    address: "ул. Ленина, 15",
    uniqueText: "Школа барабанов в Рязани",
    image: "/images/cities/ryazan.jpg",
  },
  {
    slug: "ufa",
    name: "Уфа",
    nameIn: "Уфе",
    phone: "+7 (347) 333-44-55",
    address: "ул. Пушкина, 22",
    uniqueText: "Школа барабанов в Уфе",
    image: "/images/cities/ufa.jpg",
  },
  {
    slug: "tyumen",
    name: "Тюмень",
    nameIn: "Тюмени",
    phone: "+7 (345) 444-55-66",
    address: "ул. Республики, 30",
    uniqueText: "Школа барабанов в Тюмени",
    image: "/images/cities/tyumen.jpg",
  },
  {
    slug: "ilyinskoe-usovo",
    name: "Ильинское-Усово",
    nameIn: "Ильинском-Усово",
    phone: "+7 (495) 555-66-77",
    address: "ул. Центральная, 5",
    uniqueText: "Школа барабанов в Ильинском-Усово",
    image: "/images/cities/ilyinskoe.jpg",
  },
  {
    slug: "krasnoyarsk",
    name: "Красноярск",
    nameIn: "Красноярске",
    phone: "+7 (391) 666-77-88",
    address: "ул. Мира, 45",
    uniqueText: "Школа барабанов в Красноярске",
    image: "/images/cities/krasnoyarsk.jpg",
  },
  {
    slug: "pyatigorsk",
    name: "Пятигорск",
    nameIn: "Пятигорске",
    phone: "+7 (879) 777-88-99",
    address: "ул. Кирова, 12",
    uniqueText: "Школа барабанов в Пятигорске",
    image: "/images/cities/pyatigorsk.jpg",
  },
  {
    slug: "krasnogorsk",
    name: "Красногорск",
    nameIn: "Красногорске",
    phone: "+7 (495) 888-99-00",
    address: "ул. Ленина, 20",
    uniqueText: "Школа барабанов в Красногорске",
    image: "/images/cities/krasnogorsk.jpg",
  },
  {
    slug: "voronezh",
    name: "Воронеж",
    nameIn: "Воронеже",
    phone: "+7 (473) 999-00-11",
    address: "ул. Плехановская, 25",
    uniqueText: "Школа барабанов в Воронеже",
    image: "/images/cities/voronezh.jpg",
  },
  {
    slug: "zelenograd",
    name: "Зеленоград",
    nameIn: "Зеленограде",
    phone: "+7 (499) 000-11-22",
    address: "Центральный проспект, 15",
    uniqueText: "Школа барабанов в Зеленограде",
    image: "/images/cities/zelenograd.jpg",
  },
  {
    slug: "balashiha",
    name: "Балашиха",
    nameIn: "Балашихе",
    phone: "+7 (495) 111-22-33",
    address: "ул. Советская, 8",
    uniqueText: "Школа барабанов в Балашихе",
    image: "/images/cities/balashiha.jpg",
  },
  {
    slug: "vladivostok",
    name: "Владивосток",
    nameIn: "Владивостоке",
    phone: "+7 (423) 222-33-44",
    address: "ул. Светланская, 35",
    uniqueText: "Школа барабанов во Владивостоке",
    image: "/images/cities/vladivostok.jpg",
  },
  // Новые города:
  {
    slug: "kamchatka",
    name: "Камчатка",
    nameIn: "Камчатке",
    phone: "+7 (415) 123-45-67",
    address: "ул. Вулканная, 1",
    uniqueText: "Школа барабанов на Камчатке",
    image: "/images/cities/kamchatka.jpg",
  },
  {
    slug: "istra",
    name: "Истра",
    nameIn: "Истре",
    phone: "+7 (496) 234-56-78",
    address: "ул. Советская, 3",
    uniqueText: "Школа барабанов в Истре",
    image: "/images/cities/istra.jpg",
  },
  {
    slug: "irkutsk",
    name: "Иркутск",
    nameIn: "Иркутске",
    phone: "+7 (395) 345-67-89",
    address: "ул. Карла Маркса, 10",
    uniqueText: "Школа барабанов в Иркутске",
    image: "/images/cities/irkutsk.jpg",
  },
  {
    slug: "khabarovsk",
    name: "Хабаровск",
    nameIn: "Хабаровске",
    phone: "+7 (421) 456-78-90",
    address: "ул. Ленина, 50",
    uniqueText: "Школа барабанов в Хабаровске",
    image: "/images/cities/khabarovsk.jpg",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug)
}

export function cityExists(slug: string): boolean {
  return cities.some((city) => city.slug === slug)
}

export function getDefaultCity(): City {
  return cities[0] // Москва как город по умолчанию
} 