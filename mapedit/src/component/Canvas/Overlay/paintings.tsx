import React from 'react'
import styled from 'react-emotion'
import { RImage } from '../../RImage'
import { toScreen } from '../../../service/camera'
import {  grey } from '../../_abstract/palette'

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
    (m[id] =
        m[id] ||
        (event => {
            event.stopPropagation()
            startDragPainting(paintingId, id)
        }))

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
            onMouseDown={createDragEvent(startDragPainting, paintingId, id)}
            style={{
                width: `${camera.a * s}px`,
                height: `${camera.a * s}px`,
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
    background-color: ${grey};
`
