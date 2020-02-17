import App from 'next/app'
import React from 'react'

import { ThemeProvider } from 'styled-components'
import { themeDefault } from '../client/src/themes/default.theme'
import { Provider } from 'react-redux'
import GlobalStyle from '../client/src/global'
import Head from 'next/head'

import { initStore } from '../client/src/store'
import withRedux from 'next-redux-wrapper'
import redusers from '../client/src/store/reduces'

if (typeof window === 'undefined') {
  global.window = {}
}

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
      return { pageProps }
    }

    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Provider store={store}>
          <GlobalStyle />
          <ThemeProvider theme={themeDefault}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      )
    }
  }
)
