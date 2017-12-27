import { getNextFork } from '../getNextFork'
import { extractByDepth } from '../../ancestorTree/read'

const id = () => Math.random().toString()

it(`should produce a pyramid shaped tree`, () => {
    const a = { id: id(), children: [] }

    for (let k = 1000; k--; ) {
        const next = getNextFork(a)

        next.children.push({ id: id(), children: [] })
    }

    const layers = extractByDepth(a)

    const lengths = layers.map(arr => arr.length)

    console.log(lengths)

    expect(lengths).toEqual(lengths.sort((a, b) => (a < b ? 1 : -1)))
})
