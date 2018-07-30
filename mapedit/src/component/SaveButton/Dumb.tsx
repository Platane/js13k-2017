import React from 'react'
import styled from 'react-emotion'

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
        <Button>
            download{' '}
            <span style={{ fontSize: '10px' }}>
                ({toSize(museumAsBinary.length)})
            </span>
        </Button>
    </Container>
)

const Container = styled.a``

const Button = styled.div`
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    border-radius: 2px;
    background-color: #f2f2f2;
    box-shadow: 0 0 0 2px ${props => (props.selected ? '#ddd' : 'transparent')};
`
