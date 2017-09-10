import type { AncestorTree, ADN, Dot } from '../../type'

const dotEqual = (a: Dot, b: Dot): boolean =>
    a.x === b.x && a.y === b.y && a.r === b.r && b.opacity === a.opacity

const adnEqual = (a: ADN, b: ADN): boolean =>
    a.length === b.length && a.every((_, i) => dotEqual(a[i], b[i]))

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
