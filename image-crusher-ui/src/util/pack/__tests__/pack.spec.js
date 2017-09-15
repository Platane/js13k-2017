import { packADN, unpackADN, writeNumber, readNumber } from '../index'

import * as param from '../../../param'

const samples = [
    [{ x: 14, y: 13, r: 2, color: 9, opacity: 1 }],
    [
        { color: 129, opacity: 3, r: 16, x: 28, y: 35 },
        { color: 44, opacity: 3, r: 16, x: 56, y: 39 },
        { color: 124, opacity: 2, r: 14, x: 37, y: 16 },
        { color: 199, opacity: 3, r: 6, x: 52, y: 11 },
    ],
    [
        { color: 129, opacity: 3, r: 16, x: 28, y: 35 },
        { color: 44, opacity: 3, r: 16, x: 56, y: 39 },
        { color: 124, opacity: 2, r: 14, x: 37, y: 16 },
        { color: 199, opacity: 3, r: 6, x: 52, y: 11 },
        { color: 30, opacity: 0, r: 15, x: 53, y: 5 },
        { color: 87, opacity: 2, r: 15, x: 8, y: 2 },
        { color: 37, opacity: 3, r: 12, x: 21, y: 63 },
        { color: 99, opacity: 1, r: 15, x: 19, y: 57 },
    ],
]

describe('packADN', () =>
    samples.forEach((adn, i) =>
        it(`pack / unpack should be identity ${i}`, () =>
            expect(unpackADN(param, packADN(param, adn))).toEqual(adn))
    ))

describe('readNumber / writeNumber in Uint8Array', () =>
    it(`should read the written number`, () => {
        const arr = new Uint8Array(20)

        writeNumber(5, 9, arr, 15)
        writeNumber(0, 5, arr, 0)
        writeNumber(9, 16, arr, 0)

        expect(readNumber(0, 5, arr)).toBe(0)
        expect(readNumber(5, 9, arr)).toBe(15)
        expect(readNumber(9, 16, arr)).toBe(0)
    }))
