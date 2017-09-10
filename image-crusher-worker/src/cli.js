const run = require('./run').run

const loop = () => run().catch(err => console.log(err)).then(loop)

loop()
