import { h, Component } from 'preact'
import { computePosition } from './util/index'
import { SIZE } from '../../param'
import { Node } from './Node'

import style from './style.css'

const flatten = tree => [tree, ...[].concat(...tree.children.map(flatten))]

const extractLinks = tree => [
    ...tree.children.map(x => [tree, x]),
    ...[].concat(...tree.children.map(extractLinks)),
]

const computeId = (tree, map = new Map(), id = '0') => {
    map.set(tree, id)

    tree.children.forEach((x, i) => computeId(x, map, id + '.' + i))

    return map
}

const Mx = 10
const My = 40

const transform = ({ x, y }) =>
    `translate3d(${Mx + x * (SIZE + Mx)}px,${My + y * (SIZE + My)}px,0)`

export const AncestorTree = ({ ancestorTree }) => {
    const pos = computePosition(ancestorTree)
    const ids = computeId(ancestorTree)

    const nodes = flatten(ancestorTree)

    const links = extractLinks(ancestorTree)

    const max = Array.from(pos.values()).reduce(
        (s, { x, y }) => {
            s.x = Math.max(s.x, x)
            s.y = Math.max(s.y, y)

            return s
        },
        { x: 0, y: 0 }
    )

    return (
        <div
            className={style.container}
            style={{
                width: Mx + (max.x + 1) * (SIZE + Mx),
                height: My + (max.y + 1) * (SIZE + My),
            }}
        >
            {nodes.map(tree =>
                <div
                    key={ids.get(tree)}
                    className={style.node}
                    style={{
                        transform: transform(pos.get(tree)),
                    }}
                >
                    <Node tree={tree} />
                </div>
            )}
        </div>
    )
}
