import React from 'react'
import styled from 'react-emotion'
import { reduceGrid, centerOrigin } from '../../service/map/reduceGrid'
import { packMuseum } from '../../lib/common/map/pack/museum'
import { getBestFitLeafs } from '../../lib/common/ancestorTree/stats'

const createClickHandler = (param, museum, paintings) => event => {
    const m = centerOrigin(reduceGrid(museum))

    m.paintings = m.paintings.map(({ paintingId, ...painting }) => {
        const p = paintings.find(({ id }) => paintingId === id)

        const [{ adn }] = getBestFitLeafs(p.ancestorTree, 1)

        return { adn, ...painting }
    })

    const typedArray = packMuseum(param, m)

    const file = new Blob([typedArray], {
        type: 'application/octet-binary',
        encoding: 'utf8',
    })

    const element = event.currentTarget

    element.href = URL.createObjectURL(file)

    element.download = 'museum'
}

export const SaveButton = ({ param, museum, paintings }) => (
    <Container onClick={createClickHandler(param, museum, paintings)}>
        <Button>download</Button>
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
