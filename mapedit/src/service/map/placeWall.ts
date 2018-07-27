import { setCells, readCell } from "./set"
import { Museum, Point } from "../../type"

export const placeWall = (museum: Museum, cell: Point, value: boolean) =>
    readCell(museum, cell) ? museum : setCells(museum, [cell], value)
