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

import * as PARAM from './param'

import { List } from './component/List'
import { FloatingRes } from './component/FloatingRes'
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
    const path = require('./asset/sample/chambre-64x64.png')
    const u = async () => {
        const target = imageToRImage(await dataUrlToImage(path))
        const data = {
            target,
            ancestorTree: {
                adn: [],
                fitness: 999999999999,
                children: [],
            },
            PARAM,
        }
        const s = JSON.stringify(data)

        const t = document.createElement('textarea')
        t.innerHTML = s
        document.body.appendChild(t)
    }
    u()
}

const printADN = (tree, param_) => {
    adn = tree.adn
    param = param_
    update()
}

let images
let adn
let param
const update = () =>
    images &&
    render(
        <div>
            <List images={images} onClick={printADN} />
            <FloatingRes adn={adn} param={param} />
        </div>,
        document.body,
        document.body.children[0]
    )

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

const url = 'https://us-central1-imagedot-179509.cloudfunctions.net/get'
// const url = 'https://storage.googleapis.com/platane-imagedot-result/res.json'
const loop = async () => {
    images = await (await fetch(url)).json()

    update()

    await wait(5000)

    loop()
}
loop()
