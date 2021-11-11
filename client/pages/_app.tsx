import type { AppProps } from 'next/app'
import { Initialize, ObserveTheme } from '../src/common/main'
import { Header } from '../src/organisms/Header'
import { Sidebar } from '../src/organisms/Sidebar'
import { AppTemplate } from '../src/templates/AppTemplate'
import '../styles/index.scss'

type AppType = (props: AppProps) => JSX.Element

const App: AppType = ({ Component, pageProps }) => {
  Initialize()
  ObserveTheme()

  return <AppTemplate header={<Header />} sidebar={<Sidebar />} page={<Component {...pageProps} />} />
}

export default App
