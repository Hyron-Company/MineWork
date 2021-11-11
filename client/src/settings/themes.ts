export type Theme = {
  [variable: string]: string
}

const common: Theme = {
  primaryColor: '#722ed1',
  logoBackground: '#722ed1',
  logoPrimaryText: '#fff',
  logoFont: 'Monda',
  logoRadius: '4px',
  borderRadius: '20px',
  buttonTextColor: '#fff',
  primaryFont: 'Roboto',
  secondaryFont: 'Ubuntu',
  inputPlaceholderColor: '#9a9da8'
}

export const light: Theme = {
  name: 'light',
  secondaryColor: '#646978',
  textColor: '#000',
  background: '#e5e5e5',
  logoSecondaryText: '#070010',
  headerBackground: '',
  shadow: '0px 4px 20px rgba(19, 0, 51, 0.04)',
  inputBackground: '#ececf1',
  sidebarBackground: '#efeff5',
  ...common
}

export const dark: Theme = {
  name: 'dark',
  secondaryColor: '#9a9da8',
  textColor: '#f7f7fa',
  background: '#0b1116',
  logoSecondaryText: '#f7f7fa',
  headerBackground: '',
  shadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
  inputBackground: '#1d1d1f',
  sidebarBackground: '#070c11',
  ...common
}
