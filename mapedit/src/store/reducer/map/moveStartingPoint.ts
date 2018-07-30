import { Action } from '../../action'
import { State } from '../type'
import {  Orientation } from '../../../type'

const pointEqual = (a, b) => a.x === b.x && a.y === b.y

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:dragstartingpoint:start':
            return {
                ...state,
                dragStartingPoint: true,
            }

        case 'ui:drag:move':
            if (state.dragStartingPoint) {
                const startingPoint = {
                    x: Math.floor(action.pointer.x),
                    y: Math.floor(action.pointer.y),
                }

                const dx = (((action.pointer.x % 1) + 1) % 1) - 0.5
                const dy = (((action.pointer.y % 1) + 1) % 1) - 0.5

                const startingOrientation: Orientation = {
                    x: Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : -1) : 0,
                    y: Math.abs(dy) >= Math.abs(dx) ? (dy > 0 ? 1 : -1) : 0,
                } as any

                if (
                    !pointEqual(startingPoint, state.museum.startingPoint) ||
                    !pointEqual(
                        startingOrientation,
                        state.museum.startingOrientation
                    )
                )
                    return {
                        ...state,
                        museum: {
                            ...state.museum,
                            startingPoint,
                            startingOrientation,
                        },
                    }
            }

            break

        case 'ui:drag:end':
            return { ...state, dragStartingPoint: null }
    }

    return state
}
