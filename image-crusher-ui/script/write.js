const arr = require('./data.json')
const fs = require('fs')

const data = new Uint8Array(arr)

fs.writeFileSync('./pack.adn', data, { encoding: 'utf8' })
