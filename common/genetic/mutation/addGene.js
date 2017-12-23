import { randomDot } from './randomDot'
import type { ADN, Param } from 'type'

export const addGene = (PARAM: Param, ancestor: ADN): ADN | null => {
    if (ancestor.length === PARAM.N_CIRCLE) return null

    const n = 8

    return [...ancestor, ...Array.from({ length: n }, () => randomDot(PARAM))]
}
