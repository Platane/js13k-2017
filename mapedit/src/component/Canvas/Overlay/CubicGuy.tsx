import React from 'react'
import styled from 'react-emotion'

const Cube = ({ color, ...props }) => (
    <Object3D {...props}>
        <Face
            style={{
                backgroundColor: color,
                transform: `translate3d(0px,0px,-0.5px)`,
            }}
        />
        <Face
            style={{
                backgroundColor: color,
                transform: `translate3d(0px,0px,0.5px)`,
            }}
        />

        <Face
            style={{
                backgroundColor: color,
                transform: `translate3d(0px,-0.5px,0px) rotateX(90deg)`,
            }}
        />
        <Face
            style={{
                backgroundColor: color,
                transform: `translate3d(0px,0.5px,0px) rotateX(90deg)`,
            }}
        />

        <Face
            style={{
                backgroundColor: color,
                transform: `translate3d(0.5px,0px,0px) rotateX(90deg) rotateY(90deg)`,
            }}
        />
        <Face
            style={{
                backgroundColor: color,
                transform: `translate3d(-0.5px,0px,0px) rotateX(90deg) rotateY(90deg)`,
            }}
        />
    </Object3D>
)

const Object3D = styled.div`
    transform-style: preserve-3d;
    transform-origin: center;
    font-size: 0;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: visible;
`

const Face = styled(Object3D)`
    top: -0.5px;
    left: -0.5px;
    width: 1px;
    height: 1px;
`

export const CubicGuy = ({ light, color, ...props }) => (
    <Object3D
        style={{
            perspective: '100000000px',
            perspectiveOrigin: 'center center',
            transform:
                'translate3d(100px, 100px, 0px) rotateX(180deg) rotateY(0deg)',
        }}
    >
        <Cube
            color={color}
            light={light}
            style={{
                transform: 'translate3d(-15px,50px,0px) scale3d(30,24,30)',
            }}
        />
        <Cube
            color={color}
            light={light}
            style={{
                transform: 'translate3d(-10px,0px,3px) scale3d(20,50,26)',
            }}
        />
        <Cube
            color={color}
            light={light}
            style={{
                transform:
                    'translate3d(-22px,24px,0px) rotateZ(-8deg) scale3d(10,26,16)',
            }}
        />
        <Cube
            color={color}
            light={light}
            style={{
                transform:
                    'translate3d(12px,24px,0px) rotateZ(8deg) scale3d(10,26,16)',
            }}
        />
    </Object3D>
)
