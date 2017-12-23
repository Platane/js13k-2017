import { run } from '../index'
import * as PARAM from 'common/param'

const data = {
    PARAM,
    target: Array.from({ length: PARAM.SIZE * PARAM.SIZE * 3 }, () => 156),
}

// const data2 = require('./chambre.json')

const headers = {
    authorization: 'Bearer xxx',
}

it(
    'should create image',
    async () => await run(data, { req: { headers } }),
    // set timeout
    120 * 1000
)
