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
    phone: "+7 (4912) 12-34-56",
    address: "ул. Ленина, 5",
    uniqueText: "Школа барабанов в Рязани",
    image: "/images/cities/ryazan.jpg",
  },
  {
    slug: "ufa",
    name: "Уфа",
    nameIn: "Уфе",
    phone: "+7 (347) 123-45-67",
    address: "ул. Октябрьская, 7",
    uniqueText: "Школа барабанов в Уфе",
    image: "/images/cities/ufa.jpg",
  },
  {
    slug: "tyumen",
    name: "Тюмень",
    nameIn: "Тюмени",
    phone: "+7 (3452) 12-34-56",
    address: "ул. Республики, 20",
    uniqueText: "Школа барабанов в Тюмени",
    image: "/images/cities/tyumen.jpg",
  },
  {
    slug: "ilyinskoe-usovo",
    name: "Ильинское-Усово",
    nameIn: "Ильинском-Усово",
    phone: "+7 (495) 111-22-33",
    address: "ул. Новая, 3",
    uniqueText: "Школа барабанов в Ильинском-Усово",
    image: "/images/cities/ilyinskoe.jpg",
  },
  {
    slug: "krasnoyarsk",
    name: "Красноярск",
    nameIn: "Красноярске",
    phone: "+7 (391) 123-45-67",
    address: "ул. Мира, 15",
    uniqueText: "Школа барабанов в Красноярске",
    image: "/images/cities/krasnoyarsk.jpg",
  },
  {
    slug: "pyatigorsk",
    name: "Пятигорск",
    nameIn: "Пятигорске",
    phone: "+7 (8793) 12-34-56",
    address: "ул. Советская, 8",
    uniqueText: "Школа барабанов в Пятигорске",
    image: "/images/cities/pyatigorsk.jpg",
  },
  {
    slug: "krasnogorsk",
    name: "Красногорск",
    nameIn: "Красногорске",
    phone: "+7 (495) 222-33-44",
    address: "ул. Лесная, 12",
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
  {
    slug: "abakan",
    name: "Абакан",
    nameIn: "Абакане",
  },
  {
    slug: "almetyevsk",
    name: "Альметьевск",
    nameIn: "Альметьевске",
  },
  {
    slug: "anapa",
    name: "Анапа",
    nameIn: "Анапе",
  },
  {
    slug: "angarsk",
    name: "Ангарск",
    nameIn: "Ангарске",
  },
  {
    slug: "arkhangelsk",
    name: "Архангельск",
    nameIn: "Архангельске",
  },
  {
    slug: "astrakhan",
    name: "Астрахань",
    nameIn: "Астрахани",
  },
  {
    slug: "blagoveshchensk",
    name: "Благовещенск",
    nameIn: "Благовещенске",
  },
  {
    slug: "bryansk",
    name: "Брянск",
    nameIn: "Брянске",
  },
  {
    slug: "velikiy-novgorod",
    name: "Великий Новгород",
    nameIn: "Великом Новгороде",
  },
  {
    slug: "vladimir",
    name: "Владимир",
    nameIn: "Владимире",
  },
  {
    slug: "volgograd",
    name: "Волгоград",
    nameIn: "Волгограде",
  },
  {
    slug: "vologda",
    name: "Вологда",
    nameIn: "Вологде",
  },
  {
    slug: "vsevolozhsk",
    name: "Всеволожск",
    nameIn: "Всеволожске",
  },
  {
    slug: "gatcina",
    name: "Гатчина",
    nameIn: "Гатчине",
  },
  {
    slug: "domodedovo",
    name: "Домодедово",
    nameIn: "Домодедово",
  },
  {
    slug: "zhukovskiy",
    name: "Жуковский",
    nameIn: "Жуковском",
  },
  {
    slug: "zvenigorod",
    name: "Звенигород",
    nameIn: "Звенигороде",
  },
  {
    slug: "ivanovo",
    name: "Иваново",
    nameIn: "Иваново",
  },
  {
    slug: "izhevsk",
    name: "Ижевск",
    nameIn: "Ижевске",
  },
  {
    slug: "yoshkar-ola",
    name: "Йошкар-Ола",
    nameIn: "Йошкар-Оле",
  },
  {
    slug: "kazan",
    name: "Казань",
    nameIn: "Казани",
  },
  {
    slug: "kaliningrad",
    name: "Калининград",
    nameIn: "Калининграде",
  },
  {
    slug: "kaluga",
    name: "Калуга",
    nameIn: "Калуге",
  },
  {
    slug: "kemerovo",
    name: "Кемерово",
    nameIn: "Кемерово",
  },
  {
    slug: "kirov",
    name: "Киров",
    nameIn: "Кирове",
  },
  {
    slug: "klin",
    name: "Клин",
    nameIn: "Клину",
  },
  {
    slug: "kolpino",
    name: "Колпино",
    nameIn: "Колпино",
  },
  {
    slug: "kommunarka",
    name: "Коммунарка",
    nameIn: "Коммунарке",
  },
  {
    slug: "korolev",
    name: "Королёв",
    nameIn: "Королёве",
  },
  {
    slug: "kostroma",
    name: "Кострома",
    nameIn: "Костроме",
  },
  {
    slug: "kurgan",
    name: "Курган",
    nameIn: "Кургане",
  },
  {
    slug: "kursk",
    name: "Курск",
    nameIn: "Курске",
  },
  {
    slug: "lipetsk",
    name: "Липецк",
    nameIn: "Липецке",
  },
  {
    slug: "lobnya",
    name: "Лобня",
    nameIn: "Лобне",
  },
  {
    slug: "lyubertsy",
    name: "Люберцы",
    nameIn: "Люберцах",
  },
  {
    slug: "magnitogorsk",
    name: "Магнитогорск",
    nameIn: "Магнитогорске",
  },
  {
    slug: "minsk",
    name: "Минск",
    nameIn: "Минске",
  },
  {
    slug: "murino",
    name: "Мурино",
    nameIn: "Мурино",
  },
  {
    slug: "murmansk",
    name: "Мурманск",
    nameIn: "Мурманске",
  },
  {
    slug: "naberezhnye-chelny",
    name: "Набережные Челны",
    nameIn: "Набережных Челнах",
  },
  {
    slug: "naro-fominsk",
    name: "Наро-Фоминск",
    nameIn: "Наро-Фоминске",
  },
  {
    slug: "nevinnomyssk",
    name: "Невинномысск",
    nameIn: "Невинномысске",
  },
  {
    slug: "nizhniy-novgorod",
    name: "Нижний Новгород",
    nameIn: "Нижнем Новгороде",
  },
  {
    slug: "nizhniy-tagil",
    name: "Нижний Тагил",
    nameIn: "Нижнем Тагиле",
  },
  {
    slug: "novokuznetsk",
    name: "Новокузнецк",
    nameIn: "Новокузнецке",
  },
  {
    slug: "novorossiysk",
    name: "Новороссийск",
    nameIn: "Новороссийске",
  },
  {
    slug: "novosibirsk",
    name: "Новосибирск",
    nameIn: "Новосибирске",
  },
  {
    slug: "noginsk",
    name: "Ногинск",
    nameIn: "Ногинске",
  },
  {
    slug: "odintsovo",
    name: "Одинцово",
    nameIn: "Одинцово",
  },
  {
    slug: "omsk",
    name: "Омск",
    nameIn: "Омске",
  },
  {
    slug: "orel",
    name: "Орёл",
    nameIn: "Орле",
  },
  {
    slug: "orenburg",
    name: "Оренбург",
    nameIn: "Оренбурге",
  },
  {
    slug: "penza",
    name: "Пенза",
    nameIn: "Пензе",
  },
  {
    slug: "perm",
    name: "Пермь",
    nameIn: "Перми",
  },
  {
    slug: "petrozavodsk",
    name: "Петрозаводск",
    nameIn: "Петрозаводске",
  },
  {
    slug: "petropavlovsk-kamchatsky",
    name: "Петропавловск-Камчатский",
    nameIn: "Петропавловске-Камчатском",
  },
  {
    slug: "podolsk",
    name: "Подольск",
    nameIn: "Подольске",
  },
  {
    slug: "pushkin",
    name: "Пушкин",
    nameIn: "Пушкине",
  },
  {
    slug: "pushkino",
    name: "Пушкино",
    nameIn: "Пушкино",
  },
  {
    slug: "rostov-na-donu",
    name: "Ростов-на-Дону",
    nameIn: "Ростове-на-Дону",
  },
  {
    slug: "rybinsk",
    name: "Рыбинск",
    nameIn: "Рыбинске",
  },
  {
    slug: "samara",
    name: "Самара",
    nameIn: "Самаре",
  },
  {
    slug: "saransk",
    name: "Саранск",
    nameIn: "Саранске",
  },
  {
    slug: "saratov",
    name: "Саратов",
    nameIn: "Саратове",
  },
  {
    slug: "sevastopol",
    name: "Севастополь",
    nameIn: "Севастополе",
  },
  {
    slug: "severodvinsk",
    name: "Северодвинск",
    nameIn: "Северодвинске",
  },
  {
    slug: "sergiev-posad",
    name: "Сергиев Посад",
    nameIn: "Сергиевом Посаде",
  },
  {
    slug: "simferopol",
    name: "Симферополь",
    nameIn: "Симферополе",
  },
  {
    slug: "sochi",
    name: "Сочи",
    nameIn: "Сочи",
  },
  {
    slug: "stavropol",
    name: "Ставрополь",
    nameIn: "Ставрополе",
  },
  {
    slug: "syktyvkar",
    name: "Сыктывкар",
    nameIn: "Сыктывкаре",
  },
  {
    slug: "tambov",
    name: "Тамбов",
    nameIn: "Тамбове",
  },
  {
    slug: "tver",
    name: "Тверь",
    nameIn: "Твери",
  },
  {
    slug: "tolyatti",
    name: "Тольятти",
    nameIn: "Тольятти",
  },
  {
    slug: "tomsk",
    name: "Томск",
    nameIn: "Томске",
  },
  {
    slug: "troitsk",
    name: "Троицк",
    nameIn: "Троицке",
  },
  {
    slug: "tula",
    name: "Тула",
    nameIn: "Туле",
  },
  {
    slug: "ulan-ude",
    name: "Улан-Удэ",
    nameIn: "Улан-Удэ",
  },
  {
    slug: "ulyanovsk",
    name: "Ульяновск",
    nameIn: "Ульяновске",
  },
  {
    slug: "ussuriysk",
    name: "Уссурийск",
    nameIn: "Уссурийске",
  },
  {
    slug: "ukhta",
    name: "Ухта",
    nameIn: "Ухте",
  },
  {
    slug: "khanty-mansiysk",
    name: "Ханты-Мансийск",
    nameIn: "Ханты-Мансийске",
  },
  {
    slug: "khimki",
    name: "Химки",
    nameIn: "Химках",
  },
  {
    slug: "cheboksary",
    name: "Чебоксары",
    nameIn: "Чебоксарах",
  },
  {
    slug: "chelyabinsk",
    name: "Челябинск",
    nameIn: "Челябинске",
  },
  {
    slug: "cherepovets",
    name: "Череповец",
    nameIn: "Череповце",
  },
  {
    slug: "chita",
    name: "Чита",
    nameIn: "Чите",
  },
  {
    slug: "shymkent",
    name: "Шымкент",
    nameIn: "Шымкенте",
  },
  {
    slug: "shchyolkovo",
    name: "Щёлково",
    nameIn: "Щёлково",
  },
  {
    slug: "engels",
    name: "Энгельс",
    nameIn: "Энгельсе",
  },
  {
    slug: "yakutsk",
    name: "Якутск",
    nameIn: "Якутске",
  },
  {
    slug: "yalta",
    name: "Ялта",
    nameIn: "Ялте",
  },
  {
    slug: "yaroslavl",
    name: "Ярославль",
    nameIn: "Ярославле",
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