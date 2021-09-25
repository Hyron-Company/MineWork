export type Language = {
  [text: string]: string
}

export type Languages = {
  [language: string]: Language
}

export const RU: Language = {
  find: 'Найти',
  whatSearch: 'Что ищем?',
  subscription: 'Подписка',
  aboutUs: 'О нас',
  login: 'Войти'
}

export const US: Language = {
  find: 'Find',
  whatSearch: 'What to search?',
  subscription: 'Subscribe',
  aboutUs: 'About us',
  login: 'Log In'
}

export const UA: Language = {
  find: 'Знайти',
  whatSearch: 'Що шукаємо?',
  subscription: 'Підписка',
  aboutUs: 'Про нас',
  login: 'Увійти'
}

export const languages: Languages = {
  RU,
  US,
  UA
}
