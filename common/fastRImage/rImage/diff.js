import type { RImage } from 'type'

type RImageFlat = RImage

export const diffWithFlat = (flatTarget: RImageFlat, rImage: RImage) => {
    let error = 0

    for (let k = rImage.length / 4; k--; ) {
        // flatten
        const o = rImage[k * 4 + 3] / 255

        const r = 0 | (rImage[k * 4 + 0] * o + 255 * (1 - o))
        const g = 0 | (rImage[k * 4 + 1] * o + 255 * (1 - o))
        const b = 0 | (rImage[k * 4 + 2] * o + 255 * (1 - o))

        const r_ = r - flatTarget[k * 3 + 0]
        const g_ = g - flatTarget[k * 3 + 1]
        const b_ = b - flatTarget[k * 3 + 2]

        error += r_ * r_ + g_ * g_ + b_ * b_
    }

    return error
}

export const getFitness = (flatTarget: RImageFlat, rImage: RImage) => {
    const s = Math.sqrt(rImage.length / 4)

    return 1 - diffWithFlat(flatTarget, rImage) / (s * s * 3 * 255 * 255)
}
