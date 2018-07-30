import type { Color } from '../type'

export const colorDistance = (a: Color, b: Color): number => {
    const c0 = a[0] - b[0]
    const c1 = a[1] - b[1]
    const c2 = a[2] - b[2]

    return c0 * c0 + c1 * c1 + c2 * c2
}

export const blendColor = (a: Color, b: Color, k: number): Color => [
    Math.round(a[0] * (1 - k) + b[0] * k),
    Math.round(a[1] * (1 - k) + b[1] * k),
    Math.round(a[2] * (1 - k) + b[2] * k),
]

// export const hslToRgb = (h: number, s: number, l: number): Color => {
//     let r, g, b
//
//     if (s == 0) {
//         r = g = b = l // achromatic
//     } else {
//         const hue2rgb = (p, q, t) => {
//             if (t < 0) t += 1
//             if (t > 1) t -= 1
//             if (t < 1 / 6) return p + (q - p) * 6 * t
//             if (t < 1 / 2) return q
//             if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
//             return p
//         }
//
//         const q = l < 0.5 ? l * (1 + s) : l + s - l * s
//         const p = 2 * l - q
//
//         r = hue2rgb(p, q, h + 1 / 3)
//         g = hue2rgb(p, q, h)
//         b = hue2rgb(p, q, h - 1 / 3)
//     }
//
//     return [0 | (r * 255), 0 | (g * 255), 0 | (b * 255)]
// }
