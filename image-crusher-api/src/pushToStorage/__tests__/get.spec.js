import { run } from '../index'

it(
    'should publish res in bucker',
    async () => await run(),
    // set timeout
    10 * 60 * 1000
)
