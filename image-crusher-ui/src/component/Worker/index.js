import { h } from 'preact'
import withState from './hoc.state'
import { Workers } from './Workers'
import { History } from './History'

import style from './style.css'

const Worker_ = ({ workers, history, start, stop, running }) => (
    <div className={style.container}>
        {running && <History history={history} />}

        <div className={style.column}>
            {<Workers workers={workers} />}
            {running && <button onClick={stop}> stop workers </button>}
            {!running && <button onClick={start}> start workers </button>}
        </div>
    </div>
)

export const Worker = withState(Worker_)
