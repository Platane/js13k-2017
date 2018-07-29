import { injectGlobal } from "react-emotion"
import React, { Component } from "react"

export const injectReset = () =>
    injectGlobal`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      h1,h2,h3,h4,p,span{
        line-height: 1.2;
        margin: 0;
      }

      #app,
      html,
      body {
        height: 100%;
        position: relative;
        margin: 0;
        font-family: Lato,Avenir Next,Helvetica Neue,sans-serif;
      }
    `

export const withCssReset = C =>
    class WithCssReset extends Component {
        constructor() {
            super()
            injectReset()
        }

        render() {
            return <C {...this.props} />
        }
    }
