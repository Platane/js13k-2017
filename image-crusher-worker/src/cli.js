const run = require('./run').run

let start

const onStart = () => {
    start = Date.now()
}

const onEnd = ({ adn }) => {
    console.log(`finished a ${adn.length} in ${Date.now() - start}ms`)
}

const o = { onStart, onEnd }

const loop = async () => {
    try {
        await run(o)

        stats.push(Date.now() - start)
    } catch (err) {
        console.log(err)
    }

    loop()
}

console.log('starting worker ...')

loop()
