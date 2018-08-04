import { Point } from '../../type'

export const togglePlayWindowAutoRefresh = () => ({
    type: 'playwindow:autorefresh:toggle',
})

export const openPlayWindow = () => ({
    type: 'playwindow:open',
})

export const updatePlayWindowGamePosition = (
    position: Point,
    orientation: Point
) => ({
    type: 'playwindow:gameposition:update',
    position,
    orientation,
})

export type Action =
    | {
          type: 'playwindow:open'
      }
    | {
          type: 'playwindow:autorefresh:toggle'
      }
    | {
          type: 'playwindow:gameposition:update'
          position: Point
          orientation: Point
      }
