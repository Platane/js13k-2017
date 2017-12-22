import { prune } from '../index'

it('should prune node with too many leafs', () => {
    const ancestorTree = {
        fitness: 1,
        children: [
            { fitness: 1, children: [] },
            { fitness: 3, children: [] },
            { fitness: 4, children: [] },
            { fitness: 2, children: [] },
            { fitness: 0, children: [] },
            { fitness: 9, children: [] },
        ],
    }

    expect(prune(ancestorTree, 3).children.map(x => x.fitness)).toEqual([
        0,
        1,
        2,
    ])
})
