const local = location.search.includes('local')

const loadMap = (resetTim, resetPosition) =>
    (local
        ? Promise.resolve(localStorage.getItem('museumAsBinary').split(','))
        : fetch('./map').then(x => x.arrayBuffer())
    )

        .then(unpack)
        .then(({ grid, paintings, signs, s }) => {
            world.worldGrid = grid
            world.signs = signs
            world.paintings = paintings

            world.step_max = world.signs.length

            if (resetTim) {
                world.tim.position.x = s.x + 0.5
                world.tim.position.y = s.y + 0.5

                //
                // hacky way to set a default camera rotation
                // set a new base dx,dy

                const a = (s.k - 2) * Math.PI * 0.5

                world.tim.d = {
                    x: around[(s.k + 3) % 4].x,
                    y: around[(s.k + 3) % 4].y,
                    a,
                }

                if (world.tim.camera3d) {
                    world.tim.camera3d.rotation.y = world.tim.d.a
                }
            }

            if (resetPosition) {
                world.tim.position.x = resetPosition.x
                world.tim.position.y = resetPosition.y
            }
        })

let step = 1
let step_max = 0

const world = {
    tim: {
        position: { x: 0.5, y: 1.5 },
        direction: { x: 0, y: 1 },
    },

    control: {
        direction: { x: 0, y: 0 },
    },
}

////////////////////////////
/// World Logic ////////////
////////////////////////////

const isInside = (grid, x, y) =>
    x >= 0 && x < grid.length && y >= 0 && y < grid[0].length

const isWall = (grid, x, y) => !isInside(grid, x, y) || !!grid[x][y]

const getClosestWall = (p, grid) => {
    const gx = Math.floor(p.x)
    const gy = Math.floor(p.y)

    return around.reduce((best, dir) => {
        const x = gx + dir.x
        const y = gy + dir.y

        // is a wall
        if (isWall(grid, x, y)) {
            const dx = dir.x === 0 ? 0 : dir.x > 0 ? 1 - (p.x % 1) : p.x % 1
            const dy = dir.y === 0 ? 0 : dir.y > 0 ? 1 - (p.y % 1) : p.y % 1

            const d = Math.sqrt(dx * dx + dy * dy)

            return !best || best.d > d ? { x, y, dir, d } : best
        } else return best
    }, null)
}

const tick = () => {
    // make tim walk

    const { position, direction } = world.tim
    const control = world.control

    const v = 0.05

    position.x +=
        (direction.x * control.direction.y +
            direction.y * control.direction.x) *
        v
    position.y +=
        (direction.y * control.direction.y -
            direction.x * control.direction.x) *
        0.05

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

AFRAME.registerComponent('tim', {
    init: function() {
        {
            const geom = new THREE.BoxGeometry(0.1, 0.1, 0.1)
            const mat = new THREE.MeshLambertMaterial({ color: 0x2193ae })
            const mesh = new THREE.Mesh(geom, mat)

            this.el.object3D.add(mesh)

            const camera = this.el.object3D

            world.tim.camera3d = camera

            world.tim.camera3d.rotation.y = world.tim.d && world.tim.d.a
        }
    },
    tick: function() {
        if (!world.tim.d) return

        const direction = this.el.children[0].object3D.rotation.y

        const dx = -Math.sin(direction)
        const dy = -Math.cos(direction)

        world.tim.direction.x = dx * world.tim.d.x - dy * world.tim.d.y
        world.tim.direction.y = dx * world.tim.d.y + dy * world.tim.d.x

        tick()

        if (window.opener && window.opener.updateGamePosition)
            window.opener.updateGamePosition(world.tim)

        this.el.object3D.position.set(
            world.tim.position.x,
            0.6,
            world.tim.position.y
        )
    },
})

AFRAME.registerComponent('museum', {
    init: function() {
        const container = this.el.object3D

        window.refreshMap = (resetTim, resetPosition) =>
            loadMap(resetTim, resetPosition).then(() => {
                // empty
                while (container.children[0])
                    container.remove(container.children[0])

                // fill with the maze
                container.add(generateMazeObject(world.worldGrid))

                // and the painting
                this.p = generatePaintings(world.paintings, world.signs)
                container.add(this.p.object)
            })

        window.refreshMap(true)
    },
    tick: function() {
        this.p && this.p.update(world.tim)
    },
})
