import * as material from '../material'

import type { Painting, WorldGrid } from '../../type'

const draw = (canvas, size, painting) => {
    const l = 512

    canvas.width = canvas.height = l

    const ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.rect(0, 0, l, l)
    ctx.fillStyle = '#fff'
    ctx.fill()

    painting.forEach((dot, i) => {
        ctx.beginPath()
        ctx.arc(
            dot.x / size * l,
            dot.y / size * l,
            dot.r / size * l,
            0,
            Math.PI * 2
        )
        ctx.fillStyle = 'rgb(' + dot.color + ')'
        ctx.globalAlpha = dot.opacity
        ctx.fill()
    })
}

const generatePainting = (painting: Painting) => {
    const size = 64

    const heights = painting.map(() => Math.random())

    const object = new THREE.Object3D()

    // paint drop
    painting.forEach((dot, i) => {
        const mat = new THREE.MeshBasicMaterial({
            transparent: true,
            // opacity: dot.opacity ,
        })

        mat.color.setRGB(...dot.color.map(x => x / 256))

        const geo = new THREE.SphereGeometry(
            Math.min(dot.r / size, 0.5),
            Math.ceil(dot.r / 3) + 1,
            Math.ceil(dot.r / 3) + 1
        )
        const mesh = new THREE.Mesh(geo, mat)

        object.add(mesh)
    })

    // painting as texture
    const canvas = document.createElement('canvas')
    const texture = new THREE.Texture(canvas)
    {
        texture.needsUpdate = true
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1, 1)

        const mat = material.createCanvas()
        mat.map = texture

        const geo = new THREE.PlaneGeometry(1, 1)
        const mesh = new THREE.Mesh(geo, mat)

        object.add(mesh)
    }

    let drawn_n = 0

    const update = k => {
        const n = Math.ceil(Math.max(0, 1 - k) * painting.length)

        if (n != drawn_n) {
            draw(canvas, size, painting.slice(0, (drawn_n = n)))
            texture.needsUpdate = true
        }

        painting.forEach((dot, i) => {
            const u = 1 - i / painting.length

            const z = Math.min(1, Math.max(0, (k - u) / 0.3))

            object.children[i].visible = z < 1 && i > n

            const s = 1 - z

            object.children[i].scale.set(s, s, s)

            object.children[i].position.set(
                (dot.x / size - 0.5) * (1 + z * 2),
                -(dot.y / size - 0.5) + z,
                z
            )
        })
    }

    update(100)

    return { object, update }
}

export const generatePaintings = (worldGrid: WorldGrid) => {
    const p = []

    const object = new THREE.Object3D()

    for (let x = 0; x < worldGrid.length; x++)
        for (let y = 0; y < worldGrid[0].length; y++)
            for (let k = 0; worldGrid[x][y] && k < 4; k++)
                if (worldGrid[x][y][k]) {
                    const u = generatePainting(worldGrid[x][y][k])

                    p.push(u)

                    const a = around[k]

                    u.object.position.set(
                        x + 0.5 + a.x * 0.505,
                        1,
                        y + 0.5 + a.y * 0.505
                    )

                    u.object.rotation.y = Math.PI / 2 * k

                    object.add(u.object)
                }

    const update = ({ position, direction }) =>
        p.forEach(p => {
            const x = position.x - p.object.position.x
            const y = position.y - p.object.position.z

            const d = Math.sqrt(x * x + y * y)

            const scal =
                1 - Math.max(0, -(x * direction.x + y * direction.y) / d)

            const k = Math.max(0, Math.min((d - 1.2) / 3)) * (3 + scal) / 3

            p.update(k)
        })

    return { object, update }
}
