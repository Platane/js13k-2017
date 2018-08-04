import { selectMuseumAsBinary } from '../store/selector/binary'
import { updatePlayWindowGamePosition } from '../store/action'
import {
    selectStableMuseum,
    selectStableMuseumCenter,
} from '../store/selector/museum'
import { throttle } from '../util/time'
import { Museum } from '../type'

const url = '/game?local=1'
const features =
    'height=600,width=800,location=no,status=no,toolbar=no,centerscreen=yes'

const getDelta = (museum: Museum, museumCenter: Museum) => ({
    x: museum.startingPoint.x - museumCenter.startingPoint.x,
    y: museum.startingPoint.y - museumCenter.startingPoint.y,
})

export const attachToStore = store => {
    let win = null

    window.onbeforeunload = () => win && win.close()

    const isWindowOpened = () => win && win.location && win.location.reload

    const refresh = (forceFocus, resetPosition) => {
        if (!isWindowOpened()) {
            win = window.open(url, '_blank', features)

            if (win) win.onclose = () => (win = null)
        } else {
            if (win.refreshMap) win.refreshMap(false, resetPosition)
            else win.location.reload()
        }

        if (isWindowOpened() && forceFocus) win.focus()
    }

    let lastRefreshKey = null
    let lastMuseum = null
    let lastDelta = null

    const update = () => {
        const state = store.getState()

        const { playWindow } = state

        const museum = selectStableMuseum(state)

        if (
            (lastMuseum != museum &&
                playWindow.autorefresh &&
                isWindowOpened()) ||
            lastRefreshKey != playWindow.refreshKey
        ) {
            const forceFocus = lastRefreshKey != playWindow.refreshKey

            const delta = getDelta(museum, selectStableMuseumCenter(state))

            const resetPosition =
                !lastDelta ||
                (lastDelta.x === delta.x && lastDelta.y === delta.y)
                    ? null
                    : {
                          x: playWindow.position.x - delta.x,
                          y: playWindow.position.y - delta.y,
                      }

            lastRefreshKey = playWindow.refreshKey
            lastMuseum = museum
            lastDelta = delta

            localStorage.setItem(
                'museumAsBinary',
                selectMuseumAsBinary(state).join(',')
            )

            refresh(forceFocus, resetPosition)
        }
    }

    window.updateGamePosition = throttle(80)(({ position, direction }) =>
        store.dispatch(
            updatePlayWindowGamePosition(
                { x: position.x + lastDelta.x, y: position.y + lastDelta.y },
                { ...direction }
            )
        )
    )

    store.subscribe(update)

    update()
}
