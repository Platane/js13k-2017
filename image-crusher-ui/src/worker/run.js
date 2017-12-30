import { run as runOne } from '../_worker/run'

const run = async () => {
    let startDate = 0
    let id = null

    const onStart = x => {
        startDate = Date.now()
        id = Math.random()
            .toString(16)
            .slice(2)

        postMessage({ type: 'start', id, ...x })
    }

    const onEnd = x => {
        postMessage({ type: 'end', id, duration: Date.now() - startDate, ...x })
    }

    while (true) await runOne({ onEnd, onStart })
}

run()
