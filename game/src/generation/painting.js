import * as PARAM from '../asset/param'

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

const arrayToDot = (arr: number[]) => ({
    x: arr[0],
    y: arr[1],
    r: PARAM.RADIUS_AVAILABLE[arr[2]],
    color: PARAM.COLOR_PALETTE[arr[3]],
    opacity: PARAM.OPACITY_AVAILABLE[arr[4]],
})

const unpackADN = (buffer: Uint8Array) => {
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

export const readPainting = path =>
    fetch(path)
        .then(x => x.arrayBuffer())
        .then(x => unpackADN(new Uint8Array(x)))
