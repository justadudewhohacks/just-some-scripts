import { IArgument, IFunction, ISignature, IDeclaration, Function, Signature } from '../../../../../persistence/types';
import { State, ArgsArrayName } from './types';
import { editFunctionAction, updateReturnValueNameAction, updateReturnValueTypeAction, editFunctionSignatureAction, updateArgumentTypeAction, updateArgumentNameAction, removeFunctionReturnValueAction, removeFunctionArgumentAction, addFunctionReturnValueAction, addFunctionArgumentAction, createNewFunctionSignatureAction, addFunctionSignatureAction, removeFunctionSignatureAction } from './actionCreators';
import { replaceItem, removeItem, insertItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';
import { reduceArgumentChange } from './reduceArgumentChange';
import { reduceArgumentAdd } from './reduceArgumentAdd';
import { hasFnIdPredicate } from '../../commons/hasFnIdPredicate';
import { fetchFunctionSuccessAction, unloadFunctionAction } from '../cache/actionCreators';
import { getCurrentlyEditedFunctionContext, getCurrentlyEditedFunctionSignatureContext } from './commons';

const INITIAL_STATE: State = {
  editedFunctions: [],
  currentlyEditing: { _id: null, currentSignatureIdx: 0 }
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, fetchFunctionSuccessAction)) {

    const { fn } = action.payload
    const idx = state.editedFunctions.findIndex(hasFnIdPredicate(fn._id))

    if (idx !== -1) {
      return { ...state, editedFunctions: replaceItem<IFunction>(state.editedFunctions, fn, idx) }
    }
    return { 
      ...state, 
      editedFunctions: state.editedFunctions.concat(fn) 
    }

  } else if (isType(action, editFunctionAction)) {

    const { _id } = action.payload

    if (!state.editedFunctions.some(hasFnIdPredicate(_id))) {
      return {
        ...state,
        currentlyEditing: { _id, currentSignatureIdx: 0 }
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

  } else if (isType(action, createNewFunctionSignatureAction)) {

    const id = Date.now().toString()

    return {
      ...state, 
      editedFunctions: state.editedFunctions.concat(new Function(id, id))
    }

  } else if (isType(action, unloadFunctionAction)) {

    const { _id } = action.payload
    
    const idx = state.editedFunctions.findIndex(hasFnIdPredicate(_id))
    if (idx !== -1) {
      return { ...state, editedFunctions: removeItem<IFunction>(state.editedFunctions, idx) }
    }

    return state

  } else if (isType(action, addFunctionSignatureAction)) {

    const editContext = getCurrentlyEditedFunctionContext(state)
    if (!editContext)
      return state 
      
    return { 
      ...state, 
      editedFunctions: replaceItem<IFunction>(
        state.editedFunctions, {
          ...editContext.currentFn,
          signatures: editContext.currentFn.signatures.concat(new Signature())
        }, 
        editContext.currentFnIdx
      ) 
    }

  } else if (isType(action, removeFunctionSignatureAction)) {

    const editContext = getCurrentlyEditedFunctionSignatureContext(state)
    if (!editContext)
      return state 
      
    return { 
      ...state, 
      editedFunctions: replaceItem<IFunction>(
        state.editedFunctions, {
          ...editContext.currentFn,
          signatures: removeItem<ISignature>(editContext.currentFn.signatures, editContext.currentSignatureIdx)
        }, 
        editContext.currentFnIdx
      ) 
    }

  } 

  return state
}