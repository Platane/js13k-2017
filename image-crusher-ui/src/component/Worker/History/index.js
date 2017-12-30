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
        {history
            .slice(0, 10)
            .reverse()
            .map((r, i) => <Row key={r.parent.id + r.workerId} {...r} />)}
    </div>
)
