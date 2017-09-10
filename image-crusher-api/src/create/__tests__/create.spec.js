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

xit(
    'should create image',
    async () => await run(data),
    // set timeout
    120 * 1000
)
