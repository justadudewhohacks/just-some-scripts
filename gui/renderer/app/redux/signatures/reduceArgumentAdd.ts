import { Argument } from '@opencv4nodejs-gen/entities';

import { reduceFunctions } from './reduceFunctions';
import { ArgsArrayName, State } from './types';
import { selectFunctionSignature } from './selectors';

export function reduceArgumentAdd(
  state: State,
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (argsArray: Argument[]) => Argument[]
): State {
  const sel = selectFunctionSignature(state, state.currentlyEditing.sigUuid)
  if (!sel)
    return state

  return {
    ...state,
    functions: reduceFunctions(
      state.functions,
      sel,
      argsArrayName,
      reduceArgsArray
    )
  }
}