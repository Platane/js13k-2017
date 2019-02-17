import React from 'react'
import styled from 'react-emotion'
import { RImage } from '../RImage'
import { Button } from '../../component/Button'

const m = { change: {}, enable: {} }

const createChangeTextEvent = (setSign, id) =>
    (m.change[id] = m.change[id] || (e => setSign(id, e.target.value)))

const createEnable = (setSign, id) =>
    (m.enable[id] = m.enable[id] || (() => setSign(id, ' ')))

export const RouteList = ({ route, param, setSign }) => (
    <Container>
        <List>
            {route.map(({ id, target, sign }) => (
                <Line id={id} draggable={true}>
                    <RImage param={param} rImage={target} size={64} />

                    {!!sign && (
                        <TextArea
                            onBlur={createChangeTextEvent(setSign, id)}
                            value={sign}
                        />
                    )}

                    {!sign && (
                        <Button onClick={createEnable(setSign, id)}>
                            enable
                        </Button>
                    )}
                </Line>
            ))}
        </List>
    </Container>
)

const List = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 4px;
`
const Line = styled.div`
    position: relative;
    padding: 4px;
    display: flex;
    flex-direction: row;
`
const TextArea = styled.textArea`
    resize: none;
    flex: 1 1 10px;
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: scroll;
`

const Painting = styled.div`
    flex: 0 0 auto;
    margin: 4px;
    font-size: 0;
`
