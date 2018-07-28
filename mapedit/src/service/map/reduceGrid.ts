import { Museum, Point } from "../../type"

export const reduceGrid = ({ grid, origin, ...museum }: Museum): Museum => {
    const height = grid.length
    const width = grid[0].length

    const isVerticalLineEmpty = x => {
        for (let y = height; y--; ) if (grid[y][x]) return false
        return true
    }
    const isHorizontalLineEmpty = y => {
        for (let x = width; x--; ) if (grid[y][x]) return false
        return true
    }

    let max_x = grid[0].length
    for (
        max_x = grid[0].length - 1;
        max_x >= 0 && isVerticalLineEmpty(max_x);
        max_x--
    );

    let min_x = grid[0].length
    for (
        min_x = 0;
        min_x < grid[0].length && isVerticalLineEmpty(min_x);
        min_x++
    );

    if (max_x < min_x) return { ...museum, origin: { x: 0, y: 0 }, grid: [[]] }

    let max_y = grid.length
    for (
        max_y = grid.length - 1;
        max_y >= 0 && isHorizontalLineEmpty(max_y);
        max_y--
    );

    let min_y = grid.length
    for (
        min_y = 0;
        min_y < grid.length && isHorizontalLineEmpty(min_y);
        min_y++
    );

    return {
        ...museum,
        grid: grid
            .slice(min_y, max_y + 1)
            .map(line => line.slice(min_x, max_x + 1)),
        origin: { x: origin.x + min_x, y: origin.y + min_y },
    }
}

export const centerOrigin = ({ origin, paintings, ...museum }: Museum) => ({
    origin: { x: 0, y: 0 },

    paintings: paintings.map(({ cell, ...rest }) => ({
        ...rest,
        cell: { x: cell.x - origin.x, y: cell.y - origin.y },
    })),

    ...museum,
})
