import { combineReducers } from 'redux'
import { fooReducer } from './fooReducer'
import { barReducer } from './barReducer'

export const rootReducer = combineReducers({
  foo: fooReducer,
  bar: barReducer,
});

export type RootState = ReturnType<typeof rootReducer>
