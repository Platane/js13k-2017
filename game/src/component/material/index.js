//

export const wall = new THREE.MeshLambertMaterial({ color: 0xf8f8f8 });
export const ceiling = new THREE.MeshLambertMaterial({ color: 0x888888 });

export const createCanvas = () => new THREE.MeshPhongMaterial({});
// export const createCanvas = () => new THREE.MeshBasicMaterial({})

export const canvas = createCanvas();
