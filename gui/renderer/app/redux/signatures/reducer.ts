import {
  ArgumentInstance,
  FunctionInstance,
  OptionalArgumentInstance,
  ReturnValueInstance,
  SignatureInstance,
} from '../../classes';
import { fetchFunctionSuccessAction, unloadFunctionAction } from '../cache/actionCreators';
import { insertItem, removeItem, replaceItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';
import {
  addFunctionArgumentAction,
  addFunctionReturnValueAction,
  addFunctionSignatureAction,
  createNewFunctionSignatureAction,
  editFunctionAction,
  editFunctionSignatureAction,
  makeFunctionArgumentOptionalAction,
  removeFunctionArgumentAction,
  removeFunctionReturnValueAction,
  removeFunctionSignatureAction,
  updateArgumentArrayDepthAction,
  updateArgumentNameAction,
  updateArgumentTypeAction,
  updateReturnValueArrayDepthAction,
  updateReturnValueNameAction,
  updateReturnValueTypeAction,
} from './actionCreators';
import { findArgument } from './commons';
import { reduceArgumentAdd } from './reduceArgumentAdd';
import { reduceArgumentChange } from './reduceArgumentChange';
import {
  selectCurrentlyEditedFunction,
  selectCurrentlyEditedFunctionSignature,
  selectFunction,
  selectFunctionSignature,
} from './selectors';
import { ArgsArrayName, State } from './types';

const INITIAL_STATE: State = {
  functions: [],
  currentlyEditing: {}
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, fetchFunctionSuccessAction)) {

    const { fn } = action.payload
    const idx = state.functions.findIndex(f => f._id === fn._id)

    if (idx !== -1) {
      return {
        ...state,
        functions: replaceItem<FunctionInstance>(
          state.functions,
          fn,
          idx
        )
      }
    }
    return {
      ...state,
      functions: state.functions.concat(fn)
    }

  } else if (isType(action, editFunctionAction)) {

    const { fnUuid } = action.payload

    if (!selectFunction(state, fnUuid)) {
      return {
        ...state,
        currentlyEditing: { fnUuid }
      }
    }
    return {
      ...state,
      currentlyEditing: {
        ...state.currentlyEditing,
        fnUuid
      }
    }

  } else if (isType(action, editFunctionSignatureAction)) {
    const sel = selectFunctionSignature(state, action.payload.sigUuid)
    if (!sel)
      return state

    return {
      ...state,
      currentlyEditing: {
        ...state.currentlyEditing,
        sigUuid: sel.sig.uuid
      }
    }

  } else if (isType(action, updateReturnValueTypeAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues],
      action.payload.argUuid,
      (argsArray, argsArrayIdx, arg) => replaceItem<ArgumentInstance>(
        argsArray,
        { ...arg, type: action.payload.type },
        argsArrayIdx
      )
    )

  } else if (isType(action, updateReturnValueNameAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues],
      action.payload.argUuid,
      (argsArray, argsArrayIdx, arg) => replaceItem<ArgumentInstance>(
        argsArray,
        { ...arg, name: action.payload.name },
        argsArrayIdx
      )
    )

  } else if (isType(action, updateArgumentTypeAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs],
      action.payload.argUuid,
      (argsArray, argsArrayIdx, arg) => replaceItem<ArgumentInstance>(
        argsArray,
        { ...arg, type: action.payload.type },
        argsArrayIdx
      )
    )

  } else if (isType(action, updateArgumentNameAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs],
      action.payload.argUuid,
      (argsArray, argsArrayIdx, arg) => replaceItem<ArgumentInstance>(
        argsArray,
        { ...arg, name: action.payload.name },
        argsArrayIdx
      )
    )

  } else if (isType(action, updateReturnValueArrayDepthAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues],
      action.payload.argUuid,
      (argsArray, argsArrayIdx, arg) => replaceItem<OptionalArgumentInstance>(
        argsArray as any,
        { ...(arg as any), arrayDepth: action.payload.depth },
        argsArrayIdx
      )
    )

  } else if (isType(action, updateArgumentArrayDepthAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs],
      action.payload.argUuid,
      (argsArray, argsArrayIdx, arg) => replaceItem<OptionalArgumentInstance>(
        argsArray as any,
        { ...(arg as any), arrayDepth: action.payload.depth },
        argsArrayIdx
      )
    )

  } else if (isType(action, removeFunctionReturnValueAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues],
      action.payload.argUuid,
      (argsArray, argsArrayIdx) => removeItem<ArgumentInstance>(argsArray, argsArrayIdx)
    )

  } else if (isType(action, removeFunctionArgumentAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs],
      action.payload.argUuid,
      (argsArray, argsArrayIdx) => removeItem<ArgumentInstance>(argsArray, argsArrayIdx)
    )

  } else if (isType(action, addFunctionReturnValueAction)) {

    return reduceArgumentAdd(
      state,
      ArgsArrayName.returnValues,
      argsArray => insertItem<ArgumentInstance>(argsArray, new ReturnValueInstance(), argsArray.length)
    )

  } else if (isType(action, addFunctionArgumentAction)) {

    return reduceArgumentAdd(
      state,
      ArgsArrayName.requiredArgs,
      argsArray => insertItem<ArgumentInstance>(argsArray, new ArgumentInstance(), argsArray.length)
    )

  } else if (isType(action, createNewFunctionSignatureAction)) {

    return {
      ...state,
      functions: state.functions.concat(new FunctionInstance())
    }

  } else if (isType(action, unloadFunctionAction)) {

    const { uuid } = action.payload

    const sel = selectFunction(state, uuid)
    if (sel) {
      return {
        ...state,
        functions: removeItem<FunctionInstance>(state.functions, sel.fnIdx)
      }
    }

    return state

  } else if (isType(action, addFunctionSignatureAction)) {

    const sel = selectCurrentlyEditedFunction(state)
    if (!sel)
      return state

    return {
      ...state,
      functions: replaceItem<FunctionInstance>(
        state.functions, {
          ...sel.fn,
          signatures: sel.fn.signatures.concat(new SignatureInstance())
        },
        sel.fnIdx
      )
    }

  } else if (isType(action, removeFunctionSignatureAction)) {

    const sel = selectCurrentlyEditedFunctionSignature(state)
    if (!sel)
      return state

    return {
      ...state,
      functions: replaceItem<FunctionInstance>(
        state.functions, {
          ...sel.fn,
          signatures: removeItem<SignatureInstance>(
            sel.fn.signatures,
            sel.sigIdx
          )
        },
        sel.fnIdx
      )
    }

  } else if (isType(action, makeFunctionArgumentOptionalAction)) {

    const sel = selectCurrentlyEditedFunctionSignature(state)
    if (!sel)
      return state

    const [argIdx, arg] = findArgument(
      sel.sig.requiredArgs,
      action.payload.argUuid
    )
    if (argIdx === -1)
      return state

    const updatedSignature = {
      ...sel.sig,
      requiredArgs: removeItem<ArgumentInstance>(
        sel.sig.requiredArgs,
        argIdx
      ),
      optionalArgs: sel.sig.optionalArgs.concat(new OptionalArgumentInstance(arg))
    }

    return {
      ...state,
      functions: replaceItem<FunctionInstance>(
        state.functions, {
          ...sel.fn,
          signatures: replaceItem<SignatureInstance>(
            sel.fn.signatures,
            updatedSignature,
            sel.sigIdx
          )
        },
        sel.fnIdx
      )
    }

  }

  return state
}