import React from 'react'
import styled from 'react-emotion'
import { Eraser } from './Eraser'
import { renderPaintings } from './paintings'
import { StartingPoint } from './StartingPoint'
import { PlayWindowPosition } from './PlayWindowPosition'
import { RoutePath } from './RoutePath'
// import { CubicGuy } from './CubicGuy'

export const Overlay = props => (
    <Container>
        <PlayWindowPosition {...props} />
        <RoutePath {...props} />
        <StartingPoint {...props} />
        {renderPaintings(props)}
        <Eraser {...props} />
    </Container>
)
// <CubicGuy color="#ae1698" light={{ x: 1, y: 0, z: 0 }} />

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
`
