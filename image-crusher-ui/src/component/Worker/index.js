import { h } from 'preact'
import withState from './hoc.state'
import { Workers } from './Workers'
import { History } from './History'

const Worker_ = ({ workers, history, start, stop, running }) => (
    <div>
        {<History history={history} />}

        {<Workers workers={workers} />}

        {running && <button onClick={stop}> stop workers </button>}
        {!running && <button onClick={start}> start workers </button>}
    </div>
)

export const Worker = withState(Worker_)
