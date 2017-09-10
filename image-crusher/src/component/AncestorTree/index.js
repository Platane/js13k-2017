import { h, Component } from 'preact'
import { computePosition } from './util/index'
import { Node } from './Node'
import { Arcs } from './Arcs'

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

const Mx = 30
const My = 30
const SIZE = 50

const transform = ({ x, y }) =>
    `translate3d(${Mx + x * (SIZE + Mx)}px,${My + y * (SIZE + My)}px,0)`

export const AncestorTree = ({ ancestorTree, onClick }) => {
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

    const width = Mx + (max.x + 1) * (SIZE + Mx)
    const height = My + (max.y + 1) * (SIZE + My)

    return (
        <div
            className={style.container}
            style={{
                width,
                height,
            }}
        >
            <Arcs
                arcs={links.map(([a, b]) => ({
                    id: ids.get(a) + '->' + ids.get(a),
                    a: pos.get(a),
                    b: pos.get(b),
                }))}
                size={SIZE}
                mx={Mx}
                my={My}
                width={width}
                height={height}
            />

            {nodes.map(tree => (
                <div
                    key={ids.get(tree)}
                    className={style.node}
                    onClick={() => onClick(tree)}
                    style={{
                        transform: transform(pos.get(tree)),
                    }}
                >
                    <Node tree={tree} size={SIZE} />
                </div>
            ))}
        </div>
    )
}
