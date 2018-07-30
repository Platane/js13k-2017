import React from 'react'
import styled from 'react-emotion'

export const PlayButton = ({
    openPlayWindow,
    togglePlayWindowAutoRefresh,
    autorefresh,
}) => (
    <Container onClick={openPlayWindow}>
        <Button>
            play
            <input
                type="checkbox"
                onClick={event => {
                    event.stopPropagation()
                    togglePlayWindowAutoRefresh()
                }}
                checked={autorefresh}
                style={{ marginLeft: '20px' }}
            />
        </Button>
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
