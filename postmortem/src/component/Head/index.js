import { h, Component } from 'preact'
import Helmet from 'preact-helmet'

// base={{ target: '_blank', href: 'http://localhost:8082' }}
export const Head = ({ content }) => (
    <Helmet
        title={`${content.title}`}
        meta={[
            { charset: 'UTF-8' },
            { name: 'description', content: 'Post mortem on a 13kjs entrie' },
            { property: 'og:type', content: 'article' },
        ]}
        link={[
            {
                rel: 'canonical',
                href: 'https://platane.github.io/js13k-2017/postmortem',
            },
        ]}
    />
)
