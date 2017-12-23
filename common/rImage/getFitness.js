import type { Param, ADN, Dot, RImage } from '../type'

import { diff } from './diff'
import { colorDistance } from '../color'

export const getFitness = (size: number, target: RImage, image: RImage) =>
    1 - diff(colorDistance, target, image) / (3 * 255 * 255 * size * size)
