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

// const displayColorPalette = PARAM => {
//     const L = 10
//
//     const canvas = document.createElement('canvas')
//     canvas.width = PARAM.COLOR_PALETTE.length * L
//     canvas.height = L
//
//     const ctx = canvas.getContext('2d')
//
//     PARAM.COLOR_PALETTE.forEach((c, i) => {
//         ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`
//         ctx.beginPath()
//         ctx.rect(i * L, 0, L, L)
//         ctx.fill()
//     })
//
//     document.body.appendChild(canvas)
// }

// display the initial state in a textarea
// {
//     const path = require('./asset/sample/chambre-64x64.png')
//     const u = async () => {
//         const target = imageToRImage(await dataUrlToImage(path))
//         const data = {
//             target,
//             ancestorTree: {
//                 adn: [],
//                 fitness: 999999999999,
//                 children: [],
//             },
//             PARAM,
//         }
//         const s = JSON.stringify(data)
//
//         const t = document.createElement('textarea')
//         t.innerHTML = s
//         document.body.appendChild(t)
//     }
//     u()
// }

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

    // const getDeepest = x =>
    //     x.children.reduce((max, c) => Math.max(max, getDeepest(c)), 0) + 1
    //
    // const elegate = x => {
    //     const bestChildren = x.children.reduce(
    //         (best, c) => (!best || getDeepest(best) < getDeepest(c) ? c : best),
    //         null
    //     )
    //
    //     const children = bestChildren ? [bestChildren] : []
    //
    //     children.push(
    //         ...x.children.filter(x => x !== bestChildren && Math.random() > 0.8)
    //     )
    //
    //     return { ...x, children: children.map(elegate) }
    // }
    //
    // images = images.map(x => ({ ...x, ancestorTree: elegate(x.ancestorTree) }))

    update()

    // await wait(5000)

    // loop()
}
loop()
