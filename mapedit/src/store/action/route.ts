export const setSign = (id: string, sign: string) => ({
    type: 'route:sign:set',
    id,
    sign,
})

export type Action = {
    type: 'route:sign:set'
    id: string
    sign: string
}
