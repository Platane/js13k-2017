import { run as pushSolution } from '../index'
import { run as create } from '../../create'
import { run as get } from '../../get'

import * as PARAM from 'common/param'

const color = PARAM.COLOR_PALETTE[14]
const data = {
    PARAM,
    target: [].concat(
        ...Array.from({ length: PARAM.SIZE * PARAM.SIZE }, () => color)
    ),
}

const headers = {
    authorization: 'Bearer xxx',
}

it(
    'should push solution',
    async () => {
        const imageId = await create(data, { req: { headers } })

        const adn = [{ x: 32, y: 32, r: 20, c: color, a: 1 }]

        await pushSolution({ imageId, adn, parentId: 'root' })

        {
            const images = await get()

            const image = images.find(x => x.id === imageId)

            const node = image.ancestorTree.children[0]

            expect(node.adn).toEqual(adn)
            expect(node).toHaveProperty('fitness')
            expect(typeof node.fitness).toBe('number')
            expect(node).toHaveProperty('id')
        }
    },
    // set timeout
    10 * 60 * 1000
)
