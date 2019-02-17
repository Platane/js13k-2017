import { packADN, unpackADN } from "../index"

import * as param from "../../../param"

export const samples = [
    [{ x: 14, y: 13, r: 2, color: 9, opacity: 1 }],
    [
        { color: 129, opacity: 3, r: 6, x: 28, y: 35 },
        { color: 44, opacity: 3, r: 15, x: 56, y: 39 },
        { color: 124, opacity: 2, r: 14, x: 37, y: 16 },
        { color: 199, opacity: 3, r: 6, x: 52, y: 11 },
    ],
    [
        { color: 129, opacity: 3, r: 15, x: 28, y: 35 },
        { color: 44, opacity: 3, r: 15, x: 56, y: 39 },
        { color: 124, opacity: 2, r: 14, x: 37, y: 16 },
        { color: 199, opacity: 3, r: 6, x: 52, y: 11 },
        { color: 30, opacity: 0, r: 0, x: 53, y: 5 },
        { color: 87, opacity: 2, r: 15, x: 8, y: 2 },
        { color: 37, opacity: 3, r: 12, x: 21, y: 63 },
        { color: 99, opacity: 1, r: 15, x: 19, y: 57 },
    ],
]

samples.forEach((adn, i) =>
    it(`pack / unpack adn should be identity ${i}`, () =>
        expect(unpackADN(param, packADN(param, adn))).toEqual(adn))
)
