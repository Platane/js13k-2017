import { h } from 'preact'
import { Image } from '../../ImageFromAdn'

import style from './style.css'

const mean = arr => arr.reduce((s, x) => s + x, 0) / arr.length

const getDurations = history => {
    const by_complexity = {}

    history.forEach(({ adn, duration }) =>
        (by_complexity[adn.length] = by_complexity[adn.length] || []).push(
            duration
        )
    )

    return Object.keys(by_complexity)
        .map(c => ({
            c,
            mean_duration: mean(by_complexity[c]),
        }))
        .sort((a, b) => (a.c < b.c ? 1 : -1))
}

const toDigit = n => x => {
    const s = x.toString()
    return '0'.repeat(n - s.length) + s
}

const formatDuration = x =>
    `${Math.floor(x / 60 / 1000)}min${toDigit(2)(Math.floor(x / 1000) % 60)}s`

export const Stats = ({ history }) => (
    <div className={style.container}>
        {getDurations(history).map(({ c, mean_duration }) => (
            <div className={style.item}>
                {`${c} ~ ${formatDuration(mean_duration)}`}
            </div>
        ))}
    </div>
)
