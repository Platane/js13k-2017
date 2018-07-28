import React from "react"
import styled from "react-emotion"
import { RImage } from "../RImage"

const m = {}
const createDragEvent = (startDragPainting, id) =>
    (m[id] = m[id] || (() => startDragPainting(id)))

export const PaintingList = ({ paintings, startDragPainting }) => (
    <Container>
        <List>
            {paintings.map(({ id, target, PARAM }) => (
                <Painting
                    id={id}
                    draggable={true}
                    onDragStart={createDragEvent(startDragPainting, id)}
                >
                    <RImage param={PARAM} rImage={target} size={64} />
                </Painting>
            ))}
        </List>
    </Container>
)

const List = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: #f5f5f5;
    padding: 4px;
`
const Container = styled.div`
    background: #f5f5f5;
    width: 240px;
    height: 100%;
    position: relative;
    overflow-y: scroll;
`

const Painting = styled.div`
    cursor: pointer;
    margin: 4px;
    font-size: 0;
`
