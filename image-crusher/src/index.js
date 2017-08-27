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

import { mutate, initAdn } from './genetic/mutate'
import { getRImage } from './genetic/ADNtoRImage'
import { packADN } from './genetic/packADN'
import { step } from './genetic'

import * as PARAM from './param'

const displayColorPalette = () => {
    const L = 15

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

    document.getElementById('app').appendChild(canvas)
}

const displaySpecimen = adn =>
    document.getElementById('app').appendChild(rImageToCanvas(getRImage(adn)))

const IMAGE_PATH = require('./asset/sample/monalisa-64x64.png')
const run = async () => {
    const target = imageToRImage(await dataUrlToImage(IMAGE_PATH))

    const getFitness = adn => diff(colorDistance, target, getRImage(adn))

    let best = initAdn()
    let bestFitness = getFitness(best)

    let generation = 0
    let improvements = 0

    const step = () => {
        generation++

        const mutated = mutate(best)
        const mutated_fitness = getFitness(mutated)

        if (mutated_fitness < bestFitness) {
            bestFitness = mutated_fitness
            best = mutated
        }
    }

    const loop = () => {
        for (let i = 300; i--; ) step()

        displaySpecimen(best)

        requestAnimationFrame(loop)
    }

    displaySpecimen(best)
    loop()
}

run()
