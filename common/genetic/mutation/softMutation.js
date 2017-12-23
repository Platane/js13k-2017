import { colorDistance } from '../../color'
import { clamp, randInt, pickInArray } from '../../util/math'
import type { ADN, Dot, Param } from 'type'

const mutateDotSoft = (PARAM: Param, dot: Dot): Dot => {
    switch (Math.floor(Math.random() * 7)) {
        // mutate position
        case 6:
        case 5:
        case 4:
        case 0: {
            const dx = randInt(Math.ceil(PARAM.SIZE / 10))
            const dy = randInt(Math.ceil(PARAM.SIZE / 10))

            return {
                ...dot,
                x: clamp(0, PARAM.SIZE - 1, dot.x + dx),
                y: clamp(0, PARAM.SIZE - 1, dot.y + dy),
            }
        }

        // mutate radius
        case 1: {
            for (let k = 20; k--; ) {
                const r = randInt(PARAM.RADIUS_AVAILABLE.length)

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
                opacity: randInt(PARAM.OPACITY_AVAILABLE.length),
            }

        // mutate color
        default:
        case 3: {
            for (let k = 20; k--; ) {
                const color = randInt(PARAM.COLOR_PALETTE.length)

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
    const k = randInt(adn.length)

    return adn.map((dot, i) => (i === k ? mutateDotSoft(PARAM, dot) : dot))
}
