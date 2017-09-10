import {
    loadFileAsImage,
    normalizeImage,
    dataUrlToImage,
} from './util/imageManipulation'

import {
    canvasToRImage,
    imageToRImage,
    rImageToCanvas,
} from './util/rImage/toCanvas'

import { drawCircle } from './util/rImage/draw'
import { diff } from './util/rImage/diff'
import { colorDistance } from './util/color'

import { packADN } from './util/pack'
import { encode } from './util/pack/encode'

import { List } from './component/List'
import { h, render } from 'preact'
require('preact/devtools')

const displayColorPalette = PARAM => {
    const L = 10

    const canvas = document.createElement('canvas')
    canvas.width = PARAM.COLOR_PALETTE.length * L
    canvas.height = L

    const ctx = canvas.getContext('2d')

    PARAM.COLOR_PALETTE.forEach((c, i) => {
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`
        ctx.beginPath()
        ctx.rect(i * L, 0, L, L)
        ctx.fill()
    })

    document.body.appendChild(canvas)
}

{
    const u = async () => {
        const path = require('./asset/sample/monalisa-64x64.png')
        console.log(imageToRImage(await dataUrlToImage(path)).join(','))
    }
    u()
}
const printADN = tree =>
    console.log(tree.adn, tree.fitness, encode(packADN(tree.adn)))

let images
const update = () =>
    images &&
    render(
        <List images={images} onClick={printADN} />,
        document.body,
        document.body.children[0]
    )

const parseAncestorTree = (PARAM, a) => ({
    ...a,
    adn: a.adn.map(x => ({
        ...x,
        opacity: PARAM.OPACITY_AVAILABLE[x.opacity],
        r: PARAM.RADIUS_AVAILABLE[x.r],
        color: PARAM.COLOR_PALETTE[x.color],
    })),
    children: a.children.map(t => parseAncestorTree(PARAM, t)),
})

const url = 'https://us-central1-imagedot-179509.cloudfunctions.net/get'
const loop = async () => {
    images = (await (await fetch(url)).json()).map(x => ({
        ...x,
        // ancestorTree: parseAncestorTree(x.PARAM, x.ancestorTree),
    }))

    update()

    loop()
}
loop()
