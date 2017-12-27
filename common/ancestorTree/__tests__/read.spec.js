import { getNodeById } from '../read'

it('should get node by id', () => {
    const tree = {
        id: 'a',
        children: [
            {
                id: 'b',
                children: [],
            },
            {
                id: 'c',
                children: [
                    {
                        id: 'd',
                        children: [],
                    },
                ],
            },
        ],
    }

    expect(getNodeById(tree, 'd')).toBe(tree.children[1].children[0])
})
