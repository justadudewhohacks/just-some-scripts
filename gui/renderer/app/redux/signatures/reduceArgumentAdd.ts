import { Argument } from '@opencv4nodejs-gen/entities';

import { getCurrentlyEditedFunctionSignatureContext } from './commons';
import { reduceFunctions } from './reduceFunctions';
import { ArgsArrayName, State } from './types';

export function reduceArgumentAdd(
  state: State,
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (argsArray: Argument[]) => Argument[]
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