import React from 'react'
import styled from 'react-emotion'
import { RImage } from '../../RImage'
import { toScreen } from '../../../service/camera'

const s = 0.75

const createTransform = (camera, cell, orientation) => {
    const p = toScreen(camera)({
        x: cell.x + 0.5 + 0.5 * orientation.x - s / 2,
        y: cell.y + 0.5 + 0.5 * orientation.y - s / 2,
    })

    return `translate3d(${p.x}px,${p.y}px,0)`
}

const m = {}
const createDragEvent = (startDragPainting, paintingId, id) =>
    (m[id] = m[id] || (() => startDragPainting(paintingId, id)))

const stopPropagation = event => event.stopPropagation()

export const renderPaintings = ({
    camera,
    param,
    museum,
    paintingsById,
    startDragPainting,
}) =>
    museum.paintings.map(({ id, cell, orientation, paintingId }) => (
        <Painting
            key={id}
            draggable={true}
            onMouseDown={stopPropagation}
            onDragStart={createDragEvent(startDragPainting, paintingId, id)}
            style={{
                transform: createTransform(camera, cell, orientation),
            }}
        >
            {param &&
                paintingsById[paintingId] && (
                    <RImage
                        param={param}
                        rImage={paintingsById[paintingId]}
                        size={camera.a * s}
                    />
                )}
        </Painting>
    ))

const Painting = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    border-radius: 4px;
    font-size: 0;
    cursor: pointer;
`
