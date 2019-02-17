import React from 'react'
import styled from 'react-emotion'
import { Line } from './Line'

export const PaintingDownsizeList = ({ paintings, ...props }) => (
    <Container>
        <List>
            {props.param &&
                paintings.map(
                    ({ paintingId, downsizeId: selectedDownsizeId }) => (
                        <Line
                            {...props}
                            id={paintingId}
                            paintingId={paintingId}
                            selectedDownsizeId={selectedDownsizeId}
                        />
                    )
                )}
        </List>
    </Container>
)

const List = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 4px;
`
const Container = styled.div`
    font-size: 0;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: scroll;
`
