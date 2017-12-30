import { h } from 'preact'
import { Image } from '../../ImageFromAdn'

import style from './style.css'

const Worker = ({ working, PARAM, parent, target }) => (
    <div className={style.item}>
        {working && <Image adn={parent.adn} param={PARAM} size={32} />}

        {working && `${parent.adn.length} -> ${parent.adn.length + 8}`}

        {!working && 'idle'}
    </div>
)

export const Workers = ({ workers }) => (
    <div className={style.container}>
        {Object.keys(workers).map(id => <Worker key={id} {...workers[id]} />)}
    </div>
)
