import { Museum, Camera } from "../../../type"
import { toScreen } from "../../../service/camera"

const drawGrid = (ctx, camera) => {
    const p = toScreen(camera)

    const l = 1000

    for (let k = -l; k <= l; k++) {
        ctx.lineStyle = "#333"
        ctx.lineWith = 0.1

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

const drawWall = (ctx, camera, museum) => {
    const p = toScreen(camera)

    ctx.fillStyle = "#eee"

    for (let y = museum.grid.length; y--; )
        for (let x = museum.grid[y].length; x--; ) {
            const a = p({ x, y })

            ctx.beginPath()
            ctx.rect(a.x, a.y, camera.a, camera.a)
            ctx.fill()
        }

    ctx.fillStyle = "#ccc"

    for (let y = museum.grid.length; y--; )
        for (let x = museum.grid[y].length; x--; )
            if (museum.grid[y][x]) {
                const a = p({ x, y })

                ctx.beginPath()
                ctx.rect(a.x, a.y, camera.a, camera.a)
                ctx.fill()
            }
}

export const draw = (ctx, camera: Camera, museum: Museum) => {
    drawWall(ctx, camera, museum)
    drawGrid(ctx, camera)
}
