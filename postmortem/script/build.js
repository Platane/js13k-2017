import preact, { h } from 'preact'
import render from 'preact-render-to-string'
import { parse } from 'markdown-tocomprehensivedata'
import { toString } from 'markdown-tocomprehensivedata/lib/utils'
import Helmet from 'preact-helmet'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import { promisify } from 'util'

const run = async () => {
    // mokey patch preact
    preact.createElement = preact.h
    preact.PropTypes = { func: {} }
    preact.Children = { only: arr => (Array.isArray(arr) ? arr[0] : arr) }

    const moduleAlias = require('module-alias')
    moduleAlias.addAlias('react', 'preact')
    moduleAlias.addAlias('react-dom', 'preact')

    // load content
    const content = parse(
        fs
            .readFileSync(
                path.resolve(__dirname, '../src/asset/content/index.md')
            )
            .toString()
    )

    // write data
    fs.writeFileSync(
        path.resolve(__dirname, '../dist/content.json'),
        JSON.stringify(content)
    )

    // generate static markup
    const { App } = require('../src/component/App')
    const { ServerStyleSheet } = require('styled-components')

    const sheet = new ServerStyleSheet()
    const app = render(<App content={content} />)
    const style = sheet.getStyleTags()

    const head = Helmet.rewind()

    // generate static assets
    const stats = await promisify(webpack)(require('../webpack.config'))

    const appFileName = stats.compilation.chunks[0].files[0]

    // generate the whole html page
    const html = [
        '<!doctype html>',
        '<html lang="en">',
        `<head>${head.title.toString()}${head.meta.toString()}${head.link.toString()}${style}</head>`,
        `<body>${app}</body>`,
        `<script src="${appFileName}"></script>`,
        '</html>',
    ].join('')

    // write the file
    fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), html)
}

run()
