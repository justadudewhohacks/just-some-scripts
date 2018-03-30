import { Signature } from '@opencv4nodejs-gen/entities';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions as signaturesActions } from '../redux/signatures';
import { AddButton, RemoveButton } from './Buttons';
import { EditArgument } from './EditArgument';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

type Props = {
  types: string[]
  signature: Signature
  idx: number
  updateReturnValueType: (type: string, argName: string) => void
  updateReturnValueName: (name: string, argName: string) => void
  updateReturnValueArrayDepth: (value: string, argName: string) => void
  updateArgumentType: (type: string, argName: string) => void
  updateArgumentName: (name: string, argName: string) => void
  updateArgumentArrayDepth: (value: string, argName: string) => void
  updateArgumentDefaultValue: (value: string, argName: string) => void
  addFunctionArgument: () => void
  addFunctionReturnValue: () => void
  removeFunctionReturnValue: (argName: string) => void
  removeFunctionArgument: (argName: string) => void
  removeFunctionSignature: (idx: number) => void
  makeFunctionArgumentOptional: (argName: string) => void
}

function mapStateToProps(_: any) {
  return {}
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateReturnValueType: (type: string, argName: string) => dispatch(signaturesActions.updateReturnValueType(type, argName)),
    updateReturnValueName: (name: string, argName: string) => dispatch(signaturesActions.updateReturnValueName(name, argName)),
    updateReturnValueArrayDepth: (value: string, argName: string) => dispatch(signaturesActions.updateReturnValueArrayDepth(value, argName)),
    updateArgumentType: (name: string, argName: string) => dispatch(signaturesActions.updateArgumentType(name, argName)),
    updateArgumentName: (name: string, argName: string) => dispatch(signaturesActions.updateArgumentName(name, argName)),
    updateArgumentArrayDepth: (value: string, argName: string) => dispatch(signaturesActions.updateArgumentArrayDepth(value, argName)),
    updateArgumentDefaultValue: (value: string, argName: string) => dispatch(signaturesActions.updateArgumentDefaultValue(value, argName)),
    addFunctionArgument: () => dispatch(signaturesActions.addFunctionArgument()),
    addFunctionReturnValue: () => dispatch(signaturesActions.addFunctionReturnValue()),
    removeFunctionReturnValue: (argName: string) => dispatch(signaturesActions.removeFunctionReturnValue(argName)),
    removeFunctionArgument: (argName: string) => dispatch(signaturesActions.removeFunctionArgument(argName)),
    removeFunctionSignature: (idx: number) => dispatch(signaturesActions.removeFunctionSignature(idx)),
    makeFunctionArgumentOptional: (argName: string) => dispatch(signaturesActions.makeFunctionArgumentOptional(argName))
  }
}

const EditSignature = ({
  types,
  signature,
  idx,
  updateReturnValueType,
  updateReturnValueName,
  updateReturnValueArrayDepth,
  updateArgumentType,
  updateArgumentName,
  updateArgumentArrayDepth,
  updateArgumentDefaultValue,
  addFunctionArgument,
  addFunctionReturnValue,
  removeFunctionReturnValue,
  removeFunctionArgument,
  removeFunctionSignature,
  makeFunctionArgumentOptional
} : Props) => (
  <Container>
    <RemoveButton
      style={{ margin: 10, alignSelf: 'flex-end' }}
      label="Remove Signature"
      onClick={() => removeFunctionSignature(idx)}
    />
    <h3> {'Return Values'} </h3>
    <div>
      {
        (signature.returnValues || []).map((ret, i) =>
          <EditArgument
            index={i}
            arg={ret}
            types={types}
            onTypeChanged={updateReturnValueType}
            onNameChanged={updateReturnValueName}
            onRemove={removeFunctionReturnValue}
            onArrayDepthChanged={updateReturnValueArrayDepth}
          />
        )
      }
    </div>
    <AddButton
      label="Add Argument"
      style={{ margin: '10px' }}
      onClick={addFunctionReturnValue}
    />
    <h3> {'Arguments'} </h3>
    <div>
      {
        signature.requiredArgs
          .map(arg => ({ arg, isOptional: false }))
          .concat(
            signature.optionalArgs.map(arg => ({ arg, isOptional: true }))
          )
          .map(({ arg, isOptional }, i) =>
            <EditArgument
              index={i}
              arg={arg}
              types={types}
              onTypeChanged={updateArgumentType}
              onNameChanged={updateArgumentName}
              onRemove={removeFunctionArgument}
              onArrayDepthChanged={updateArgumentArrayDepth}
              onMakeOptional={isOptional ? null : makeFunctionArgumentOptional}
              onDefaultValueChanged={isOptional ? updateArgumentDefaultValue : null}
            />
          )
      }
    </div>
    <AddButton
      label="Add Argument"
      style={{ margin: '10px' }}
      onClick={addFunctionArgument}
    />
  </Container>
)

export default connect(mapStateToProps, mapDispatchToProps)(EditSignature)