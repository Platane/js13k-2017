import type { Color } from '../type'

export const colorDistance = (a: Color, b: Color): number => {
    const c0 = a[0] - b[0]
    const c1 = a[1] - b[1]
    const c2 = a[2] - b[2]

    return c0 * c0 + c1 * c1 + c2 * c2
}

export const blendColor = (a: Color, b: Color, k: number): Color => [
    a[0] * (1 - k) + b[0] * k,
    a[1] * (1 - k) + b[1] * k,
    a[2] * (1 - k) + b[2] * k,
]
