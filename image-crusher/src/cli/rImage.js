const fs = require('fs')
import { PNG } from 'pngjs'
import * as PARAM from '../param'
import type { RImage } from '../type'

export const readAsRImage = (path: string) => {
    const arr = []

    const png = PNG.sync.read(fs.readFileSync(path))

    for (let y = 0; y < PARAM.SIZE; y++)
        for (let x = 0; x < PARAM.SIZE; x++) {
            const k = (y * png.width + x) * 4
            arr.push(png.data[k + 0], png.data[k + 1], png.data[k + 2])
        }

    return arr
}

export const writeRImage = (rImage: RImage, path: string) => {
    const data = []

    for (let i = 0; i < rImage.length; i = i + 3)
        data.push(rImage[i + 0], rImage[i + 1], rImage[i + 2], 255)

    const png = {
        width: PARAM.SIZE,
        height: PARAM.SIZE,
        data,
    }

    var buffer = PNG.sync.write(png)
    fs.writeFileSync(path, buffer)
}
