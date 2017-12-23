import { Dot, ADN } from '../type'

export const dotEqual = (a: Dot, b: Dot): boolean =>
    a.x === b.x &&
    a.y === b.y &&
    a.r === b.r &&
    a.opacity === b.opacity &&
    a.color[0] === b.color[0] &&
    a.color[1] === b.color[1] &&
    a.color[2] === b.color[2]

export const adnEqual = (a: ADN, b: ADN): boolean =>
    a.length === b.length && a.every((_, i) => dotEqual(a[i], b[i]))
