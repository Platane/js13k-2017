import { Panel } from '../../type'

export const setPanel = (panel: Panel) => ({
    type: 'ui:panel:set',
    panel,
})

export type Action = {
    type: 'ui:panel:set'
    panel: Panel
}
