import { State } from '../reducer/type'
import { Panel } from '../../type'

export const selectCurrentPanel = (state: State) => state.panel.current
export const selectAvailablePanels = (state: State) =>
    [
        // 'wallbuilder',
        'placepainting',
        'routebuilder',
        'downsizePainting',
    ] as Panel[]
