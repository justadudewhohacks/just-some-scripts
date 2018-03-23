import { State, ArgsArrayName } from './types';
import { IArgument } from '@opencv4nodejs-gen/persistence/index';
import { getCurrentlyEdited, findArgsArrayNameByArgName, findArgumentByName } from './commons';
import { reduceFunctions } from './reduceFunctions';


export function reduceArgumentChange(
  state: State, 
  argsArrayNames: ArgsArrayName[], 
  argName: string,
  reduceArgsArray: (argsArray: IArgument[], argsArrayIdx: number, arg: IArgument) => IArgument[]
): State {
  const currentlyEdited = getCurrentlyEdited(state)
  if (!currentlyEdited)
    return state 

  const { currentSignature } = currentlyEdited

  const argsArrayName = findArgsArrayNameByArgName(argsArrayNames, argName, currentSignature)
  if (!argsArrayName)
    return state

  const [argsArrayIdx, arg] = findArgumentByName(currentSignature[argsArrayName] || [], argName)
  if (argsArrayIdx === -1 || !arg)
    return state

  return {
    ...state,
    editedFunctions: reduceFunctions(
      state.editedFunctions,
      currentlyEdited,
      argsArrayName,
      argsArray => reduceArgsArray(argsArray, argsArrayIdx, arg)
    )
  }
}