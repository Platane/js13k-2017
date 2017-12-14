import { h, render, Component } from 'preact'

import { Image as Image_ } from '../Image'
import { Link } from '../Link'
import { images } from '../../images'
import styled from 'preact-emotion'

const Image = ({ src, alt }) => (
    <Image_
        style={{
            maxHeight: '400px',
            maxWidth: '90%',
            flexShrink: 1,
            margin: '10px',
        }}
        alt={alt}
        src={images[src] || src}
    />
)

const Heading = ({ importance, children }) => (
    <Heading_
        id={((children[0] && children[0].attributes.text) || '')
            .toLowerCase()
            .trim()
            .replace(/ +/g, '-')}
        importance={importance}
    >
        {children}
    </Heading_>
)

const Heading_ = styled.h2`
    margin: 0;
    margin-top: ${props =>
        (props.importance == 1 && '50px') ||
        (props.importance == 2 && '40px') ||
        '4px'};
    span {
        font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans',
            Geneva, Arial, sans-serif;
        font-size: ${props =>
            (props.importance == 1 && '40px') ||
            (props.importance == 2 && '28px') ||
            '22px'};
        font-weight: ${props => (props.importance <= 2 ? 'bold' : 'normal')};
    }
`

const component = {
    text: styled.span`
        font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
        font-size: 18px;
        line-height: 1.3em;
        margin: 0;
    `,
    bold: styled.span`
        font-weight: bold;
    `,
    italic: styled.span`
        font-style: italic;
    `,
    textBlock: styled.p`
        margin: 12px 0;
    `,
    imageGroup: styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `,
    codeBlock: styled.pre`
        padding: 10px 0;
        margin: 12px 0;
        background-color: #eee;
    `,
    quoteBlock: styled.div`
        margin: 12px 0;
        padding: 1px 0;
        margin-left: 12px;
        padding-left: 10px;
        border-left: solid 2px #888;
        background-color: #eee;
    `,
    list: styled.ul`
        & > * {
            display: list-item;
            margin: 8px 0;
        }
    `,
    link: Link,
    heading: Heading,
    image: Image,
}

const Tree = ({ type, children, title, meta, ...rest }) => {
    const C = component[type] || 'div'

    return (
        <C {...rest}>
            {rest.text ||
                children.map((c, i) => <Tree key={i} {...rest} {...c} />)}
        </C>
    )
}

export const Article = ({ content, ...props }) => (
    <Body>
        <Title>{content.title}</Title>
        <Tree {...props} {...content} />
    </Body>
)

const Title = styled.h1`
    font-family: helvetica, sans-serif;
    font-size: 60px;
    letter-spacing: 2px;
    font-weight: bold;
`
const Body = styled.div``
