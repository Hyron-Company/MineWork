import type { AppProps } from 'next/app'
import React from 'react'
import { Initialize, ObserveTheme } from '../src/common/main'
import { Header } from '../src/organisms/Header'
import { AuthorizationDialog } from '../src/organisms/dialogs/AuthorizationDialog'
import '../styles/index.scss'

type AppType = (properties: AppProps) => JSX.Element

const App: AppType = ({ Component, pageProps }) => {
  Initialize()
  ObserveTheme()

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <AuthorizationDialog />
    </>
  )
}
export default App
