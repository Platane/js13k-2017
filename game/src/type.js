export type Dot = {
    x: number,
    y: number,
    r: number,
    color: [number, number, number],
    opacity: number,
}

export type Painting = Dot[]

export type Wall = Painting | null

export type Cell = null | [Wall, Wall, Wall, Wall]

export type WorldGrid = Cell[][]

export type Point = { x: number, y: number }
export type World = {
    control: {
        direction: Point,
    },

    tim: {
        direction: Point,
        position: Point,
    },

    worldGrid: WorldGrid,

    walkers: {
        direction: Point,
        position: Point,
        target:
            | {
                  type: 'goTo',
                  keyPoint: Point[],
              }
            | {
                  type: 'wait',
                  delay: number,
              },
    }[],
}
