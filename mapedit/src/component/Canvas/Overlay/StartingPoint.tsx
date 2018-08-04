import React from 'react'
import { toScreen } from '../../../service/camera'

const orientations = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
]
const getOrientationAngle = ({ x, y }) =>
    -(orientations.findIndex(o => o.x === x && o.y === y) - 1) * Math.PI * 0.5

const createTransform = (camera, cell, orientation) => {
    const p = toScreen(camera)({
        x: cell.x + 0.5,
        y: cell.y + 0.5,
    })

    return `
    translate3d(${p.x}px,${p.y}px,0)
    rotate(${getOrientationAngle(orientation)}rad)`
}

const m = {}
const createDragEvent = startDragStartingPoint =>
    (m[0] =
        m[0] ||
        (event => {
            event.stopPropagation()
            startDragStartingPoint()
        }))

export const StartingPoint = ({ camera, museum, startDragStartingPoint }) => (
    <StartingPointTic
        onMouseDown={createDragEvent(startDragStartingPoint)}
        style={{
            cursor: 'pointer',
            position: 'absolute',
            transform: createTransform(
                camera,
                museum.startingPoint,
                museum.startingOrientation
            ),
            top: -camera.a * 0.5,
            left: -camera.a * 0.5,
            width: camera.a,
            height: camera.a,
        }}
    />
)

const StartingPointTic = ({ ...props }) => (
    <svg viewBox="-20 -20 40 40" {...props}>
        <circle cx={0} cy={0} r={3} />
        <path
            d="M7 -8L16 0L 7 8z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
