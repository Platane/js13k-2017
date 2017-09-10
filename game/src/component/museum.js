import * as material from './material'
import { world } from '../logic'

import type { WorldGrid } from '../type'

const generateMazeObject = (world: WorldGrid) => {
    const maze = new THREE.Object3D()

    const mat = material.wall

    {
        const geom = new THREE.BoxGeometry(1, 1, 1)

        for (let x = world.length; x--; )
            for (let y = world[0].length; y--; )
                if (world[x][y]) {
                    const mesh = new THREE.Mesh(geom, mat)
                    mesh.position.set(x + 0.5, 0.5, y + 0.5)

                    maze.add(mesh)
                }
    }

    {
        const l = world.length
        const geom = new THREE.BoxGeometry(l, 2, l)

        const m = Array.from({ length: 4 }, () => new THREE.Mesh(geom, mat))

        m[0].position.set(l / 2 + l, 0.5, l / 2)
        m[1].position.set(l / 2 - l, 0.5, l / 2)
        m[2].position.set(l / 2, 0.5, l / 2 + l)
        m[3].position.set(l / 2, 0.5, l / 2 - l)

        maze.add(...m)
    }

    return maze
}

AFRAME.registerComponent('museum', {
    init: function() {
        this.el.setObject3D('maze', generateMazeObject(world.worldGrid))
    },
    tick: function() {},
})
