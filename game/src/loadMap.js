const l = [
    SIZE,
    SIZE,
    RADIUS_AVAILABLE.length,
    COLOR_PALETTE.length,
    OPACITY_AVAILABLE.length,
].map(x => Math.ceil(Math.log(x) / Math.LN2))

const n_dot = l.reduce((sum, l) => sum + l, 0)

const readNumber = (a, b, arr) => {
    let sum = 0

    for (let k = a; k < b; k++) {
        const bit = !!(arr[Math.floor(k / 8)] & (1 << k % 8))

        sum += +bit << (k - a)
    }

    return sum
}

const arrayToDot = arr => ({
    x: arr[0],
    y: arr[1],
    r: RADIUS_AVAILABLE[arr[2]],
    color: COLOR_PALETTE[arr[3]],
    opacity: OPACITY_AVAILABLE[arr[4]],
})

const unpackADN = buffer => {
    const adn = []
    let offset = 0

    while (offset <= buffer.length * 8 - n_dot) {
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

const unpackPaintings = (paintingLength, buffer) =>
    Array.from({
        length: buffer.length / paintingLength,
    }).map((_, i) => {
        const [x, y, k] = buffer.slice(paintingLength * i)

        const adn = unpackADN(
            buffer.slice(paintingLength * i + 3, paintingLength * (i + 1))
        )

        return {
            x,
            y,
            k,
            adn,
        }
    })

const unpackGrid = (w, h, buffer) => {
    const grid = Array.from({ length: w }).map(() => Array.from({ length: h }))

    for (let y = h; y--; )
        for (let x = w; x--; )
            grid[x][y] = !!readNumber(y * w + x, y * w + x + 1, buffer)

    return grid
}

const unpack = b => {
    const buffer = new Uint8Array(b)

    const [width, height, paintingLength, paintingNumber, x, y, k] = buffer

    const gridLength = Math.ceil((height * width) / 8)

    return {
        grid: unpackGrid(width, height, buffer.slice(7, 7 + gridLength)),
        paintings: unpackPaintings(
            paintingLength,
            buffer.slice(
                7 + gridLength,
                7 + gridLength + paintingLength * paintingNumber
            )
        ),
        s: { x, y, k },
        signs: String.fromCharCode
            .apply(
                null,
                buffer.slice(7 + gridLength + paintingLength * paintingNumber)
            )
            .split('\0')
            .filter(Boolean)
            .map(x => x.split('\n')),
    }
}
