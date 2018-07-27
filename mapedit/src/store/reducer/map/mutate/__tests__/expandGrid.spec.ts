import test from "tape"
import { expandGrid } from "../expandGrid"
import { Museum } from "type"

test("expandGrid", t => {
    const m: Museum = {
        origin: { x: 0, y: 0 },
        grid: [[true]],
        paintings: [],
    }

    const m1 = expandGrid(m, { x: -2, y: -1 }, { x: 1, y: 2 })

    t.deepEqual(m1, {
        origin: { x: -2, y: -1 },
        grid: [
            //
            [false, false, false, false],
            [false, false, true, false],
            [false, false, false, false],
            [false, false, false, false],
        ],
        paintings: [],
    })

    t.end()
})
