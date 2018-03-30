import { Argument } from '@opencv4nodejs-gen/entities';

import { findArgsArrayNameByArgName, findArgumentByName, getCurrentlyEditedFunctionSignatureContext } from './commons';
import { reduceFunctions } from './reduceFunctions';
import { ArgsArrayName, State } from './types';


export function reduceArgumentChange(
  state: State,
  argsArrayNames: ArgsArrayName[],
  argName: string,
  reduceArgsArray: (argsArray: Argument[], argsArrayIdx: number, arg: Argument) => Argument[]
): State {
  const currentlyEdited = getCurrentlyEditedFunctionSignatureContext(state)
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