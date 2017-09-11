import * as material from '../material';
import { world } from '../../logic';
import { generatePaintings } from './painting';

import type { WorldGrid } from '../../type';

const generateMazeObject = (world: WorldGrid) => {
    const maze = new THREE.Object3D();

    const mat = material.wall;

    const w = world.length;
    const h = world[0].length;

    const floor = new THREE.MeshLambertMaterial();
    {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        for (let i = 16; i--; ) {
            ctx.beginPath();
            ctx.rect(i, 0, 1, 1);

            const h = 32 + (0 | (15 * Math.random()));
            const l = 32 + (0 | (20 * Math.random()));

            ctx.fillStyle = `hsl(${h}, 55%, ${l}%)`;
            ctx.fill();
        }

        const texture = new THREE.Texture(
            canvas,
            THREE.UVMapping,
            THREE.RepeatWrapping,
            THREE.NearestFilter,
            THREE.NearestFilter
        );
        texture.needsUpdate = true;
        texture.repeat.set(3, 3);

        floor.map = texture;
        floor.needsUpdate = true;
    }

    // floor
    {
        const geom = new THREE.PlaneBufferGeometry(w, h);
        const mesh = new THREE.Mesh(geom, floor);
        mesh.position.set(w / 2, 0, h / 2);
        mesh.rotation.x = -Math.PI / 2;
        maze.add(mesh);
    }

    // wall
    {
        const geom = new THREE.BoxBufferGeometry(1, 2.2, 1);

        for (let x = world.length; x--; )
            for (let y = world[0].length; y--; )
                if (world[x][y]) {
                    const mesh = new THREE.Mesh(geom, mat);
                    mesh.position.set(x + 0.5, 0.8, y + 0.5);

                    maze.add(mesh);
                }
    }

    // rect
    {
        const m = [
            new THREE.BoxBufferGeometry(w, 3, 1),
            new THREE.BoxBufferGeometry(w, 3, 1),
            new THREE.BoxBufferGeometry(1, 3, h),
            new THREE.BoxBufferGeometry(1, 3, h)
        ].map(geom => new THREE.Mesh(geom, mat));

        m[0].position.set(w / 2, 1.5, h + 0.5);
        m[1].position.set(w / 2, 1.5, -0.5);
        m[2].position.set(w + 0.5, 1.5, h / 2);
        m[3].position.set(-0.5, 1.5, h / 2);

        maze.add(...m);
    }

    // ceiling
    {
        const geom = new THREE.PlaneBufferGeometry(0.06, h);

        for (let x = 0; x < world.length; x += 3) {
            const mesh = new THREE.Mesh(geom, material.ceiling);

            mesh.rotation.x = Math.PI / 2;
            mesh.position.set(x + 0.03, 3.5, h / 2);

            maze.add(mesh);
        }
    }

    return maze;
};

AFRAME.registerComponent('museum', {
    init: function() {
        const container = this.el.object3D;

        container.add(generateMazeObject(world.worldGrid));

        this.p = generatePaintings(world.worldGrid);

        container.add(this.p.object);
    },
    tick: function() {
        this.p.update(world.tim);
    }
});
