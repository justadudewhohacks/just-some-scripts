import { ArgumentInstance } from '../../classes';
import { findArgsArrayNameByArgUuid, findArgument } from './commons';
import { reduceFunctions } from './reduceFunctions';
import { selectFunctionSignature } from './selectors';
import { ArgsArrayName, State } from './types';


export function reduceArgumentChange(
  state: State,
  argsArrayNames: ArgsArrayName[],
  uuid: string,
  reduceArgsArray: (argsArray: ArgumentInstance[], argsArrayIdx: number, arg: ArgumentInstance) => ArgumentInstance[]
): State {
  const sel = selectFunctionSignature(state, state.currentlyEditing.sigUuid)
  if (!sel)
    return state

  const argsArrayName = findArgsArrayNameByArgUuid(argsArrayNames, uuid, sel.sig)
  if (!argsArrayName)
    return state

  const [argsArrayIdx, arg] = findArgument(sel.sig[argsArrayName] || [], uuid)
  if (argsArrayIdx === -1 || !arg)
    return state

  return {
    ...state,
    functions: reduceFunctions(
      state.functions,
      sel,
      argsArrayName,
      argsArray => reduceArgsArray(argsArray, argsArrayIdx, arg)
    )
  }
}