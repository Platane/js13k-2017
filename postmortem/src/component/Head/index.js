import { h, Component } from 'preact'
import Helmet from 'preact-helmet'

import image_large from '../../asset/image/header.jpg'
import image from '../../asset/image/game.jpg'
import image_painting from '../../asset/image/monalisa-crushed.jpg'

export const Head = ({ content, path }) => {
    const url = `https://platane.github.io/js13k-2017/postmortem${path}`

    const title =
        path === '/' ? content.title : `Vernissage! - ${content.title}`

    const description =
        "Post-mortem about platane's 13kjs game entry: Vernissage"

    return (
        <Helmet
            title={title}
            meta={[
                { charset: 'UTF-8' },

                { name: 'description', content: description },

                { name: 'twitter:creator', content: 'platane_' },
                { name: 'twitter:url', content: url },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                {
                    name: 'twitter:image',
                    content: `https://platane.github.io${image_painting}`,
                },

                { property: 'og:description', content: description },
                { property: 'og:type', content: 'article' },
                { property: 'og:url', content: url },
                {
                    property: 'og:image',
                    content: `https://platane.github.io${image}`,
                },
            ]}
            link={[
                {
                    rel: 'canonical',
                    href: url,
                },
            ]}
        />
    )
}
