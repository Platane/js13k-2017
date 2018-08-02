import { clamp } from '../../../util/math'
import { Action } from '../../action'
import { State } from '../type'

const zoomLevel = [12, 16, 24, 36, 46, 60, 78, 90]

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:wheel': {
            if (state.dragCamera) break

            const _a = state.camera.a
            const _t = state.camera.t

            const p = action.pointer

            const i = zoomLevel.findIndex(x => x >= _a)

            const a =
                zoomLevel[clamp(0, zoomLevel.length - 1, i - action.delta)]

            const t = {
                x: p.x + (_a / a) * (_t.x - p.x),
                y: p.y + (_a / a) * (_t.y - p.y),
            }

            return {
                ...state,
                camera: { t, a },
            }
        }
    }

    return state
}
