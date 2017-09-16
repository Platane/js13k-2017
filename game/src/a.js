////////////////////////////
/// Params /////////////////
////////////////////////////

const rand = arr => arr[Math.floor(arr.length * Math.random())]

// painting param
const SIZE = 64
const OPACITY_AVAILABLE = [0.2, 0.5, 0.8, 1]
const RADIUS_AVAILABLE = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    10,
    12,
    14,
    16,
    18,
    22,
    26,
    30,
    36,
    40,
]

const COLOR_PALETTE = []

// prettier-ignore
for(let r=0;r<256;r+= 50)
for(let v=0;v<256;v+= 50)
for(let b=0;b<256;b+= 50)
    COLOR_PALETTE.push([r,v,b]);

// materials
const wall = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 })
const lat = new THREE.MeshPhongMaterial({ color: 0xc8c8c8 })
const ceiling = new THREE.MeshBasicMaterial({ color: 0x888888 })

// map

const l = [
    SIZE,
    SIZE,
    RADIUS_AVAILABLE.length,
    COLOR_PALETTE.length,
    OPACITY_AVAILABLE.length,
].map(x => Math.ceil(Math.log(x) / Math.LN2))

const n_dot = l.reduce((sum, l) => sum + l, 0)

const readNumber = (a, b, arr) => {
    let sum = 0

    for (let k = a; k < b; k++) {
        const bit = !!(arr[Math.floor(k / 8)] & (1 << (k % 8)))

        sum += +bit << (k - a)
    }

    return sum
}

const arrayToDot = arr => ({
    x: arr[0],
    y: arr[1],
    r: RADIUS_AVAILABLE[arr[2]],
    color: COLOR_PALETTE[arr[3]],
    opacity: OPACITY_AVAILABLE[arr[4]],
})

const unpackADN = buffer => {
    const adn = []
    let offset = 0

    while (offset <= buffer.length * 8 - n_dot) {
        adn.push(
            arrayToDot(
                l.map(l => {
                    const o = offset
                    offset = offset + l

                    return readNumber(o, offset, buffer)
                })
            )
        )
    }

    return adn
}

const readPainting = path =>
    fetch(path)
        .then(x => x.arrayBuffer())
        .then(x => unpackADN(new Uint8Array(x)))

