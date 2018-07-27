import { createSelector } from "reselect"
import { State } from "../reducer"

export const selectCurrentTool = (state: State) => state.tool
