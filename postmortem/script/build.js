import preact, { h } from 'preact'
import render from 'preact-render-to-string'
import { parse } from 'markdown-tocomprehensivedata'
import Helmet from 'preact-helmet'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import { promisify } from 'util'
import { extractCritical } from 'emotion-server'

const moduleAlias = require('module-alias')
moduleAlias.addAlias('react', 'preact')
moduleAlias.addAlias('react-dom', 'preact')

const App = require('../src/component/App').StateFulApp

const loadContentAsJson = url => parse(fs.readFileSync(url).toString())

const getContents = () => {
    const formatUrl = filename =>
        path.resolve(__dirname, '../src/asset/content/', filename)

    return {
        '/': loadContentAsJson(formatUrl('summary.md')),
        '/image-processing': loadContentAsJson(
            formatUrl('image-processing.md')
        ),
        '/original-idea-and-gameplay': loadContentAsJson(
            formatUrl('original-idea-and-gameplay.md')
        ),
    }
}

const assetManifest = require('../dist/assetManifest.json')

const run = async () => {
    // load contents
    const contents = getContents()

    const appFileName =
        (process.env.PATHNAME_BASE || '/') + assetManifest['app.js']

    // generate static markup

    const renderPage = path => {
        const { html, ids, css } = extractCritical(
            render(<App contents={contents} path={path} />)
        )

        const head = Helmet.rewind()

        // generate the whole html page
        return [
            '<!doctype html>',
            '<html lang="en">',
            `<head>`,
            head.title.toString(),
            head.meta.toString(),
            head.link.toString(),
            `<style>${css}</style>`,
            `</head>`,
            `<body>${html}</body>`,
            `<script src="${appFileName}"></script>`,
            `<script>window.__emotion_ids=[${ids
                .map(x => `'${x}'`)
                .join(',')}]</script>`,
            '</html>',
        ].join('')
    }

    // render and write the pages
    Object.keys(contents).forEach(url =>
        fs.writeFileSync(
            path.resolve(
                __dirname,
                '../dist',
                (url === '/' ? 'index' : url.slice(1)) + '.html'
            ),
            renderPage(url)
        )
    )
}

run()