const hslToRgb = (h, s, l) => {
    let r, g, b

    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

const paintings = Array.from({ length: 30 }, () => {
    const hues = [Math.random(), Math.random()]

    return Array.from({ length: 30 }, (_, i) => ({
        x: Math.random() * 64,
        y: Math.random() * 64,
        r: Math.random() * 30,
        color: hslToRgb(
            hues[+(i > 15)],
            Math.random() * 0.5,
            Math.random() * 0.6 + 0.2
        ),
        opacity: Math.random(),
    }))
})

let step = 1

const texts = [
    [
        ['Oups, you are lost in a museum'],
        [],
        ['Find your way out!'],
        [],
        ['First stop:'],
        ['Find "La Joconde"'],
    ],
    [
        ['Good!'],
        [],
        ['Next:'],
        ['Find "Starry nigth"'],
        ['by Van Gogh'],
        ['in the room to your'],
        ['left'],
    ],
    [
        ['Nice!'],
        [],
        ['Next stop:'],
        ['"The creation '],
        ['of Adam"'],
        ['by Michelangelo'],
        ['further in this room'],
    ],
    [
        ['Great!'],
        [],
        ['Find "Scream"'],
        ['by Munch'],
        ['in the room to your'],
        ['right'],
    ],
    [
        ['OK!'],
        [],
        ['Next:'],
        ['"The Great Wave"'],
        ['by Hokusai'],
        ['in this room'],
    ],
    [
        ['Nice!'],
        [],
        ['Next:'],
        ['"La liberté"'],
        ['by Delacroix'],
        ['in the next room'],
    ],
    [['Nice!'], [], ["it's 12h30"], ['no more time'], ["let's say you win"]],
]

const worldMap =
    '                                                                                    \n' +
    '           ###########################                                                   \n' +
    '           #                        ###########################                       \n' +
    '           #                        #                         ##########                        \n' +
    '     #######   ##b#  ##6#   ##b#    #                         #        #                \n' +
    '     #     #                            r      r      4       #####    #                    \n' +
    '     7                                                                 #               \n' +
    '     9                                                                 #                \n' +
    '     8     #                            5      r      r       ##########                        \n' +
    '     #     #   ##t#  ##t#   ##t#    #                         #                         \n' +
    '           #                        #                         #                         \n' +
    '           #                        #####################  ####                           \n' +
    '           ####################   #######################  #                             \n' +
    '                 #                    ###################  ####                                             \n' +
    '                 #                    ##   #       #       #                            \n' +
    '                 #                    ##   r       l       3                             \n' +
    '                 #                         #       #       #                            \n' +
    '                 #############   #######       #       #   #                                  \n' +
    '                          ####   ####  #       l       l   #                            \n' +
    '                          #         #  #       #       #   ######                             \n' +
    '                          #         #  #       #       #        #                       \n' +
    '                          r         l  #       l       l   #### #                           \n' +
    '                          #         ####       #       #   #  # #                           \n' +
    '                          #    1           2       #       #  # #                        \n' +
    '                          #         ####   r       l       #  # #                            \n' +
    '                          r         l  #   #       #       #  # #                          \n' +
    '                          #         #  ################ ####### #                                          \n' +
    '                          #         #                 #         #                       \n' +
    '                          #### ######                 ###########                             \n' +
    '                             #   #                                                      \n' +
    '                             #   #                                                         \n' +
    '                             ####                                                       '

const getCell = x => {
    switch (x) {
        // mona lisa
        case '1':
            return [null, 1, null, null]

        /// starry night
        case '2':
            return [null, null, 2, null]

        //  michelangelo
        case '3':
            return [null, null, 3, null]

        // scream
        case '4':
            return [4, null, null, null]

        // the great wave
        case '5':
            return [5, null, null, null]

        // delacroix
        case '6':
            return [null, 6, null, null]

        // 7 chamber
        case '7':
            return [7, null, null, null]

        // 8 keith
        case '8':
            return [8, null, null, null]

        // 9 mondrian
        case '9':
            return [9, null, null, null]

        case 'l':
            return [null, null, Math.floor(Math.random() * 10) + 20, null]
        case 't':
            return [null, null, null, Math.floor(Math.random() * 10) + 20]
        case 'r':
            return [Math.floor(Math.random() * 10) + 20, null, null, null]
        case 'b':
            return [null, Math.floor(Math.random() * 10) + 20, null, null]

        default:
            return [null, null, null, null]
    }
}

const world = {
    worldGrid: worldMap
        .split('\n')
        .map(line => line.split('').map(c => (c === ' ' ? 0 : getCell(c)))),

    tim: {
        position: { x: 30.5, y: 31.5 },
        direction: { x: 0, y: 1 },
    },

    control: {
        direction: { x: 0, y: 0 },
    },
}

////////////////////////////
/// World Logic ////////////
////////////////////////////

const around = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },

    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
]

const isInside = (grid, x, y) =>
    x >= 0 && x < grid.length && y >= 0 && y < grid[0].length

const isWall = (grid, x, y) => !isInside(grid, x, y) || grid[x][y]

const getClosestWall = (p, grid) => {
    const gx = Math.floor(p.x)
    const gy = Math.floor(p.y)

    return around.reduce((best, dir) => {
        const x = gx + dir.x
        const y = gy + dir.y

        // is a wall
        if (isWall(grid, x, y)) {
            const dx = dir.x === 0 ? 0 : dir.x > 0 ? 1 - p.x % 1 : p.x % 1
            const dy = dir.y === 0 ? 0 : dir.y > 0 ? 1 - p.y % 1 : p.y % 1

            const d = Math.sqrt(dx * dx + dy * dy)

            return !best || best.d > d ? { x, y, dir, d } : best
        } else return best
    }, null)
}

