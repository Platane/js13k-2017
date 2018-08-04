import React from 'react'
import styled from 'react-emotion'
import { toScreen } from '../../../service/camera'

export const Eraser = ({ camera, dragEraseWall }) => {
    if (!dragEraseWall) return null

    const min = {
        x: Math.min(dragEraseWall.A.x, dragEraseWall.B.x),
        y: Math.min(dragEraseWall.A.y, dragEraseWall.B.y),
    }
    const max = {
        x: Math.max(dragEraseWall.A.x, dragEraseWall.B.x) + 1,
        y: Math.max(dragEraseWall.A.y, dragEraseWall.B.y) + 1,
    }

    const a = toScreen(camera)(min)
    const b = toScreen(camera)(max)

    return (
        <Rect
            style={{
                width: b.x - a.x + 'px',
                height: b.y - a.y + 'px',
                transform: `translate3d(${a.x}px,${a.y}px,0)`,
            }}
        />
    )
}

const Rect = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    pointer-event: none;
    background-color: rgba(0, 0, 0, 0.05);
`
