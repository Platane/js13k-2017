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

import { packADN } from 'common/adn/pack'

import * as PARAM from 'common/param'

import { App } from './component/App'
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

{
    const create = image => async () => {
        const data = {
            target: canvasToRImage(image),
            ancestorTree: {
                adn: [],
                fitness: 999999999999,
                children: [],
            },
            PARAM,
        }

        const token = window.prompt(
            'you are about to create a new image, enter your password, or cancel'
        )

        const url =
            'https://us-central1-imagedot-179509.cloudfunctions.net/create'

        const fetchParam = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(data),
        }

        await fetch(url, fetchParam)
            .then(err => window.alert("created"))
            .catch(err => window.alert("wrong password, or whatever"))

        reload(url_dynamic)
    }

    const t = document.createElement('input')
    t.type = 'file'
    t.onchange = async e => {
        const image = normalizeImage(
            PARAM.SIZE,
            await loadFileAsImage(e.target.files[0])
        )

        image.onclick = create(image)

        document.body.appendChild(image)
    }
    document.body.appendChild(t)
}

let images = []
const update = () =>
    render(<App images={images} />, document.body, document.body.children[0])

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

const url_dynamic = 'https://us-central1-imagedot-179509.cloudfunctions.net/get'
const url_fast =
    'https://storage.googleapis.com/platane-imagedot-result/res.json'

const reload = url =>
    fetch(url)
        .then(res => res.json())
        .then(x => (images = x))
        .then(update)

const loop = () =>
    reload(url_dynamic)
        .then(() => wait(5000))
        .then(loop)

update()
reload(url_fast).then(loop)
