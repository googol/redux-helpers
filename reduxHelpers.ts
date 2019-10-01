import { Dispatch } from 'redux'
import {
  useSelector as originalUseSelector,
  useDispatch as originalUseDispatch,
  TypedUseSelectorHook,
} from 'react-redux'
import { RootState } from './rootReducer'

// THese types are declared as global, since they are needed all around the project
declare global {
  type Selector<T> = (state: RootState) => T

  type ActionTypes = keyof ActionPayloads

  // A little TS trick for getting the inference of action payloads to work correctly
  // The conditional type OneOfActions forces the Action types to be separate via the
  // distributivity of unions over conditional types
  type Action<T extends ActionTypes> = T extends ActionTypes
    ? {
        type: T
        payload: ActionPayloads[T]
      }
    : never
  type AnyAction = Action<ActionTypes>

  type Reducer<S> = (state: S | undefined, action: AnyAction) => S
}

export function createStateMapper<T extends Record<string, Selector<any>>>(
  template: T
): Selector<{ [K in keyof T]: T[K] extends Selector<infer U> ? U : never }> {
  return (state) => {
    const result: any = {}
    for (const key of Object.keys(template)) {
      result[key] = template[key](state)
    }
    return result
  }
}

export type ActionCreatorParams<
  T extends ActionTypes
> = ActionPayloads[T] extends undefined ? [] : [ActionPayloads[T]]

export const actionCreator = <T extends ActionTypes>(actionType: T) => (
  ...params: ActionCreatorParams<T>
): Action<T> =>
  ({
    type: actionType,
    payload: params.length >= 1 ? params[0] : undefined,
  } as any)

export const createReducer = <S>(
  args: { [K in ActionTypes]?: (state: S, action: Action<K>) => Partial<S> },
  initial: S
): Reducer<S> => (state = initial, action) => {
  const caseReducer = args[action.type] as any
  if (!caseReducer) {
    return state
  }

  const partialNewState = caseReducer(state, action)

  if (partialNewState === state) {
    return state
  }

  return { ...state, ...caseReducer(state, action) }
}

export const useSelector: TypedUseSelectorHook<RootState> = originalUseSelector
export const useDispatch = () => originalUseDispatch<Dispatch<AnyAction>>()
