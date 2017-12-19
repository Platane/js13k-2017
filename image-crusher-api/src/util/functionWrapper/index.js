const readBody = request =>
    new Promise((resolve, reject) => {
        let buffer = ''

        request.on('data', x => (buffer += x) && console.log(buffer))
        request.on('end', () => resolve(buffer))
        request.on('error', reject)
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

        console.log(req.method)

        console.log(req.body, req.data)
        console.log(req)

        if (req.method.toUpperCase() === 'OPTIONS') return res.send()

        const body = safeParseJSON(await readBody(req))

        console.log(body)

        const x = await run(body, req)

        res.statusCode = 200
        res.send(x)
    } catch (err) {
        console.log(error)
        res.statusCode = 500
        res.send(err && err.toString())
    }
}
