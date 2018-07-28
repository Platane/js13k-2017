import { Museum, Camera } from "../../../type"
import { toScreen } from "../../../service/camera"

const drawGrid = (ctx: CanvasRenderingContext2D, camera: Camera) => {
    const p = toScreen(camera)

    const l = 1600 / camera.a

    const tx = Math.floor(camera.t.x)
    const ty = Math.floor(camera.t.y)

    for (let k = -1; k <= l; k++) {
        ctx.strokeStyle = "#888"
        ctx.lineWidth = 0.5

        {
            const a = p({ x: l + tx, y: k + ty })
            const b = p({ x: -l + tx, y: k + ty })

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
        }

        {
            const a = p({ x: k + tx, y: l + ty })
            const b = p({ x: k + tx, y: -l + ty })

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
        }
    }
}

const drawWall = (
    ctx: CanvasRenderingContext2D,
    camera: Camera,
    { grid, origin: o }: Museum
) => {
    const p = toScreen(camera)

    ctx.fillStyle = "#f8f8f8"

    for (let y = grid.length; y--; )
        for (let x = grid[y].length; x--; ) {
            const a = p({ x: x + o.x, y: y + o.y })

            ctx.beginPath()
            ctx.rect(a.x, a.y, camera.a, camera.a)
            ctx.fill()
        }

    ctx.fillStyle = "#ccc"

    for (let y = grid.length; y--; )
        for (let x = grid[y].length; x--; )
            if (grid[y][x]) {
                const a = p({ x: x + o.x, y: y + o.y })

                ctx.beginPath()
                ctx.rect(a.x, a.y, camera.a, camera.a)
                ctx.fill()
            }
}

const drawPaintings = (
    ctx: CanvasRenderingContext2D,
    camera: Camera,
    { paintings }: Museum
) => {
    const p = toScreen(camera)

    ctx.save()
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 3

    paintings.forEach(({ cell, orientation }) => {
        ctx.beginPath()

        const a = p({
            x: cell.x + 0.5 + orientation.x * 0.5 + orientation.y * 0.4,
            y: cell.y + 0.5 + orientation.y * 0.5 - orientation.x * 0.4,
        })
        const b = p({
            x: cell.x + 0.5 + orientation.x * 0.5 - orientation.y * 0.4,
            y: cell.y + 0.5 + orientation.y * 0.5 + orientation.x * 0.4,
        })

        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
    })

    ctx.restore()
}

export const draw = (
    ctx: CanvasRenderingContext2D,
    camera: Camera,
    museum: Museum
) => {
    drawWall(ctx, camera, museum)
    drawGrid(ctx, camera)
    drawPaintings(ctx, camera, museum)
}
