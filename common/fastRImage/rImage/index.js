import type { Dot, RImage } from 'type'

export const create = (size: number) =>
    new Uint8Array(size * size * 4).map(() => 0)

// paint a over b
export const compose = (b: RImage, a: RImage, target: RImage) => {
    for (let k = 0; k < a.length; k += 4) {
        // "over" composing operation
        // https://en.wikipedia.org/wiki/Alpha_compositing

        const oa = a[k + 3] / 255
        const ob = b[k + 3] / 255

        const ot = oa + ob * (1 - oa)

        target[k + 0] = 0 | ((a[k + 0] * oa + b[k + 0] * ob * (1 - oa)) / ot)
        target[k + 1] = 0 | ((a[k + 1] * oa + b[k + 1] * ob * (1 - oa)) / ot)
        target[k + 2] = 0 | ((a[k + 2] * oa + b[k + 2] * ob * (1 - oa)) / ot)
        target[k + 3] = 0 | (ot * 255)
    }

    return target
}

export const drawDiskOnBlank = (
    size: number,
    x: number,
    y: number,
    r: number,
    color: Color,
    opacity: number,
    rImage: RImage
) => {
    const max_x = Math.min(size - 1, x + r)
    const max_y = Math.min(size - 1, y + r)

    const min_x = Math.max(0, x - r)
    const min_y = Math.max(0, y - r)

    // prettier-ignore
    for (let ux = min_x; ux <= max_x; ux++)
    for (let uy = min_y; uy <= max_y; uy++) {
        const ur = (ux - x) * (ux - x) + (uy - y) * (uy - y)

        if (ur < r * r) {
            const k = (uy * size + ux)*4

            rImage[k + 0] = color[0]
            rImage[k + 1] = color[1]
            rImage[k + 2] = color[2]
            rImage[k + 3] = opacity
        }
    }
}

export const drawDotOnBlank = (param: PARAM, dot: Dot, rImage: RImage) =>
    drawDiskOnBlank(
        param.SIZE,
        dot.x,
        dot.y,
        param.RADIUS_AVAILABLE[dot.r],
        param.COLOR_PALETTE[dot.color],
        0 | (param.OPACITY_AVAILABLE[dot.opacity] * 255),
        rImage
    )
