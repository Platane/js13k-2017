import { getFitness } from '../getFitness'
import { createBlank, drawCircle } from '../draw'
import * as param from '../../param'

it('two same blank images should have a fitness = 1', () => {
    const s = 32

    const a = createBlank(s)
    const b = createBlank(s)

    expect(getFitness(s, a, b)).toBe(1)
})

it('two same image should have a fitness = 1', () => {
    const s = 32

    const a = createBlank(s)
    const b = createBlank(s)

    drawCircle(s, a, 10, 10, 20, [12, 156, 76], 0.4)
    drawCircle(s, a, 8, 17, 14, [122, 56, 176], 0.6)

    drawCircle(s, b, 10, 10, 20, [12, 156, 76], 0.4)
    drawCircle(s, b, 8, 17, 14, [122, 56, 176], 0.6)

    expect(getFitness(s, a, b)).toBe(1)
})

it('one white image and one black image should have a fitness = 0', () => {
    const s = 32

    const a = createBlank(s)
    const b = createBlank(s)

    drawCircle(s, a, 0, 0, 100, [0, 0, 0], 1)
    drawCircle(s, b, 0, 0, 100, [255, 255, 255], 1)

    expect(getFitness(s, a, b)).toBe(0)
})
