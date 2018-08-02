import React from 'react'
import styled from 'react-emotion'
import { renderEraser } from './eraser'
import { renderPaintings } from './paintings'
import { renderStartingPoint } from './startingPoint'
import { CubicGuy } from './CubicGuy'

export const Overlay = props => (
    <Container>
        {renderPaintings(props)}
        {renderStartingPoint(props)}
        {renderEraser(props)}
    </Container>
)
{
    /* <CubicGuy color="#ae1698" light={{ x: 1, y: 0, z: 0 }} /> */
}

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
`
