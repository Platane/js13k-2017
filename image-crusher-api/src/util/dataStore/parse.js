import type { RImage, AncestorTree, Param } from './../../type'

export const parseImage = image => {
    const target: RImage = image.target.split(',').map(x => +x)
    const PARAM: Param = JSON.parse(image.PARAM)
    const ancestorTree: AncestorTree = JSON.parse(image.ancestorTree)

    return { target, PARAM, ancestorTree }
}

export const formatImage = ({
    target,
    PARAM,
    ancestorTree,
}: {
    target: RImage,
    PARAM: Param,
    ancestorTree: AncestorTree,
}) => {
    return {
        target: target.join(','),
        PARAM: JSON.stringify(PARAM),
        ancestorTree: JSON.stringify(ancestorTree),
    }
}
