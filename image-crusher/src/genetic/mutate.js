import * as PARAM from '../param'
import { colorDistance } from '../util/color'

import type { ADN, Dot } from './type'

const pickInRange = <T>(arr: Array<T>): T =>
    arr[Math.floor(Math.random() * arr.length)]

const rand = (max, min = 0) => Math.floor(min + Math.random() * (max - min))

const clamp = (min, max, x) => Math.min(max, Math.max(min, x))

const mutateDot = (dot: Dot): Dot => {
    switch (Math.floor(Math.random() * 7)) {
        // mutate position
        case 6:
        case 5:
        case 4:
        case 0: {
            const dx = rand(PARAM.POSITION_DELTA)
            const dy = rand(PARAM.POSITION_DELTA)

            return {
                ...dot,
                x: clamp(0, PARAM.SIZE - 1, dot.x + dx),
                y: clamp(0, PARAM.SIZE - 1, dot.y + dy),
            }
        }

        // mutate radius
        case 1:
            return {
                ...dot,
                r: rand(PARAM.RADIUS_AVAILABLE.length),
            }

        // mutate opacity
        case 2:
            return {
                ...dot,
                opacity: rand(PARAM.OPACITY_AVAILABLE.length),
            }

        // mutate color
        default:
            return {
                ...dot,
                color: rand(PARAM.COLOR_PALETTE.length),
            }
        // case 3: {
        //     for (let k = 20; k--; ) {
        //         const color = rand(PARAM.COLOR_PALETTE.length)
        //
        //         const d =
        //             colorDistance(PARAM.COLOR_PALETTE[dot.color], PARAM.COLOR_PALETTE[color]) /
        //             (255 * 255 + 255 * 255 + 255 * 255)
        //
        //         if (d > 0 && d < 0.2) return { ...dot, color }
        //     }
        //     return dot
        // }
    }
}

export const mutate = (adn: ADN): ADN => {
    const u = rand(10)
    switch (u) {
        case 1:
            // permutation
            const a = Math.floor(adn.length * Math.random())
            const b = Math.floor(adn.length * Math.random())

            return adn.map((dot, i) => {
                if (a === i) return adn[b]

                if (b === i) return adn[a]

                return dot
            })

        default:
            const k = Math.floor(adn.length * Math.random())

            return adn.map(
                (dot, i) =>
                    i === k ? (u === 0 ? randomDot() : mutateDot(dot)) : dot
            )
    }
}

const randomDot = (): Dot => ({
    color: rand(PARAM.COLOR_PALETTE.length),
    opacity: rand(PARAM.OPACITY_AVAILABLE.length),
    r: rand(PARAM.RADIUS_AVAILABLE.length),
    x: rand(PARAM.SIZE),
    y: rand(PARAM.SIZE),
})

export const initAdn = (): ADN =>
    Array.from({ length: PARAM.N_CIRCLE }, randomDot)
