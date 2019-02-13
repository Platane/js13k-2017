export const packSigns = signs => {
    const s = signs.join('\0')

    const x = new Buffer(s)

    return Uint8Array.from(x)
}

export const unpackSigns = buffer => {
    const s = new Buffer(buffer)
        .toString()
        .split('\0')

    return s.length === 1 && !s[0] ? [] : s
}
