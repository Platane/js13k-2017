import { run } from '../index'

it(
    'should prune images',
    async () => await run(),
    // set timeout
    10 * 60 * 1000
)
