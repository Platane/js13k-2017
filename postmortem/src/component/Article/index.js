import { h, render, Component } from 'preact'

import { Image as Image_ } from '../Image'
import { Link } from '../Link'
import { images } from '../../images'
import styled from 'styled-components'

const Image = ({ src, alt }) => (
    <Image_
        style={{ maxHeight: '400px', maxWidth: '90%', flexShrink: 1, margin: '10px' }}
        alt={alt}
        src={images[src] || src}
    />
)

const component = {
    text: styled.p`
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
    textBlock: styled.div`
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

        & > *{
            display: list-item;
        }
    `,
    link: Link,
    heading: styled.h1`
        margin: 0;
        p {
            font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans',
                Geneva, Arial, sans-serif;
            font-size: ${props =>
                (props.importance == 1 && '26px') ||
                (props.importance == 2 && '24px') ||
                '22px'};
            font-weight: ${props => (props.importance < 2 ? 'bold' : 'normal')};
        }
    `,
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
        <Tree {...props} {...content} />
    </Body>
)

const Body = styled.div``
