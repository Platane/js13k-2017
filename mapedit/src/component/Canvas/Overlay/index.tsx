import React from "react"
import styled, { keyframes } from "react-emotion"
import { RImage } from "../../RImage"
import { toScreen } from "../../../service/camera"

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

export const Overlay = ({
    param,
    museum,
    camera,
    paintingsById,
    startDragPainting,
}) => (
    <Container>
        {museum.paintings.map(({ id, cell, orientation, paintingId }) => (
            <Painting
                id={paintingId}
                draggable={true}
                onMouseDown={stopPropagation}
                onDragStart={createDragEvent(startDragPainting, paintingId, id)}
                style={{
                    transform: createTransform(camera, cell, orientation),
                }}
            >
                <RImage
                    param={param}
                    rImage={paintingsById[paintingId]}
                    size={camera.a * s}
                />
            </Painting>
        ))}
    </Container>
)

const Painting = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    border-radius: 4px;
    font-size: 0;
    cursor: pointer;
`

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
`
