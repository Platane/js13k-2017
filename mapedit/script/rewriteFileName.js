const fs = require('fs')
const path = require('path')

const assetManifest = require('../dist/assetManifest.json')

const pathIndex = assetManifest['index.js']

const PATHNAME_BASE = process.env.PATHNAME_BASE || '/'

const replaceFileName = s =>
    s
        .replace('/index.html', PATHNAME_BASE + 'index.html')
        .replace('/manifest.json', PATHNAME_BASE + 'manifest.json')
        .replace('/icon16x16.png', PATHNAME_BASE + 'icon16x16.png')
        .replace('/icon32x32.png', PATHNAME_BASE + 'icon32x32.png')
        .replace('/icon192x192.png', PATHNAME_BASE + 'icon192x192.png')
        .replace('/index.js', PATHNAME_BASE + pathIndex)
        .replace('__root', PATHNAME_BASE)

// replace filename in index.html
{
    const content = replaceFileName(
        fs.readFileSync(path.resolve(__dirname, '../src/index.html')).toString()
    )

    fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
    fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
}

// replace filename in index.js
{
    const content = replaceFileName(
        fs
            .readFileSync(path.resolve(__dirname, '../dist/' + pathIndex))
            .toString()
    )

    fs.writeFileSync(path.resolve(__dirname, '../dist/' + pathIndex), content)
}
