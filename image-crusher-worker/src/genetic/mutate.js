import { colorDistance } from '../util/color'

import type { ADN, Dot, Param } from '../type'

const pickInRange = <T>(arr: Array<T>): T =>
    arr[Math.floor(Math.random() * arr.length)]

const rand = (max, min = 0) => Math.floor(min + Math.random() * (max - min))

const clamp = (min, max, x) => Math.min(max, Math.max(min, x))

const mutateDotHard = (PARAM: Param, dot: Dot): Dot => {
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

const mutateDotSoft = (PARAM: Param, dot: Dot): Dot => {
    switch (Math.floor(Math.random() * 7)) {
        // mutate position
        case 6:
        case 5:
        case 4:
        case 0: {
            const dx = rand(Math.ceil(PARAM.SIZE / 10))
            const dy = rand(Math.ceil(PARAM.SIZE / 10))

            return {
                ...dot,
                x: clamp(0, PARAM.SIZE - 1, dot.x + dx),
                y: clamp(0, PARAM.SIZE - 1, dot.y + dy),
            }
        }

        // mutate radius
        case 1: {
            for (let k = 20; k--; ) {
                const r = rand(PARAM.RADIUS_AVAILABLE.length)

                const d =
                    Math.abs(
                        PARAM.RADIUS_AVAILABLE[r] -
                            PARAM.RADIUS_AVAILABLE[dot.r]
                    ) / PARAM.SIZE

                if (d > 0 && d < 0.2) return { ...dot, r }
            }
            return dot
        }

        // mutate opacity
        case 2:
            return {
                ...dot,
                opacity: rand(PARAM.OPACITY_AVAILABLE.length),
            }

        // mutate color
        default:
        case 3: {
            for (let k = 20; k--; ) {
                const color = rand(PARAM.COLOR_PALETTE.length)

                const d =
                    colorDistance(
                        PARAM.COLOR_PALETTE[dot.color],
                        PARAM.COLOR_PALETTE[color]
                    ) /
                    (255 * 255 * 3)

                if (d > 0 && d < 0.2) return { ...dot, color }
            }
            return dot
        }
    }
}

export const mutateSoft = (PARAM: Param, adn: ADN): ADN => {
    const k = rand(adn.length)

    return adn.map((dot, i) => (i === k ? mutateDotSoft(PARAM, dot) : dot))
}

export const mutateHard = (PARAM: Param, adn: ADN): ADN => {
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
            const k = rand(adn.length)

            return adn.map(
                (dot, i) =>
                    i === k
                        ? u === 0 ? randomDot(PARAM) : mutateDotHard(PARAM, dot)
                        : dot
            )
    }
}

const randomDot = (PARAM: Param): Dot => ({
    color: rand(PARAM.COLOR_PALETTE.length),
    opacity: rand(PARAM.OPACITY_AVAILABLE.length),
    r: rand(PARAM.RADIUS_AVAILABLE.length),
    x: rand(PARAM.SIZE),
    y: rand(PARAM.SIZE),
})

export const initAdn = (PARAM: Param): ADN =>
    Array.from({ length: PARAM.N_CIRCLE }, () => randomDot(PARAM))

export const addGene = (PARAM: Param, ancestor: ADN): ADN | null => {
    if (ancestor.length === PARAM.N_CIRCLE) return null

    const n = 8

    return [...ancestor, ...Array.from({ length: n }, () => randomDot(PARAM))]
}
