import React from 'react'
import { UndoButton } from '../UndoButton'
import styled from 'react-emotion'
import { grey } from '../_abstract/palette'

export const Header = ({}) => (
    <Container>
        <UndoButton />
    </Container>
)

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    height: 40px;
    background-color: ${grey};
`
