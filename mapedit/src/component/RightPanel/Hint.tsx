import React from 'react'
import styled from 'react-emotion'
import { black } from '../_abstract/palette'

export const Hint = ({ currentPanel }) =>
    (currentPanel === 'placepainting' && (
        <Container>
            <p>Build the musem wall with the tools on the right.</p>
            <p>Drag and drop painting from this panel to the map.</p>
        </Container>
    )) ||
    (currentPanel === 'routebuilder' && (
        <Container>
            <p>Build the chain of painting.</p>
            <p>Leave hint behing the frame to lead to the next one.</p>
            <p>Paintings without hint are considered as decor.</p>
        </Container>
    )) ||
    (currentPanel === 'downsizePainting' && (
        <Container>
            <p>Pick the best painting simplification.</p>
        </Container>
    )) ||
    null

const Container = styled.div`
    margin: 0 8px;
    color: ${black};
    font-size: 0.8em;
    margin-bottom: 8px;
`
