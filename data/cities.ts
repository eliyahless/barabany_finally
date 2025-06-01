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
  },
  {
    slug: "mytischi",
    name: "Мытищи",
    nameIn: "Мытищах",
    phone: "+7 (495) 765-43-21",
    address: "ул. Центральная, 10",
    uniqueText: "Школа барабанов в Мытищах",
  },
  {
    slug: "ryazan",
    name: "Рязань",
    nameIn: "Рязани",
    phone: "+7 (4912) 12-34-56",
    address: "ул. Ленина, 5",
    uniqueText: "Школа барабанов в Рязани",
  },
  {
    slug: "ufa",
    name: "Уфа",
    nameIn: "Уфе",
    phone: "+7 (347) 123-45-67",
    address: "ул. Октябрьская, 7",
    uniqueText: "Школа барабанов в Уфе",
  },
  {
    slug: "tyumen",
    name: "Тюмень",
    nameIn: "Тюмени",
    phone: "+7 (3452) 12-34-56",
    address: "ул. Республики, 20",
    uniqueText: "Школа барабанов в Тюмени",
  },
  {
    slug: "ilyinskoe-usovo",
    name: "Ильинское-Усово",
    nameIn: "Ильинском-Усово",
    phone: "+7 (495) 111-22-33",
    address: "ул. Новая, 3",
    uniqueText: "Школа барабанов в Ильинском-Усово",
  },
  {
    slug: "krasnoyarsk",
    name: "Красноярск",
    nameIn: "Красноярске",
    phone: "+7 (391) 123-45-67",
    address: "ул. Мира, 15",
    uniqueText: "Школа барабанов в Красноярске",
  },
  {
    slug: "pyatigorsk",
    name: "Пятигорск",
    nameIn: "Пятигорске",
    phone: "+7 (8793) 12-34-56",
    address: "ул. Советская, 8",
    uniqueText: "Школа барабанов в Пятигорске",
  },
  {
    slug: "krasnogorsk",
    name: "Красногорск",
    nameIn: "Красногорске",
    phone: "+7 (495) 222-33-44",
    address: "ул. Лесная, 12",
    uniqueText: "Школа барабанов в Красногорске",
  },
]

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug)
}

export function cityExists(slug: string): boolean {
  return cities.some((city) => city.slug === slug)
}

export function getDefaultCity(): City {
  return cities[0]
} 