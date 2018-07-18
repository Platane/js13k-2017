import { createSelector } from "reselect"
import { State } from "../reducer"

export const selectMuseum = (state: State) => state.museum
