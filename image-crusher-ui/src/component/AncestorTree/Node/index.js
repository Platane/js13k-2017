import { h, Component } from 'preact'
import { Image } from '../../ImageFromAdn'

import style from './style.css'

export const Node = ({ tree, size, param }) => (
    <div className={style.container} style={{ width: size, height: size }}>
        <Image adn={tree.adn} size={size} param={param} />
    </div>
)
