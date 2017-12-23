import { writeNumber, readNumber } from '../index'

it(`should read the written number`, () => {
    const arr = new Uint8Array(20)

    writeNumber(5, 9, arr, 15)
    writeNumber(0, 5, arr, 0)
    writeNumber(9, 16, arr, 0)

    expect(readNumber(0, 5, arr)).toBe(0)
    expect(readNumber(5, 9, arr)).toBe(15)
    expect(readNumber(9, 16, arr)).toBe(0)
})
