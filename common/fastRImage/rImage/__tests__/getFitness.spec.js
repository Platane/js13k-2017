import { create, drawDiskOnBlank } from '../index'
import { getFitness } from '../diff'

import * as param from '../../../param'

const color = param.COLOR_PALETTE[56]
const size = param.SIZE
const targetBlack = Array.from({ length: size * size * 3 }).map(() => 0)
const targetWhite = Array.from({ length: size * size * 3 }).map(() => 255)
const targetColor = [].concat(
    ...Array.from({ length: size * size }).map(() => color)
)

it('blank white target, white rImage ->  fitness = 1', () => {
    const rImage = create(size)

    expect(getFitness(targetWhite, rImage)).toBe(1)
})

it('blank colored target, colored rImage ->  fitness = 1', () => {
    const rImage = create(size)

    drawDiskOnBlank(param.SIZE, 0, 0, 9999, color, 255, rImage)

    expect(getFitness(targetColor, rImage)).toBe(1)
})

it('blank white target, black rImage ->  fitness = 0', () => {
    const rImage = create(size)

    drawDiskOnBlank(param.SIZE, 0, 0, 9999, [0, 0, 0], 255, rImage)

    expect(getFitness(targetWhite, rImage)).toBe(0)
})

it('blank white target, colored rImage Dot -> 0 < fitness < 1', () => {
    const rImage = create(size)

    drawDiskOnBlank(param.SIZE, size >> 1, size >> 1, size, color, 255, rImage)

    expect(getFitness(targetWhite, rImage)).toBeLessThan(1)
    expect(getFitness(targetWhite, rImage)).toBeGreaterThan(0)
})

it('blank black target, white rImage ->  fitness = 0', () => {
    const rImage = create(size)

    expect(getFitness(targetBlack, rImage)).toBe(0)
})
