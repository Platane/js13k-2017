import preact, { h, render } from 'preact'

preact.createElement = preact.h
preact.PropTypes = { func: {} }
preact.Children = { only: arr => (Array.isArray(arr) ? arr[0] : arr) }

const App = require('./component/App').StateFulApp

const { contents } = require('./contents')

render(
    <App contents={contents} path="/" />,
    document.body,
    document.body.children[0]
)
