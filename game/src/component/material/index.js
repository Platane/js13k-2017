//

export const wall = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 })
export const lat = new THREE.MeshPhongMaterial({ color: 0xc8c8c8 })
export const ceiling = new THREE.MeshBasicMaterial({ color: 0x888888 })
// export const frame = new THREE.MeshPhongMaterial({ color: 0xd0b91e })
export const frame = lat

export const createCanvas = () => new THREE.MeshPhongMaterial({})
// export const createCanvas = () => new THREE.MeshBasicMaterial({})

export const canvas = createCanvas()
