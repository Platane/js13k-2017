import { SIZE } from '../../param'
import { blendColor } from '../color'
import type { RImage, Color } from '../../type'

export const createBlank = (): RImage =>
    clear(Array.from({ length: SIZE * SIZE * 3 }))

export const clear = (arr: RImage): RImage => {
    for (let i = arr.length; i--; ) arr[i] = 255
    return arr
}

export const getColorAt = (a: RImage, x: number, y: number): Color => {
    const k = y * SIZE + x

    return [a[k * 3 + 0], a[k * 3 + 1], a[k * 3 + 2]]
}

export const setColorAt = (a: RImage, x: number, y: number, color: Color) => {
    const k = y * SIZE + x

    a[k * 3 + 0] = color[0]
    a[k * 3 + 1] = color[1]
    a[k * 3 + 2] = color[2]
}

export const drawCircle = (
    a: RImage,
    x: number,
    y: number,
    r: number,
    color: Color,
    opacity: number
) => {
    // prettier-ignore
    for (let ux = Math.max(0, x - r); ux <= Math.min(SIZE - 1, x + r); ux++)
    for (let uy = Math.max(0, y - r); uy <= Math.min(SIZE - 1, y + r); uy++)
        if ((ux - x) * (ux - x) + (uy - y) * (uy - y) <= r * r) {

            const blended = blendColor( getColorAt(a, ux, uy), color, opacity )

            setColorAt(a, ux, uy, blended)
        }
}