const tick = () => {
    // make tim walk

    const { position, direction } = world.tim
    const control = world.control

    position.x += direction.x * control.direction.y * 0.05
    position.y += direction.y * control.direction.y * 0.05

    const closestWall = getClosestWall(position, world.worldGrid)

    const L = 0.2

    if (closestWall && closestWall.d < L) {
        const r = L - closestWall.d

        position.x -= r * closestWall.dir.x
        position.y -= r * closestWall.dir.y
    }
}

////////////////////////////
/// Component///////////////
////////////////////////////

//// component tim
////
document.onkeydown = e => e.which == 32 && (world.control.direction.y = 1)

document.onkeyup = e => e.which == 32 && (world.control.direction.y = 0)

document.ontouchstart = e => (world.control.direction.y = 1)

document.ontouchend = e => (world.control.direction.y = 0)

AFRAME.registerComponent('tim', {
    init: function() {
        {
            const geom = new THREE.BoxGeometry(0.1, 0.1, 0.1)
            const mat = new THREE.MeshLambertMaterial({ color: 0x2193ae })
            const mesh = new THREE.Mesh(geom, mat)

            this.el.object3D.add(mesh)
        }
    },
    tick: function() {
        const direction = this.el.children[0].object3D.rotation.y

        world.tim.direction.x = -Math.sin(direction)
        world.tim.direction.y = -Math.cos(direction)

        tick()

        this.el.object3D.position.set(
            world.tim.position.x,
            0.6,
            world.tim.position.y
        )
    },
})

//// component museum
////

const L = 0.28
const K = 100

const planeGeom = new THREE.PlaneBufferGeometry(1, 1)

const getU = (n, i, k) =>
    Math.max(0, Math.min(1, (k - (1 - L) * (n - i) / n) / L))

const getDisplacement = (x, y, u, t) => {
    const seed = ((x * 36 + y * y * x * 137 + x * x * 89) % 37) / 37

    // u = 1 - (1 - u) * (1 - u)

    const s = Math.sin((1 + seed) * 0.045 * t) * u
    const c = Math.cos((1 + seed) * 0.035 * t) * u

    const vx = x - 0.5 + (x < 0.5 ? -0.4 : 0.4)
    const vy = y - 0.5

    return {
        x: x + vx * u + s * 0.2,
        y: y + vy * u + c * 0.17,
        z: u * (0.6 + seed * 0.6 + s * 0.23 * (1 + seed)),

        s: 0.3 + (1 - u) * 0.7,
    }
}

const draw = (canvas, size, painting, text, k, t) => {
    const l = 512

    canvas.width = canvas.height = l

    const ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.rect(0, 0, l, l)
    ctx.fillStyle = '#fff'
    ctx.fill()

    painting.forEach((dot, i) => {
        const u = getU(painting.length, i, k)
        const d = getDisplacement(dot.x / size, dot.y / size, u, t)

        const dotr = dot.r * d.s / size

        const r = d.z > dotr ? 0 : Math.sqrt(dotr * dotr - d.z * d.z)

        ctx.beginPath()

        ctx.arc(d.x * l, d.y * l, r * l, 0, Math.PI * 2)
        ctx.fillStyle = 'rgb(' + dot.color + ')'
        ctx.globalAlpha = dot.opacity
        ctx.fill()
    })

    if (k > 0.8 && text) {
        ctx.globalAlpha = (k - 0.8) / 0.2
        text.forEach((t, i) => {
            ctx.fillStyle = '#333'
            ctx.font = '50px Helvetica'
            // ctx.beginPath()
            ctx.fillText(t, 50, i * 60 + 100)
        })
    }
}

