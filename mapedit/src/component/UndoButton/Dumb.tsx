import React from 'react'
import styled from 'react-emotion'
import { Button } from '../Button'

const mutationLabel = {
    movestartingpoint: 'move starting point',
    tracewall: 'trace wall with pen',
    rectwall: 'trace rectangle wall',
    erasewall: 'erase',
    movepainting: 'move painting',
    placepainting: 'place painting',
}

export const UndoButton = ({ toUndo, toRedo, undo, redo }) => (
    <Container>
        <ButtonTool
            onClick={undo}
            disabled={!toUndo}
            title={toUndo && `undo ${mutationLabel[toUndo]}`}
        >
            {'<'}
        </ButtonTool>
        <ButtonTool
            onClick={redo}
            disabled={!toRedo}
            title={toRedo && `redo ${mutationLabel[toRedo]}`}
        >
            {'>'}
        </ButtonTool>
    </Container>
)

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
`

const ButtonTool = styled(Button)`
    margin: 4px 10px;
    min-width: 32px;
`
