import {
    loadFileAsImage,
    normalizeImage,
    dataUrlToImage,
} from './util/imageManipulation'

import {
    canvasToRImage,
    rImageToCanvas,
    imageToRImage,
} from './util/rImage/toCanvas'
import { drawCircle } from './util/rImage/draw'
import { diff } from './util/rImage/diff'
import { colorDistance } from './util/color'

import { mutate, initAdn, addGene } from './genetic/mutate'
import { getRImage } from './genetic/ADNtoRImage'
import { run as runGenetic } from './genetic/run'
import { packADN } from './genetic/pack'

import { AncestorTree } from './component/AncestorTree'
import { h, render } from 'preact'
require('preact/devtools')

import * as PARAM from './param'

const displayColorPalette = () => {
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
displayColorPalette()

const IMAGE_PATH = require('./asset/sample/monalisa-64x64.png')
// const IMAGE_PATH = require('./asset/sample/love-64x64.png')

const printADN = tree =>
    console.log(tree.adn, tree.fitness, packADN(tree.adn).toString(34))

const run = async () => {
    const target = imageToRImage(await dataUrlToImage(IMAGE_PATH))

    document.body.appendChild(rImageToCanvas(target))

    const getFitness = adn => diff(colorDistance, target, getRImage(adn))

    const log = tree =>
        render(
            <AncestorTree ancestorTree={tree} onClick={printADN} />,
            document.body,
            document.body.children[0]
        )

    const res = await runGenetic(mutate, getFitness, addGene, log)
}

run()
