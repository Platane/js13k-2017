import { h, Component } from 'preact'
import Helmet from 'preact-helmet'

export const Head = ({}) => (
    <Helmet
        title="My Title"
        base={{ target: '_blank', href: 'http://localhost:8082' }}
        meta={[
            { name: 'description', content: 'Helmet application' },
            { property: 'og:type', content: 'article' },
        ]}
        link={[
            { rel: 'canonical', href: 'http://mysite.com/example' },
            {
                rel: 'apple-touch-icon',
                href: 'http://mysite.com/img/apple-touch-icon-57x57.png',
            },
            {
                rel: 'apple-touch-icon',
                sizes: '72x72',
                href: 'http://mysite.com/img/apple-touch-icon-72x72.png',
            },
        ]}
    />
)
