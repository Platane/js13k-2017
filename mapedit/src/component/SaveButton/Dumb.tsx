import React from 'react'
import styled from 'react-emotion'
import { Button } from '../Button'

const createClickHandler = museumAsBinary => event => {
    const typedArray = museumAsBinary

    const file = new Blob([typedArray], {
        type: 'application/octet-binary',
        encoding: 'utf8',
    })

    const element = event.currentTarget

    element.href = URL.createObjectURL(file)

    element.download = 'museum'
}

const toSize = s => {
    const a = Math.floor(s / 1024)
    const b = s % 1024

    if (!a) return b + ' bytes'

    return a + '.' + Math.floor((b / 1024) * 10) + ' kB'
}

export const SaveButton = ({ museumAsBinary }) => (
    <Container onClick={createClickHandler(museumAsBinary)}>
        <ButtonTool>
            <div>Download</div>
            <span style={{ fontSize: '10px' }}>
                ({museumAsBinary ? toSize(museumAsBinary.length) : '--'})
            </span>
        </ButtonTool>
    </Container>
)

const Container = styled.a``

const ButtonTool = styled(Button)`flex-direction:column`
