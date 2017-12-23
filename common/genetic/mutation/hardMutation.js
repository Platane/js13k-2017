import { clamp, randInt, pickInArray } from '../../util/math'
import { randomDot } from './randomDot'
import type { ADN, Dot, Param } from 'type'

const mutateDotHard = (PARAM: Param, dot: Dot): Dot => {
    switch (Math.floor(Math.random() * 7)) {
        // mutate position
        case 6:
        case 5:
        case 4:
        case 0: {
            const dx = randInt(PARAM.POSITION_DELTA)
            const dy = randInt(PARAM.POSITION_DELTA)

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
                r: randInt(PARAM.RADIUS_AVAILABLE.length),
            }

        // mutate opacity
        case 2:
            return {
                ...dot,
                opacity: randInt(PARAM.OPACITY_AVAILABLE.length),
            }

        // mutate color
        default:
            return {
                ...dot,
                color: randInt(PARAM.COLOR_PALETTE.length),
            }
    }
}

export const mutateHard = (PARAM: Param, adn: ADN): ADN => {
    const u = randInt(10)
    switch (u) {
        case 1: {
            // permutation
            const a = Math.floor(adn.length * Math.random())
            const b = Math.floor(adn.length * Math.random())

            return adn.map((dot, i) => {
                if (a === i) return adn[b]

                if (b === i) return adn[a]

                return dot
            })
        }
        case 2: {
            // permutation + random
            const a = Math.floor(adn.length * Math.random())
            const b = Math.floor(adn.length * Math.random())

            return adn.map((dot, i) => {
                if (a === i) return adn[b]

                if (b === i) return randomDot(PARAM)

                return dot
            })
        }
        default:
            const k = randInt(adn.length)

            return adn.map(
                (dot, i) =>
                    i === k
                        ? u === 0 ? randomDot(PARAM) : mutateDotHard(PARAM, dot)
                        : dot
            )
    }
}
