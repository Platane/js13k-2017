import { mutate, create } from '../../rImageTree'
import { getFitness } from '../../rImage/diff'

import * as param from '../../../param'

// param.SIZE = 3

const color = param.COLOR_PALETTE[56]
const size = param.SIZE
const targetBlack = Array.from({ length: size * size * 3 }).map(() => 0)
const targetWhite = Array.from({ length: size * size * 3 }).map(() => 255)
const targetColor = [].concat(
    ...Array.from({ length: size * size }).map(() => color)
)

it('adn with full colored image, should get fitness 1 with blank colored target', () => {
    const adn = [
        { r: 15, color: 56, opacity: 3, x: 0, y: 0 },
        { r: 15, color: 56, opacity: 3, x: size, y: 0 },
        { r: 15, color: 56, opacity: 3, x: size, y: size },
        { r: 15, color: 56, opacity: 3, x: 0, y: size },
        { r: 15, color: 56, opacity: 3, x: size >> 1, y: size >> 1 },
    ]

    const rTree = create(param, adn)

    expect(getFitness(targetColor, rTree.rImage)).toBe(1)
})

it('adn with colored cetred dot, should get fitness between 0 and 1 with blank colored target', () => {
    const adn = [{ r: 4, color: 56, opacity: 3, x: size >> 1, y: size >> 1 }]

    const rTree = create(param, adn)

    const fitness = getFitness(targetColor, rTree.rImage)

    expect(fitness).toBeGreaterThan(0)
    expect(fitness).toBeLessThan(1)
})

it('adn with gradually colored image, should get increasing with blank colored target', () => {
    const adn = [
        { r: 8, color: 56, opacity: 3, x: 0, y: 0 },
        { r: 8, color: 56, opacity: 3, x: size, y: size },
        { r: 8, color: 56, opacity: 3, x: size, y: 0 },
        { r: 8, color: 56, opacity: 3, x: 0, y: size },
    ]

    const fitness = Array.from({ length: adn.length + 1 }).map((_, i) =>
        getFitness(targetColor, create(param, adn.slice(0, i)).rImage)
    )

    console.log(fitness)

    fitness.forEach(
        (_, i) => i > 0 && expect(fitness[i - 1]).toBeLessThan(fitness[i])
    )

    // const delta = fitness[1] - fitness[0]
    // fitness.forEach(
    //     (_, i) => i > 0 && expect(fitness[i] - fitness[i - 1]).toBe(delta)
    // )
})
