import { mutate, create } from '../../rImageTree'

import * as param from '../../../param'

const adn = [
    { color: 129, opacity: 3, r: 15, x: 28, y: 35 },
    { color: 44, opacity: 3, r: 15, x: 56, y: 39 },
    { color: 124, opacity: 2, r: 14, x: 37, y: 16 },
    { color: 199, opacity: 3, r: 6, x: 52, y: 11 },

    { color: 30, opacity: 0, r: 0, x: 53, y: 5 },
    { color: 87, opacity: 2, r: 15, x: 8, y: 2 },
    { color: 37, opacity: 3, r: 12, x: 21, y: 63 },
    { color: 99, opacity: 1, r: 15, x: 19, y: 57 },
]

const adn2 = [
    { color: 3, opacity: 1, r: 15, x: 8, y: 55 },
    { color: 123, opacity: 3, r: 5, x: 26, y: 9 },
    { color: 124, opacity: 3, r: 4, x: 27, y: 16 },
    { color: 153, opacity: 2, r: 6, x: 12, y: 11 },

    { color: 30, opacity: 1, r: 6, x: 53, y: 45 },
    { color: 9, opacity: 3, r: 12, x: 18, y: 17 },
    { color: 92, opacity: 2, r: 4, x: 13, y: 63 },
    { color: 199, opacity: 1, r: 7, x: 8, y: 37 },
]

// param.SIZE = 2

it(`if the adn is the same, the tree should be rTree same`, () => {
    const initial = create(param, adn)

    const mutated = mutate(param, adn, adn, initial)

    expect(mutated).toEqual(initial)
    expect(mutated).toBe(initial)
})

it(`if the adn is equivalent, the tree should be equivalent, but not equal as reference`, () => {
    const initial = create(param, adn)

    const adn2 = [{ ...adn[0] }, ...adn.slice(1)]

    const mutated = mutate(param, adn, adn2, initial)

    expect(mutated).toEqual(initial)
    expect(mutated).not.toBe(initial)
})

it(`rTree mutated from whatever should yield the same result as if it was created`, () => {
    const initial = create(param, adn)

    expect(create(param, adn2)).toEqual(mutate(param, adn, adn2, initial))
})
