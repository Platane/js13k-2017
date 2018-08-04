import React from 'react'
import { toScreen } from '../../../service/camera'

const getOrientationAngle = ({ x, y }) => Math.atan2(y, x)

const createTransform = (camera, cell, orientation) => {
    const p = toScreen(camera)({
        x: cell.x + 0.5,
        y: cell.y + 0.5,
    })

    return `
    translate3d(${p.x}px,${p.y}px,0)
    rotate(${getOrientationAngle(orientation)}rad)
    `
}

export const renderPlayWindowPosition = ({
    camera,
    playWindowPosition,
    playWindowOrientation,
}) =>
    playWindowPosition ? (
        <StartingPoint
            style={{
                pointerEvent: 'none',
                cursor: 'pointer',
                position: 'absolute',
                transform: createTransform(
                    camera,
                    playWindowPosition,
                    playWindowOrientation
                ),
                top: -camera.a * 0.5,
                left: -camera.a * 0.5,
                width: camera.a,
                height: camera.a,
            }}
        />
    ) : null

const StartingPoint = ({ ...props }) => (
    <svg viewBox="-20 -20 40 40" {...props}>
        <circle cx={0} cy={0} r={6} fill="yellow" />
        <path
            fill="yellow"
            d="M7 -8L16 0L 7 8z"
            stroke="yellow"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
