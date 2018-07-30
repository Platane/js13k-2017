import React from 'react'
import styled from 'react-emotion'
import { create } from '../../service/popup'

const open = create()

const createClickHandler = museumAsBinary => event => {
    localStorage.setItem('museumAsBinary', museumAsBinary.join(','))
    open()
}

export const PlayButton = ({ museumAsBinary }) => (
    <Container onClick={createClickHandler(museumAsBinary)}>
        <Button>play</Button>
    </Container>
)
// href="/game?local=1"
// target="_blank"

const Container = styled.div``

const Button = styled.div`
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    border-radius: 2px;
    background-color: #f2f2f2;
    box-shadow: 0 0 0 2px ${props => (props.selected ? '#ddd' : 'transparent')};
`
