import { equal } from '../adn/equal'

import type { AncestorTree } from '../../type'

export const mergeAncestorTree = (
    a: AncestorTree,
    b: AncestorTree
): AncestorTree => ({
    ...a,
    children: [
        ...a.children.map(u => {
            const v = b.children.find(v => adnEqual(v.adn, u.adn))

            return v ? mergeAncestorTree(u, v) : u
        }),
        ...b.children.filter(
            v => !a.children.some(u => adnEqual(v.adn, u.adn))
        ),
    ],
})
