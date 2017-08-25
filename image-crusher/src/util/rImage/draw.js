import { SIZE } from '../../param'
import type { RImage, Color } from '../../type'

export const createBlank = (): RImage =>
    Array.from({ length: SIZE * SIZE * 3 }, () => 255)

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
    color: Color
) => {
    // prettier-ignore
    for (let ux = Math.max(0, x - r); ux <= Math.min(SIZE - 1, x + r); ux++)
    for (let uy = Math.max(0, y - r); uy <= Math.min(SIZE - 1, y + r); uy++)
        if ((ux - x) * (ux - x) + (uy - y) * (uy - y) <= r * r)
            setColorAt(a, ux, uy, color)
}
