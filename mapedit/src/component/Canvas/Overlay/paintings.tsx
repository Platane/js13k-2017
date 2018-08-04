import React from 'react'
import styled from 'react-emotion'
import { RImage } from '../../RImage'
import { toScreen } from '../../../service/camera'
import { grey } from '../../_abstract/palette'

const createTransform = (camera, cell, orientation) => {
    const p = toScreen(camera)({
        x: cell.x + 0.5 + 0.5 * orientation.x,
        y: cell.y + 0.5 + 0.5 * orientation.y,
    })

    return `translate3d(${p.x}px,${p.y}px,0)`
}

const getSize = ({ a }) => Math.min(a * 0.75, 40)

const createSize = camera => {
    const s = getSize(camera)

    return {
        top: -s * 0.5 + 'px',
        left: -s * 0.5 + 'px',
        width: s + 'px',
        height: s + 'px',
    }
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
                ...createSize(camera),
                transform: createTransform(camera, cell, orientation),
            }}
        >
            {param &&
                paintingsById[paintingId] && (
                    <RImage
                        param={param}
                        rImage={paintingsById[paintingId]}
                        size={getSize(camera)}
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
