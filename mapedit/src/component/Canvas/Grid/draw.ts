import { Museum, Camera } from "../../../type"
import { toScreen } from "../../../service/camera"

const drawGrid = (ctx, camera) => {
    const p = toScreen(camera)

    const l = 1000

    for (let k = -l; k <= l; k++) {
        ctx.strokeStyle = "#888"
        ctx.strokeWidth = 0.1
        ctx.lineWith = 1

        {
            const a = p({ x: l, y: k })
            const b = p({ x: -l, y: k })

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
        }

        {
            const a = p({ x: k, y: l })
            const b = p({ x: k, y: -l })

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
        }
    }
}

const drawWall = (ctx, camera, { grid, origin: o }) => {
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

export const draw = (ctx, camera: Camera, museum: Museum) => {
    drawWall(ctx, camera, museum)
    drawGrid(ctx, camera)
}
