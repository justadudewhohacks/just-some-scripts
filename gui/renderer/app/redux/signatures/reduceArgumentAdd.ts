import { reduceFunctions } from './reduceFunctions';
import { ArgsArrayName, State } from './types';
import { selectFunctionSignature } from './selectors';
import { ArgumentInstance } from '../../classes';

export function reduceArgumentAdd(
  state: State,
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (argsArray: ArgumentInstance[]) => ArgumentInstance[]
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