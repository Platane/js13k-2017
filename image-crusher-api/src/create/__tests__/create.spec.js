import { run } from '../index'
import * as PARAM from '../../param'

const data = {
    ancestorTree: {
        adn: [],
        fitness: 99999999,
        children: [],
    },
    PARAM,
    target: Array.from({ length: PARAM.SIZE * PARAM.SIZE * 3 }, () => 255),
}

const data2 = require('./data.json')

it(
    'should create image',
    async () => await run(data2),
    // set timeout
    120 * 1000
)
