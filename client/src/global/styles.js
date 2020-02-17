import styledNormalize from 'styled-normalize'
import { themeDefault } from '../themes/default.theme'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  html{
      width: 100%;
      font-size: 16px;
      @media screen and (max-width: 576px){
        font-size: 14px;
      }
  }
  body {
      font-family: ${themeDefault.font.type};
      -webkit-font-smoothing: antialiased;
      position: relative;
      width: 100%;
      background-color:  ${themeDefault.color.primary};
      margin: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input, textarea{
      outline: none;
  }
  * {
    font-variant-ligatures: no-common-ligatures;
  }
    .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 0;
  }
`

export default GlobalStyle
