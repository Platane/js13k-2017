import type { Color } from '../type'

export const colorDistance = (a: Color, b: Color): number =>
    [0, 1, 2].reduce((s, i) => s + Math.abs(a[i] - b[i]), 0) / (255 * 3)
