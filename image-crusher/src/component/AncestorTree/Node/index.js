import { h, Component } from 'preact'
import { Image } from '../Image'

import style from './style.css'

export const Node = ({ tree, size }) => (
    <div className={style.container} style={{ width: size, height: size }}>
        <Image adn={tree.adn} size={size} />
    </div>
)
