import { h, Component } from 'preact'

import { Head } from '../Head'
import { Article } from '../Article'

export const App = ({ content }) => (
    <div>
        <Head />
        <Article content={content} />
    </div>
)
