import { hslToRgb, colorDistance } from './util/color'

export const SIZE = 64
export const OPACITY_AVAILABLE = [0.2, 0.5, 0.8, 1]
export const RADIUS_AVAILABLE = [1]

const last = arr => arr[arr.length - 1]
const avLast = arr => arr[arr.length - 2]

while (last(RADIUS_AVAILABLE) < SIZE)
    RADIUS_AVAILABLE.push(
        last(RADIUS_AVAILABLE) + (avLast(RADIUS_AVAILABLE) || 1)
    )

export const POSITION_DELTA = SIZE / 0.8
export const COLOR_PALETTE = []

// prettier-ignore
for(let r=0;r<256;r+= 50)
for(let v=0;v<256;v+= 50)
for(let b=0;b<256;b+= 50)
    COLOR_PALETTE.push([r,v,b]);

// COLOR_PALETTE.push([100,100,100],[140,140,140]);

// for (let l = 0; l < 255 * 3; l += 60) {
//     COLOR_PALETTE.push([l / 3, l / 3, l / 3])
//
//     for (let r = Math.max(0, l - 255 * 255); r <= Math.min(l, 255); r += 10)
//         for (
//             let v = Math.max(0, l - r - 255);
//             v <= Math.min(l - r, 255);
//             v += 10
//         ) {
//             const b = l - r - v
//
//             COLOR_PALETTE.push([r, v, b])
//         }
// }

export const N_CIRCLE = 48

// genetic param
export const HORIZONTAL_TRIAL = 5
export const CONVERGED_WHEN_UNCHANGED_SINCE = 1000
export const N_FORK = 100
export const N_BATCH = 800
export const GENE_BATCH = 8
