const readBody = request =>
    new Promise(resolve => {
        let buffer = ''

        request.on('data', x => (buffer += x))
        request.on('end', () => resolve(buffer))
    })

const safeParseJSON = x => {
    try {
        return JSON.parse(x)
    } catch (err) {
        return x
    }
}

export const wrap = run => async (req, res) => {
    try {
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        res.set('Access-Control-Allow-Headers', 'Authorization,Content-Type')

        const body = safeParseJSON(await readBody(req))

        res.writeHead(200)
        res.send(await run(body, req))
    } catch (err) {
        res.writeHead(500, err.toString())
        res.send(err)
    }
}
