import { run } from '../run'
import type { Param } from '../type'

const PARAM = {
    CONVERGED_WHEN_UNCHANGED_SINCE: 1,
    N_BATCH: 1,
}

xit(
    'should run without crashing',
    async () => await run({ PARAM }),
    // set timeout
    120 * 1000
)
