import preact, { h, render } from 'preact'
import { parse } from 'markdown-tocomprehensivedata'

preact.createElement = preact.h
preact.PropTypes = { func: {} }
preact.Children = { only: arr => (Array.isArray(arr) ? arr[0] : arr) }

const App = require('./component/App').App

const content = parse(require('./asset/content/index.md'))

render(<App content={content} />, document.body, document.body.children[0])
