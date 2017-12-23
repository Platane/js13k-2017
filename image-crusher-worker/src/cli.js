const run = require('./run').run

const stats = []

const loop = async () => {
    console.log(
        'stats',
        stats.length &&
            Math.round(stats.reduce((s, x) => s + x, 0) / stats.length),
        'ms average'
    )

    const start = Date.now()

    try {
        await run()

        stats.push(Date.now() - start)
    } catch (err) {
        console.log(err)
    }

    loop()
}

loop()
