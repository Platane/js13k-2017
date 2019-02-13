import { packSigns, unpackSigns } from '../signs'

// prettier-ignore
export const samples = [
    [
    ],
    [
        'a'
    ],
    [
        '111\n222',' aaa\n  bbb','','ccc',
    ],

]

samples.forEach((sign, i) =>
    it(`pack / unpack signs should be identity ${i}`, () =>
        expect(unpackSigns(packSigns(sign))).toEqual(sign))
)
