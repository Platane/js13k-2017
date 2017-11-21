import { injectGlobal } from 'styled-components'

export default () => injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
  }

  body {
    position: relative;
    margin: 0;
}
`
