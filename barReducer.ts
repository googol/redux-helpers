import { actionCreator, createReducer } from './reduxHelpers'

declare global {
  interface ActionPayloads {
    RESET_EDIT_COUNTER: undefined
  }
}

export const resetEditCounter = actionCreator('RESET_EDIT_COUNTER')

const initialState = {
  counter: 0
}

export const barReducer = createReducer({
  SET_TEXT: (state) => ({ counter: state.counter+1 }),
  SET_LENGTH: (state) => ({ counter: state.counter+1 }),
  RESET_EDIT_COUNTER: () => ({ counter: 0 }),
}, initialState)

export const getEditCounter: Selector<number> = (state) => state.bar.counter
