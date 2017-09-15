import { encode, decode } from '../encode'
import { packADN } from '../index'
import * as param from '../../../param'

const sample = packADN(param, [{ x: 14, y: 13, r: 2, color: 9, opacity: 1 }])

describe('packADN', () =>
    it('encode / decode should be identity', () =>
        expect(decode(encode(sample))).toEqual(sample)))
