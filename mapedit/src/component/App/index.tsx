import React, { Component } from "react"
import { withCssReset } from "../_abstract/cssReset"
import { Canvas } from "../Canvas"
import styled from "react-emotion"

const App_ = props => (
    <Container>
        <Canvas {...props} width={600} height={400} />
    </Container>
)

const Container = styled.div``

export const App = withCssReset(App_)
