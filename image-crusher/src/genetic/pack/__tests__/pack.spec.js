import { packADN, unpackADN } from '../index'

const sample = [{ x: 14, y: 13, r: 2, color: 9, opacity: 1 }]

describe('packADN', () =>
    it('pack / unpack should be identity', () =>
        expect(unpackADN(packADN(sample))).toEqual(sample)))
