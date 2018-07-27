import { Museum, Point } from "../../../../type"
import { setCells, readCell } from "./set"

export const placeWall = (museum: Museum, cell: Point, value: boolean) =>
    readCell(museum, cell) ? museum : setCells(museum, [cell], value)
