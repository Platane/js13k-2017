import { createSelector } from "reselect"
import { State } from "../reducer"

export const selectCamera = (state: State) => state.camera
