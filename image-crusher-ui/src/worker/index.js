export const create = () => {
    const n = window.navigator.hardwareConcurrency || 2

    const stats = { workers: {}, history: [] }

    const onMessage = (id, { type, ...data }) => {
        const w = (stats.workers[id] = stats.workers[id] || {
            working: type === 'start',
            ...data,
            startDate: Date.now(),
        })

        stats.workers = {
            ...stats.workers,
            [id]: {
                working: type === 'start',
                ...data,
                startDate: Date.now(),
            },
        }

        if (type === 'end')
            stats.history = [{ ...data, workerId: id }, ...stats.history]

        if (r.onchange) r.onchange(stats)
    }

    const workerList = Array.from({ length: n }).map(() => {
        const w = new Worker('worker.js')

        w.id = Math.random()
            .toString(16)
            .slice(2, 6)

        w.onmessage = e => onMessage(w.id, e.data)

        return w
    })

    const terminate = () => workerList.forEach(w => w.terminate())

    const r = {
        terminate,
        onchange,
    }

    return r
}
