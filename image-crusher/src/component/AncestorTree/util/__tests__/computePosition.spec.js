import { computePosition } from '../index'

it('should position the tree in order to prevent element from overlaping', () => {
    const tree = {
        children: [
            { children: [{ children: [] }, { children: [] }] },
            { children: [] },
        ],
    }

    const map = computePosition(tree)

    expect(map.get(tree.children[0].children[0])).toEqual({ x: 0, y: 2 })
    expect(map.get(tree.children[0].children[1])).toEqual({ x: 1, y: 2 })
    expect(map.get(tree.children[1])).toEqual({ x: 2, y: 1 })
    expect(map.get(tree.children[0])).toEqual({ x: 0.5, y: 1 })
    expect(map.get(tree)).toEqual({ x: 1, y: 0 })
})
