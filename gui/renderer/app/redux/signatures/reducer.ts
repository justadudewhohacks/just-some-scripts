import { IArgument, IFunction, ISignature, IDeclaration, IType } from '@opencv4nodejs-gen/persistence';
import { State, ArgsArrayName } from './types';
import { editFunctionAction, updateReturnValueNameAction, updateReturnValueTypeAction, editFunctionSignatureAction, updateArgumentTypeAction, updateArgumentNameAction, removeFunctionReturnValueAction, removeFunctionArgumentAction, addFunctionReturnValueAction, addFunctionArgumentAction } from './actionCreators';
import { replaceItem, removeItem, insertItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';
import { reduceArgumentChange } from './reduceArgumentChange';
import { reduceArgumentAdd } from './reduceArgumentAdd';
import { hasFnIdPredicate } from '../../commons/hasFnIdPredicate';

const INITIAL_STATE: State = {
  editedFunctions: [],
  currentlyEditing: { _id: null, currentSignatureIdx: 0 }
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, editFunctionAction)) {

    const { _id, cachedFunctions } = action.payload
    const hasId = hasFnIdPredicate(_id)
    if (!state.editedFunctions.some(hasId)) {
      const fn = cachedFunctions.find(hasId)

      return {
        ...state,
        currentlyEditing: { _id, currentSignatureIdx: 0 },
        editedFunctions: state.editedFunctions.concat(fn || [])
      }
    }
    return { ...state, currentlyEditing: { ...state.currentlyEditing, _id } }

  } else if (isType(action, editFunctionSignatureAction)) {

    return {
      ...state,
      currentlyEditing: { ...state.currentlyEditing, currentSignatureIdx: action.payload.idx }
    }

  } else if (isType(action, updateReturnValueTypeAction)) {

    const { type, argName } = action.payload

    return reduceArgumentChange(
      state, 
      [ArgsArrayName.returnValues], 
      argName, 
      (argsArray, argsArrayIdx, arg) => replaceItem<IArgument>(argsArray, { ...arg, type }, argsArrayIdx)
    )

  } else if (isType(action, updateReturnValueNameAction)) {

    const { name, argName } = action.payload

    return reduceArgumentChange(
      state, 
      [ArgsArrayName.returnValues], 
      argName, 
      (argsArray, argsArrayIdx, arg) => replaceItem<IArgument>(argsArray, { ...arg, name }, argsArrayIdx)
    )

  } else if (isType(action, updateArgumentTypeAction)) {

    const { type, argName } = action.payload

    return reduceArgumentChange(
      state, 
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs], 
      argName, 
      (argsArray, argsArrayIdx, arg) => replaceItem<IArgument>(argsArray, { ...arg, type }, argsArrayIdx)
    )

  } else if (isType(action, updateArgumentNameAction)) {

    const { name, argName } = action.payload

    return reduceArgumentChange(
      state, 
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs], 
      argName, 
      (argsArray, argsArrayIdx, arg) => replaceItem<IArgument>(argsArray, { ...arg, name }, argsArrayIdx)
    )

  } else if (isType(action, removeFunctionReturnValueAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues], 
      action.payload.argName,
      (argsArray, argsArrayIdx) => removeItem<IArgument>(argsArray, argsArrayIdx)
    )

  } else if (isType(action, removeFunctionArgumentAction)) {

    return reduceArgumentChange(
      state, 
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs], 
      action.payload.argName,
      (argsArray, argsArrayIdx) => removeItem<IArgument>(argsArray, argsArrayIdx)
    )

  } else if (isType(action, addFunctionReturnValueAction)) {

    return reduceArgumentAdd(
      state, 
      ArgsArrayName.returnValues,
      argsArray => insertItem<IArgument>(argsArray, { name: '', type: '' }, argsArray.length)
    )

  } else if (isType(action, addFunctionArgumentAction)) {

    return reduceArgumentAdd(
      state, 
      ArgsArrayName.requiredArgs,
      argsArray => insertItem<IArgument>(argsArray, { name: '', type: '' }, argsArray.length)
    )

  }

  return state
}