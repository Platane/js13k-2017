export default run => (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')

    run(req)
        .then(x => {
            res.writeHead(200)
            res.send(x)
        })
        .catch(err => {
            res.writeHead(500, err.toString())
        })
}
