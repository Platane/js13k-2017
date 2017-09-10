import * as PARAM from '../../param'

import type { ADN, Dot } from '../type'

// a dot packed is
// x | y | r | color | opacity

const l = [
    PARAM.SIZE,
    PARAM.SIZE,
    PARAM.RADIUS_AVAILABLE.length,
    PARAM.COLOR_PALETTE.length,
    PARAM.OPACITY_AVAILABLE.length,
].map(x => Math.ceil(Math.log(x) / Math.LN2))

const m = [0]
l.forEach((l, i) => (m[i + 1] = m[i] + l))

const n_dot = l.reduce((sum, l) => sum + l, 0)

const readNumber = (a: number, b: number, arr: Uint8Array) => {
    let sum = 0

    for (let k = a; k < b; k++) {
        const bit = !!(arr[Math.floor(k / 8)] & (1 << (k % 8)))

        sum += +bit << (k - a)
    }

    return sum
}

const writeNumber = (a: number, b: number, arr: Uint8Array, value: number) => {
    for (let k = a; k < b; k++) {
        const bit = !!(value & (1 << (k - a)))

        arr[Math.floor(k / 8)] += +bit << (k % 8)
    }
}

const dotToArray = (dot: Dot): number[] => [
    dot.x,
    dot.y,
    dot.r,
    dot.color,
    dot.opacity,
]
const arrayToDot = (arr: number[]): Dot => ({
    x: arr[0],
    y: arr[1],
    r: arr[2],
    color: arr[3],
    opacity: arr[4],
})

export const packADN = (adn: ADN): Uint8Array => {
    const buffer = new Uint8Array(Math.ceil(adn.length * n_dot / 8))

    let offset = 0

    for (let i = 0; i < adn.length; i++) {
        dotToArray(adn[i]).forEach((value, k) => {
            writeNumber(offset, offset + l[k], buffer, value)

            offset += l[k]
        })
    }

    return buffer
}

export const unpackADN = (buffer: Uint8Array): ADN => {
    const adn = []
    let offset = 0

    while (offset < buffer.length * 8 - n_dot) {
        adn.push(
            arrayToDot(
                l.map(l => {
                    const o = offset
                    offset = offset + l

                    return readNumber(o, offset, buffer)
                })
            )
        )
    }

    return adn
}
