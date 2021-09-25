import type { AppProps } from 'next/app'
import React from 'react'
import { Initialize, ObserveTheme } from '../src/common/main'
import { Header } from '../src/organisms/Header'
import '../styles/index.scss'

type AppType = (properties: AppProps) => JSX.Element

const App: AppType = ({ Component, pageProps }) => {
  Initialize()
  ObserveTheme()

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
export default App