const generatePainting = i => {
    const size = 64

    const object = new THREE.Object3D()

    const painting = paintings[i]
    const text = texts[i]

    // paint drop
    painting.forEach((dot, i) => {
        const mat = new THREE.MeshLambertMaterial({
            // transparent: true,
            // opacity: dot.opacity ,
        })

        mat.color.setRGB(...dot.color.map(x => x / 256))

        const geo = new THREE.SphereBufferGeometry(
            Math.min(dot.r / size, 0.5),
            Math.ceil(dot.r / 4) + 4,
            Math.ceil(dot.r / 4) + 4
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

        const mat = new THREE.MeshBasicMaterial()
        mat.map = texture

        const mesh = new THREE.Mesh(planeGeom, mat)
        mesh.position.z = 0.02

        object.add(mesh)

        const frame = new THREE.Mesh(planeGeom, lat)
        frame.position.z = 0.01
        frame.scale.set(1.1, 1.1, 1.1)
        object.add(frame)
    }

    let drawn_n = -1
    let ex_k = -1

    const update = (k, t) => {
        if (i > step) k = 0

        if (i == step && k > 0.9) step++

        if (k > 0 || Math.abs(k - ex_k) > 0.1 || (ex_k > 0 && k == 0)) {
            draw(canvas, size, painting, text, (ex_k = k), t)
            texture.needsUpdate = true

            painting.forEach((dot, i) => {
                const u = getU(painting.length, i, k)
                const d = getDisplacement(dot.x / size, dot.y / size, u, t)

                object.children[i].visible = u > 0

                object.children[i].scale.set(d.s, d.s, d.s * u)

                object.children[i].position.set(
                    d.x - 0.5,
                    -(d.y - 0.5),
                    d.z - 0.1
                )
            })
        }
    }

    update(0, 0)

    return { object, update, t: 0 }
}

const generatePaintings = worldGrid => {
    const p = []

    const object = new THREE.Object3D()

    for (let x = 0; x < worldGrid.length; x++)
        for (let y = 0; y < worldGrid[0].length; y++)
            for (let k = 0; worldGrid[x][y] && k < 4; k++)
                if (worldGrid[x][y][k]) {
                    const u = generatePainting(worldGrid[x][y][k])

                    p.push(u)

                    const a = around[k]

                    const l = 0.6 + 0.35 * Math.random()

                    u.object.scale.set(l, l, l)
                    u.object.position.set(
                        x + 0.5 + a.x * 0.505,
                        1,
                        y + 0.5 + a.y * 0.505
                    )

                    u.object.rotation.y = Math.PI / 2 * k

                    object.add(u.object)
                }

    let t = 0
    let prev_direction = { x: 0, y: 0 }

    const update = ({ position, direction }) => {
        t += 1

        p.forEach((p, i) => {
            const x = position.x - p.object.position.x
            const y = position.y - p.object.position.z

            const d = Math.sqrt(x * x + y * y)

            const scal = Math.max(0, -(x * direction.x + y * direction.y) / d)

            if (d < 3 && scal > 0.92) {
                p.t = Math.min(K + 50, p.t + 1)
            } else p.t = Math.max((p.t + 1) * 0.98 - 2, 0)

            p.update(Math.max(0, (p.t - 50) / K), t)
        })
    }

    return { object, update }
}

const generateMazeObject = world => {
    const maze = new THREE.Object3D()

    const w = world.length
    const h = world[0].length

    // wall mat
    const wall = new THREE.MeshLambertMaterial()
    {
        const canvas = document.createElement('canvas')
        canvas.height = 1
        canvas.width = 128
        const ctx = canvas.getContext('2d')
        for (let i = 128; i--; ) {
            ctx.beginPath()
            ctx.rect(i, 0, 1, 1)

            ctx.fillStyle =
                i >= 120
                    ? '#888'
                    : `hsl(0, 0%, ${94 + Math.min(1, i / 60) * 6}%)`
            ctx.fill()
        }

        const texture = new THREE.Texture(
            canvas,
            THREE.UVMapping,
            THREE.ClampToEdgeWrapping,
            THREE.NearestFilter,
            THREE.LinearFilter
        )
        texture.needsUpdate = true
        texture.repeat.set(1, 1)

        wall.map = texture
    }

    // floor mat
    const floor = new THREE.MeshLambertMaterial()
    {
        const canvas = document.createElement('canvas')
        canvas.width = 16
        canvas.height = 1
        const ctx = canvas.getContext('2d')
        for (let i = 16; i--; ) {
            ctx.beginPath()
            ctx.rect(i, 0, 1, 1)

            const h = 32 + (0 | (8 * Math.random()))
            const l = 22 + (0 | (20 * Math.random()))

            ctx.fillStyle = `hsl(${h}, 55%, ${l}%)`
            ctx.fill()
        }

        const texture = new THREE.Texture(
            canvas,
            THREE.UVMapping,
            THREE.RepeatWrapping,
            THREE.NearestFilter,
            THREE.NearestFilter
        )
        texture.needsUpdate = true
        texture.repeat.set(10, 1)

        floor.map = texture
    }

    // floor
    {
        const geom = new THREE.PlaneBufferGeometry(w, h)
        const mesh = new THREE.Mesh(geom, floor)
        mesh.position.set(w / 2, 0, h / 2)
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        maze.add(mesh)
    }

    // wall
    {
        const geom = new THREE.Geometry()

        geom.faceVertexUvs = [[]]

        const faces = [[], [], [], []]

        const top = new THREE.Vector2(1, 0)
        const bottom = new THREE.Vector2(0, 0)

        for (let x = world.length; x--; )
            for (let y = world[0].length; y--; )
                if (world[x][y])
                    for (let u = 0; u < 4; u++)
                        if (!isWall(world, x + around[u].x, y + around[u].y))
                            faces[u].push({
                                x: x + around[u].x,
                                y: y + around[u].y,
                            })

        for (let i = 0; i < 4; i++) {
            const f = faces[i]
            const v = around[i].y ? 'y' : 'x'
            const u = v === 'y' ? 'x' : 'y'
            const dir = around[i].y + around[i].x

            while (f.length) {
                const j = f.shift()

                let a = j[u]
                let b = a

                const anchor = j[v]

                let fl = -1
                while (fl != f.length) {
                    fl = f.length
                    for (let k = f.length; k--; )
                        if (f[k][v] === anchor) {
                            if (f[k][u] === a - 1) {
                                f.splice(k, 1)
                                a = a - 1
                            } else if (f[k][u] === b + 1) {
                                f.splice(k, 1)
                                b = b - 1
                            }
                        }
                }

                const m = Array.from({ length: 4 }, (_, j) => {
                    const p = new THREE.Vector3(0, 0, 0)
                    p[v] = anchor + (i > 1 ? 1 : 0)
                    p[u] = j % 2 ? a : b + 1

                    p.z = p.y
                    p.y = +(j > 1)
                    return p
                })

                if (i == 3 || i == 0) {
                    geom.faceVertexUvs[0][geom.faces.length] = [
                        top,
                        top,
                        bottom,
                    ]
                    geom.faceVertexUvs[0][geom.faces.length + 1] = [
                        bottom,
                        bottom,
                        top,
                    ]
                    geom.faces.push(
                        new THREE.Face3(
                            geom.vertices.length + 1,
                            geom.vertices.length,
                            geom.vertices.length + 2
                        ),
                        new THREE.Face3(
                            geom.vertices.length + 2,
                            geom.vertices.length + 3,
                            geom.vertices.length + 1
                        )
                    )
                } else {
                    geom.faceVertexUvs[0][geom.faces.length] = [
                        top,
                        top,
                        bottom,
                    ]
                    geom.faceVertexUvs[0][geom.faces.length + 1] = [
                        top,
                        bottom,
                        bottom,
                    ]
                    geom.faces.push(
                        new THREE.Face3(
                            geom.vertices.length,
                            geom.vertices.length + 1,
                            geom.vertices.length + 2
                        ),
                        new THREE.Face3(
                            geom.vertices.length + 1,
                            geom.vertices.length + 3,
                            geom.vertices.length + 2
                        )
                    )
                }

                geom.vertices.push(...m)
            }
        }

        geom.computeFlatVertexNormals()
        geom.computeFaceNormals()
        geom.verticesNeedUpdate = true
        geom.normalsNeedUpdate = true
        geom.uvsNeedUpdate = true

        const mesh = new THREE.Mesh(geom, wall)
        mesh.scale.set(1, 3, 1)
        maze.add(mesh)
    }

    // {
    //     const geom = new THREE.BoxBufferGeometry(1, 0.2, 1)
    //     const geomlat = new THREE.BoxBufferGeometry(1.01, 0.2, 1.01)
    //
    //     for (let x = world.length; x--; )
    //         for (let y = world[0].length; y--; )
    //             if (world[x][y]) {
    //                 const mesh = new THREE.Mesh(geom, wall)
    //                 mesh.position.set(x + 0.5, 0.8, y + 0.5)
    //
    //                 mesh.castShadow = true
    //                 mesh.receiveShadow = false
    //                 maze.add(mesh)
    //
    //                 const mesh2 = new THREE.Mesh(geomlat, lat)
    //                 mesh2.position.set(x + 0.5, 0.05, y + 0.5)
    //                 maze.add(mesh2)
    //             }
    // }

    // ceiling
    {
        const geom = new THREE.PlaneBufferGeometry(0.06, h)

        for (let x = 0; x < world.length; x += 3) {
            const mesh = new THREE.Mesh(geom, ceiling)

            mesh.rotation.x = Math.PI / 2
            mesh.position.set(x + 0.03, 3.5, h / 2)

            maze.add(mesh)
        }
    }

    // intro text
    {
        const canvas = document.createElement('canvas')
        canvas.height = canvas.width = 512
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, 512, 512)

        texts[0].forEach((t, i) => {
            ctx.fillStyle = '#333'
            ctx.font = '30px Helvetica'
            ctx.fillText(t, 50, i * 40 + 100)
        })

        const texture = new THREE.Texture(canvas)
        texture.needsUpdate = true
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1, 1)

        const mat = new THREE.MeshBasicMaterial()
        mat.map = texture

        const mesh = new THREE.Mesh(planeGeom, mat)
        mesh.position.z = 0.01

        mesh.scale.set(2, 2, 2)

        const object = new THREE.Object3D()

        object.position.set(30, 1.2, 30)

        object.rotation.y = 0

        object.add(mesh)
        maze.add(object)
    }

    {
        // const light = new THREE.SpotLight(0xffffff);
        // // const light = new THREE.DirectionalLight(0xffffff, 1, 100);
        // light.position.set(w, 10, h);
        // light.castShadow = true;
        // maze.add(light);
        //
        // //Set up shadow properties for the light
        // light.shadow.mapSize.width = 512;
        // light.shadow.mapSize.height = 512;
        // light.shadow.camera.near = 0.5;
        // light.shadow.camera.far = 50;
        //
        // const helper = new THREE.CameraHelper(light.shadow.camera);
        // maze.add(helper);
        // const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // dirLight.color.setHSL(0.1, 1, 0.95);
        // dirLight.position.set(-1, 1.75, 1);
        // dirLight.position.multiplyScalar(5);
        // dirLight.castShadow = true;
        // dirLight.shadow.mapSize.width = 1024;
        // dirLight.shadow.mapSize.height = 1024;
        // dirLight.name = 'dirLight';
        // const d = 50;
        // dirLight.shadow.camera.left = -d;
        // dirLight.shadow.camera.right = d;
        // dirLight.shadow.camera.top = d;
        // dirLight.shadow.camera.bottom = -d;
        // dirLight.shadow.camera.far = 3500;
        // dirLight.shadow.bias = -0.0001;
        //
        // maze.add(dirLight);
        //
        // maze.add(new THREE.CameraHelper(dirLight.shadow.camera));
    }

    return maze
}

AFRAME.registerComponent('museum', {
    init: function() {
        const container = this.el.object3D

        container.add(generateMazeObject(world.worldGrid))

        // 1 mona lisa
        // 2 starry night
        // 3 munch
        // 4 great wave
        // 5 delacroix
        // 6 michelangelo
        // 7 chamber
        // 8 keith
        // 9 mondrian

        Promise.all(
            '126345789'
                .split('')
                .map((x, i) =>
                    readPainting(x).then(p => (paintings[i + 1] = p))
                )
        ).then(() => {
            this.p = generatePaintings(world.worldGrid)
            container.add(this.p.object)
        })
    },
    tick: function() {
        this.p && this.p.update(world.tim)
    },
})

////////////////////////////
/// Start //////////////////
////////////////////////////
window.onload = () => {
    const { renderer } = document.getElementsByTagName('a-scene')[0]

    // const loop = () => {
    //     console.log(renderer.info.render.faces)
    //     setTimeout(loop,100)
    // }
    //
    // loop()

    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}
