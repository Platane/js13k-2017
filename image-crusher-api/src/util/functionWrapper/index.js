export const wrap = run => async (req, res) => {
    try {
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        res.set('Access-Control-Allow-Headers', 'Authorization,Content-Type')

        if (req.method.toUpperCase() === 'OPTIONS') return res.send()

        const x = await run(req.body, req)

        res.statusCode = 200
        res.send(x)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err && err.toString())
    }
}
