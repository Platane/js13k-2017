import preact, { h } from 'preact'
import render from 'preact-render-to-string'
import { parse } from 'markdown-tocomprehensivedata'
import { toString } from 'markdown-tocomprehensivedata/lib/utils'
import Helmet from 'preact-helmet'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import { promisify } from 'util'

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
    // mokey patch preact
    preact.createElement = preact.h
    preact.PropTypes = { func: {} }
    preact.Children = { only: arr => (Array.isArray(arr) ? arr[0] : arr) }

    const moduleAlias = require('module-alias')
    moduleAlias.addAlias('react', 'preact')
    moduleAlias.addAlias('react-dom', 'preact')

    // load contents
    const contents = getContents()

    const appFileName =
        (process.env.PATHNAME_BASE || '/') + assetManifest['app.js']

    // generate static markup
    const App = require('../src/component/App').StateFulApp
    const { ServerStyleSheet } = require('styled-components')

    const renderPage = path => {
        const sheet = new ServerStyleSheet()
        const app = render(<App contents={contents} path={path} />)
        const style = sheet.getStyleTags()

        const head = Helmet.rewind()

        // generate the whole html page
        const html = [
            '<!doctype html>',
            '<html lang="en">',
            `<head>`,
            head.title.toString(),
            head.meta.toString(),
            head.link.toString(),
            style,
            `</head>`,
            `<body>${app}</body>`,
            `<script src="${appFileName}"></script>`,
            '</html>',
        ].join('')

        return html
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
