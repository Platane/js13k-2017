import { loadFileAsImage, normalizeImage } from './util/imageManipulation'

import { canvasToRImage, rImageToCanvas } from './util/rImage/toCanvas'
import { drawCircle } from './util/rImage/draw'
import { diff } from './util/rImage/diff'
import { colorDistance } from './util/color'

import { mutate, initAdn } from './genetic/mutate'
import { getRImage } from './genetic/ADNtoRImage'
import { step } from './genetic'

const input: HTMLElement = document.getElementById('file')
const next_button: HTMLElement = document.getElementById('next')

input.addEventListener('change', async e => {
    // read file as image
    const srcImg = await loadFileAsImage(e.target.files[0])

    // normalize
    const img = normalizeImage(srcImg)

    // extract dataImage
    const rImage = canvasToRImage(img)

    document.getElementById('app').appendChild(rImageToCanvas(rImage))

    // {
    //     const rimg = getRImage(initAdn())
    //     document.getElementById('app').appendChild(rImageToCanvas(rimg))
    //     startGen(rimg)
    // }
    startGen(rImage)
})

const startGen = target => {
    let best = initAdn()

    const s = () =>
        (best = step(
            mutate,
            adn => diff(colorDistance, target, getRImage(adn)),
            best
        ))

    const attachBest = () =>
        document
            .getElementById('app')
            .appendChild(rImageToCanvas(getRImage(best)))

    attachBest()

    next_button.addEventListener('click', () => {
        for (let i = 100; i--; ) s()

        attachBest()
    })

    const loop = () => {
        for (let i = 40; i--; ) s()

        attachBest()

        requestAnimationFrame(loop)
    }

    loop()
}
