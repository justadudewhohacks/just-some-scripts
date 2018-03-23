import { State, ArgsArrayName } from './types';
import { IArgument } from '@opencv4nodejs-gen/persistence/index';
import { getCurrentlyEdited } from './commons';
import { reduceFunctions } from './reduceFunctions';

export function reduceArgumentAdd(
  state: State, 
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (argsArray: IArgument[]) => IArgument[]
): State {
  const currentlyEdited = getCurrentlyEdited(state)
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