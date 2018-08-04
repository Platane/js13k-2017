import React from 'react'
import { toScreen } from '../../../../service/camera'
import { primary } from '../../../_abstract/palette'

const getOrientationAngle = ({ x, y }) => Math.atan2(y, x)

const createTransform = ({ a }, cell, orientation) => {
    const k = Math.min(2, Math.max(a / 40, 0.8))

    return `
    translate(${cell.x} ${cell.y})
    rotate(${(getOrientationAngle(orientation) * 180) / Math.PI})
    scale(${k})
    `
}

export const PlayWindowPosition = ({ camera, path, playWindowOrientation }) => {
    if (!path[0]) return null

    const p = toScreen(camera)

    const line = path.map(p)

    const { min, max } = line.reduce(
        (a, { x, y }) => {
            a.min.x = Math.min(a.min.x, x) - 10
            a.min.y = Math.min(a.min.y, y) - 10

            a.max.x = Math.max(a.max.x, x) + 10
            a.max.y = Math.max(a.max.y, y) + 10

            return a
        },
        {
            min: { x: Infinity, y: Infinity },
            max: { x: -Infinity, y: -Infinity },
        }
    )

    const viewBox = `0 0 ${max.x - min.x} ${max.y - min.y}`

    const lline = line.map(({ x, y }) => ({ x: x - min.x, y: y - min.y }))

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
            <Tic
                transform={createTransform(
                    camera,
                    lline[0],
                    playWindowOrientation
                )}
            />

            <g opacity="0.4">
                {lline.map((_, i) => {
                    const a = lline[i - 1]
                    const b = lline[i]

                    if (!a) return

                    const k = 1 - i / (lline.length + 2)

                    return (
                        <path
                            fill="none"
                            d={`M${a.x} ${a.y}L${b.x} ${b.y}`}
                            stroke={primary}
                            strokeWidth={k * 8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )
                })}
            </g>
        </svg>
    )
}

const Tic = ({ ...props }) => (
    <g {...props}>
        <circle cx={0} cy={0} r={4} fill={primary} />
        <path
            fill={primary}
            d="M7 -8L16 0L 7 8z"
            stroke={primary}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </g>
)
