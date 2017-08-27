import * as PARAM from '../param'
import { colorDistance } from '../util/color'

import type { ADN, Dot } from './type'

const pickInRange = <T>(arr: Array<T>): T =>
    arr[Math.floor(Math.random() * arr.length)]

const mutateValueInRange = <T>(
    availables: Array<T>,
    value: T,
    l: number
): T => {
    const i = availables.indexOf(value)

    const d =
        (Math.floor(Math.random() * l) + 1) * (Math.random() < 0.5 ? 1 : -1)

    return availables[Math.min(availables.length - 1, Math.max(0, i + d))]
}

const mutateDot = (dot: Dot): Dot => {
    switch (Math.floor(Math.random() * 7)) {
        // mutate position
        case 6:
        case 5:
        case 4:
        case 0: {
            const dx = Math.floor(Math.random() * PARAM.POSITION_DELTA)
            const dy = Math.floor(Math.random() * PARAM.POSITION_DELTA)

            return {
                ...dot,
                x: Math.min(PARAM.SIZE - 1, Math.max(0, dot.x + dx)),
                y: Math.min(PARAM.SIZE - 1, Math.max(0, dot.y + dy)),
            }
        }

        // mutate radius
        case 1:
            return {
                ...dot,
                r: mutateValueInRange(
                    PARAM.RADIUS_AVAILABLE,
                    dot.r,
                    PARAM.RADIUS_AVAILABLE.length * 0.2
                ),
            }

        // mutate opacity
        case 2:
            return {
                ...dot,
                opacity: mutateValueInRange(
                    PARAM.OPACITY_AVAILABLE,
                    dot.opacity,
                    PARAM.OPACITY_AVAILABLE.length * 0.2
                ),
            }

        // mutate color
        default:
        case 3: {
            for (let k = 20; k--; ) {
                const color = pickInRange(PARAM.COLOR_PALETTE)

                const d =
                    colorDistance(dot.color, color) /
                    (255 * 255 + 255 * 255 + 255 * 255)

                if (d > 0 && d < 0.2) return { ...dot, color }
            }
            return dot
        }
    }
}

export const mutate = (adn: ADN): ADN => {
    if (Math.random() > 0.1) {
        const k = Math.floor(adn.length * Math.random())

        return adn.map((dot, i) => (i === k ? mutateDot(dot) : dot))
    } else {
        // permutation
        const a = Math.floor(adn.length * Math.random())
        const b = Math.floor(adn.length * Math.random())

        return adn.map((dot, i) => {
            if (a === i) return adn[b]

            if (b === i) return adn[a]

            return dot
        })
    }
}

export const initAdn = (): ADN =>
    Array.from({ length: PARAM.N_CIRCLE }, () => ({
        color: pickInRange(PARAM.COLOR_PALETTE),
        opacity: pickInRange(PARAM.OPACITY_AVAILABLE),
        r: pickInRange(PARAM.RADIUS_AVAILABLE),
        x: Math.floor(Math.random() * PARAM.SIZE),
        y: Math.floor(Math.random() * PARAM.SIZE),
    }))
