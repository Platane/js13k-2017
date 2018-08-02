export const togglePlayWindowAutoRefresh = () => ({
    type: 'playwindow:autorefresh:toggle',
})

export const openPlayWindow = () => ({
    type: 'playwindow:open',
})

export type Action =
    | {
          type: 'playwindow:open'
      }
    | {
          type: 'playwindow:autorefresh:toggle'
      }
