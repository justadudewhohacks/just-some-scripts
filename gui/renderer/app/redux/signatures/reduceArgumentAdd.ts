import { State, ArgsArrayName } from './types';
import { IArgument } from '../../../../../persistence/index';
import { getCurrentlyEditedFunctionSignatureContext } from './commons';
import { reduceFunctions } from './reduceFunctions';

export function reduceArgumentAdd(
  state: State, 
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (argsArray: IArgument[]) => IArgument[]
): State {
  const currentlyEdited = getCurrentlyEditedFunctionSignatureContext(state)
  if (!currentlyEdited)
    return state 

  return {
    ...state,
    editedFunctions: reduceFunctions(
      state.editedFunctions,
      currentlyEdited,
      argsArrayName,
      reduceArgsArray
    )
  }
}