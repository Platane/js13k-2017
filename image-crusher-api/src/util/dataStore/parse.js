import type { RImage, AncestorTree, Param } from './../../type'

export const parseImage = image => {
    const target: RImage = image.target.split(',').map(x => +x)
    const PARAM: Param = JSON.parse(image.PARAM)
    const ancestorTree: AncestorTree = JSON.parse(image.ancestorTree)

    const { url, artist, title } = image

    return { url, artist, title, target, PARAM, ancestorTree }
}

export const formatImage = ({
    target,
    PARAM,
    ancestorTree,
    url,
    title,
    artist,
}: {
    title: string | null,
    artist: string | null,
    url: string | null,
    target: RImage,
    PARAM: Param,
    ancestorTree: AncestorTree,
}) => {
    return {
        url,
        title,
        artist,
        target: target.join(','),
        PARAM: JSON.stringify(PARAM),
        ancestorTree: JSON.stringify(ancestorTree),
    }
}
