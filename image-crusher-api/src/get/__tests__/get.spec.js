import { run } from '../index'

it(
    'should get images',
    async () => {
        const images = await run()

        expect(images[0]).toHaveProperty('title')
        expect(images[0]).toHaveProperty('artist')
        expect(images[0]).toHaveProperty('url')
        expect(images[0]).toHaveProperty('target')
        expect(images[0]).toHaveProperty('PARAM')
        expect(images[0]).toHaveProperty('ancestorTree')
    },
    // set timeout
    120 * 1000
)
