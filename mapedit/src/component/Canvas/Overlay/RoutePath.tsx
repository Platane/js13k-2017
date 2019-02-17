import React from 'react'
import { toScreen } from '../../../service/camera'
import { primary } from '../../_abstract/palette'

const getOrientationAngle = ({ x, y }) => Math.atan2(y, x)

const createTransform = ({ a }, cell, orientation) => {
    const k = Math.min(2, Math.max(a / 40, 0.8))

    return `
    translate(${cell.x} ${cell.y})
    rotate(${(getOrientationAngle(orientation) * 180) / Math.PI})
    scale(${k})
    `
}

const flat = arr => [].concat(...arr)

const toPath = arr =>
    [
        `M${arr[0].x} ${arr[0].y}`,
        ...arr.slice(1).map(({ x, y }) => `L${x} ${y}`),
    ].join('')

export const RoutePath = ({ camera, routePath }) => {
    if (!routePath) return

    const line = routePath
        .filter(Boolean)
        .map(path =>
            path
                .map(({ x, y }) => ({ x: x + 0.5, y: y + 0.5 }))
                .map(toScreen(camera))
        )

    const fline = flat(line)
    if (!fline.length) return

    const { min, max } = fline.reduce(
        (a, { x, y }) => {
            a.min.x = Math.floor(Math.min(a.min.x, x)) - 10
            a.min.y = Math.floor(Math.min(a.min.y, y)) - 10

            a.max.x = Math.floor(Math.max(a.max.x, x)) + 10
            a.max.y = Math.floor(Math.max(a.max.y, y)) + 10

            return a
        },
        {
            min: { x: Infinity, y: Infinity },
            max: { x: -Infinity, y: -Infinity },
        }
    )

    const viewBox = `0 0 ${max.x - min.x} ${max.y - min.y}`

    const lline = line.map(path =>
        path.map(({ x, y }) => ({ x: x - min.x, y: y - min.y }))
    )

    return (
        <svg
            viewBox={viewBox}
            style={{
                pointerEvent: 'none',
                position: 'absolute',
                height: max.y - min.y + 'px',
                width: max.x - min.x + 'px',
                left: min.x + 'px',
                top: min.y + 'px',
            }}
        >
            <g opacity="0.3">
                {lline.map((path, i) => {
                    const k = 1 - i / (lline.length + 1)

                    return (
                        <path
                            key={i}
                            fill="none"
                            d={toPath(path)}
                            stroke={primary}
                            strokeWidth={k * 4 + 1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )
                })}
            </g>
        </svg>
    )
}
