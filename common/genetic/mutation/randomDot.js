import { randInt } from '../../util/math'
import type { Dot, Param } from 'type'

export const randomDot = (PARAM: Param): Dot => ({
    color: randInt(PARAM.COLOR_PALETTE.length),
    opacity: randInt(PARAM.OPACITY_AVAILABLE.length),
    r: randInt(PARAM.RADIUS_AVAILABLE.length),
    x: randInt(PARAM.SIZE),
    y: randInt(PARAM.SIZE),
})
