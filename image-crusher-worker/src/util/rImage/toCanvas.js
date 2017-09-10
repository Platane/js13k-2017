import { SIZE } from '../../param'
import type { RImage } from '../../type'

export const canvasToRImage = canvas => {
    const ctx = canvas.getContext('2d')

    const arr = []

    const data = ctx.getImageData(0, 0, SIZE, SIZE).data

    for (let i = 0; i < data.length / 4; i++)
        arr.push(data[i * 4 + 0], data[i * 4 + 1], data[i * 4 + 2])

    return arr
}

export const imageToRImage = image => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = SIZE

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, SIZE, SIZE)

    return canvasToRImage(canvas)
}

export const rImageToCanvas = (a: RImage, canvas) => {
    if (!canvas) canvas = document.createElement('canvas')

    canvas.width = canvas.height = SIZE

    const ctx = canvas.getContext('2d')

    const imgData = ctx.getImageData(0, 0, SIZE, SIZE)

    for (let i = SIZE * SIZE; i--; ) {
        imgData.data[i * 4 + 0] = a[i * 3 + 0]
        imgData.data[i * 4 + 1] = a[i * 3 + 1]
        imgData.data[i * 4 + 2] = a[i * 3 + 2]
        imgData.data[i * 4 + 3] = 255
    }

    ctx.putImageData(imgData, 0, 0)

    return canvas
}
