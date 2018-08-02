import React from 'react'
import styled from 'react-emotion'
import { Button } from '../Button'

export const PlayButton = ({
    openPlayWindow,
    togglePlayWindowAutoRefresh,
    autorefresh,
}) => (
    <Container onClick={openPlayWindow}>
        <Button>
            Play
            <Checkbox
                type="checkbox"
                onClick={event => {
                    event.stopPropagation()
                    togglePlayWindowAutoRefresh()
                }}
                title="auto refresh"
                checked={autorefresh}
            />
        </Button>
    </Container>
)

const Checkbox = styled.input`
    margin-left: 20px;
`

const Container = styled.div``
