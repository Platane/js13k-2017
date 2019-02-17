import React, { Component } from 'react'
import styled from 'react-emotion'
import { RImage } from '../RImage'
import { RImageADN } from '../RImageADN'
import { grey, primary } from '../_abstract/palette'

const m = {}
const createEventHandler = (setPaintingDownsize, downsizeId, paintingId) =>
    (m[downsizeId] =
        m[downsizeId] || (() => setPaintingDownsize(paintingId, downsizeId)))

export class Line extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.paintingId !== nextProps.paintingId ||
            this.props.selectedDownsizeId !== nextProps.selectedDownsizeId
        )
    }

    render() {
        const {
            paintingId,
            param,
            bestPaintingsById,
            targetPaintingsById,
            selectedDownsizeId,
            setPaintingDownsize,
        } = this.props

        return (
            <Container id={paintingId}>
                <Target>
                    <RImage
                        param={param}
                        rImage={targetPaintingsById[paintingId]}
                        size={64}
                    />
                </Target>

                <List>
                    {bestPaintingsById[paintingId]
                        .slice(0, 6)
                        .map(({ id: downsizeId, adn }) => (
                            <Downsize
                                id={downsizeId}
                                selected={downsizeId === selectedDownsizeId}
                                onClick={createEventHandler(
                                    setPaintingDownsize,
                                    downsizeId,
                                    paintingId
                                )}
                            >
                                <RImageADN param={param} adn={adn} size={64} />
                            </Downsize>
                        ))}
                </List>
            </Container>
        )
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 8px 0;
    padding-left: 4px;
`
const List = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Target = styled.div`
    flex-grow: 1;
`
const Downsize = styled.div`
    cursor: pointer;
    border-radius: 2px;
    overflow: hidden;
    ${props => (props.selected ? `box-shadow: 0 0 0 4px ${grey}` : '')};
    transform: ${props => (props.selected ? `scale(1,1)` : 'scale(0.75,0.75)')};
    filter: ${props => (props.selected ? `none` : 'grayscale(0%)')};
    margin-left: 8px;
    margin-bottom: 8px;
    transition: filter 200ms, transform 200ms;
`
