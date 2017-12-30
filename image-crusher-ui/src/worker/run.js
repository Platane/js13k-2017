import { run as runOne } from '../_worker/run'

const run = async () => {
    let startDate = 0

    const onStart = x => {
        startDate = Date.now()

        postMessage({ type: 'start', ...x })
    }

    const onEnd = x => {
        postMessage({ type: 'end', duration: startDate - Date.now(), ...x })
    }

    while (true) await runOne({ onEnd, onStart })
}

run()
