export const loadFileAsDataUrl = file =>
    new Promise(resolve => {
        const fr = new FileReader()

        fr.addEventListener('load', () => resolve(fr.result.toString()))

        fr.readAsDataURL(file)
    })

export const dataUrlToImage = (dataUrl: string) =>
    new Promise((resolve, reject) => {
        const img = new Image()

        img.addEventListener('load', () => resolve(img))

        img.src = dataUrl
    })

export const loadFileAsImage = file =>
    loadFileAsDataUrl(file).then(dataUrlToImage)

export const normalizeImage = (SIZE: number, img) => {
    const r = SIZE / Math.min(img.naturalWidth, img.naturalHeight)

    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = SIZE

    const ctx = canvas.getContext('2d')

    ctx.drawImage(
        img,
        (SIZE - img.naturalWidth * r) / 2,
        (SIZE - img.naturalHeight * r) / 2,
        img.naturalWidth * r,
        img.naturalHeight * r
    )

    return canvas
}
