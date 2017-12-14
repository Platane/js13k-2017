import preact, { h, render } from 'preact'

import { StateFulApp as App } from './component/App'

import { contents } from './contents'

render(
    <App contents={contents} path="/" />,
    document.body,
    document.body.children[0]
)
