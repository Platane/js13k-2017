type ImageVersion = { dimension: [number, number], url: string }

type ImageBundle = ImageVersion[]

const defaultBlur =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8DtXNJsAAAAASUVORK5CYII='

/**
 *  select the best image in a array on image version
 *  the startegy is "take the smaller which is larger or equal"
 */
export const selectBestImage = (
    imageVersions: ImageVersion[],
    width: number,
    height: number
): ?ImageVersion => {
    const error = (w, h) =>
        Math.abs(w - width) / width + Math.abs(h - height) / height

    return imageVersions.reduce(
        (best, x) =>
            !best || error(...best.dimension) > error(...x.dimension)
                ? x
                : best,
        null
    )
}

const isDataUrl = url => url.slice(0, 10) === 'data:image'

/**
 * create a store which is meant to be used as singleton
 */
export const createStore = () => {
    const imageLoaded = {}

    return {
        isImageLoaded: url => !!(url && (isDataUrl(url) || imageLoaded[url])),

        flagAsLoaded: url => void (url && (imageLoaded[url] = true)),

        getBlur: (image): string =>
            (image.find(x => isDataUrl(x.url)) || { url: defaultBlur }).url,

        getBestResolution: (image, width, height): string =>
            selectBestImage(image, width, height).url,
    }
}

export const imageLoadedStore = createStore()
