import { actionCreator, createReducer } from './reduxHelpers'

declare global {
    interface ActionPayloads {
        SET_TEXT: { text: string }
        SET_LENGTH: number | undefined
    }
}

export const setText = actionCreator('SET_TEXT')
export const setLength = actionCreator('SET_LENGTH')

const initialState = {
    text: 'lorem ipsum',
    length: undefined as number | undefined,
}

export const fooReducer = createReducer({
    SET_TEXT: (s, a) => a.payload,
    SET_LENGTH: (s, a) => ({ length: a.payload }),
}, initialState);

export const getText: Selector<string> = (state) => state.foo.text
export const getLength: Selector<number | undefined> = (state) => state.foo.length
export const getSnippet: Selector<string> = (state) => state.foo.length !== undefined ? state.foo.text.slice(0, state.foo.length) : state.foo.text
