import { run } from '../index'

it(
    'should get next job',
    async () => {
        const x = await run()

        expect(x).toHaveProperty('target')
        expect(x).toHaveProperty('PARAM')
        expect(x).toHaveProperty('imageId')
        expect(x.parent).toHaveProperty('fitness')
        expect(x.parent).toHaveProperty('adn')
        expect(x.parent).toHaveProperty('id')
    },
    // set timeout
    120 * 1000
)
