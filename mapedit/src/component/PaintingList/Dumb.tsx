import React from 'react'
import styled from 'react-emotion'
import { RImage } from '../RImage'

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
    padding: 4px;
`

const scrollGutter = 28
const breaks = [2, 3, 4].map(x => x * (64 + 8) + scrollGutter)

const Container = styled.div`
    width: ${breaks[0]}px;
    height: 100%;
    position: relative;
    overflow-y: scroll;

    @media (min-width: 1200px) {
        width: ${breaks[1]}px;
    }
    @media (min-width: 1400px) {
        width: ${breaks[2]}px;
    }
`

const Painting = styled.div`
    cursor: pointer;
    margin: 4px;
    font-size: 0;
`
