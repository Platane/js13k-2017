import { h } from 'preact'
import { Image } from '../../ImageFromAdn'

import style from './style.css'

const Row = ({ PARAM, parent, target, adn }) => (
    <div className={style.row}>
        <Image adn={parent.adn} param={PARAM} size={32} />

        {'->'}

        <Image adn={adn} param={PARAM} size={32} />
    </div>
)

export const History = ({ history }) => (
    <div className={style.container}>
        <div className={style.list}>
            {history.map(({ id, ...data }) => <Row key={id} {...data} />)}
        </div>
    </div>
)
