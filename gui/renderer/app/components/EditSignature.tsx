import { Signature } from '@opencv4nodejs-gen/entities';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { OptionalArgument } from '../../../../entities/classes/Argument';
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
  updateReturnValueType: (type: string, argUuid: string) => void
  updateReturnValueName: (name: string, argUuid: string) => void
  updateReturnValueArrayDepth: (value: string, argUuid: string) => void
  updateArgumentType: (type: string, argUuid: string) => void
  updateArgumentName: (name: string, argUuid: string) => void
  updateArgumentArrayDepth: (value: string, argUuid: string) => void
  updateArgumentDefaultValue: (value: string, argUuid: string) => void
  addFunctionArgument: () => void
  addFunctionReturnValue: () => void
  removeFunctionReturnValue: (argUuid: string) => void
  removeFunctionArgument: (argUuid: string) => void
  removeFunctionSignature: (sigUuid: string) => void
  makeFunctionArgumentOptional: (argUuid: string) => void
}

function mapStateToProps(_: any) {
  return {}
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateReturnValueType: (type: string, argUuid: string) => dispatch(signaturesActions.updateReturnValueType(type, argUuid)),
    updateReturnValueName: (name: string, argUuid: string) => dispatch(signaturesActions.updateReturnValueName(name, argUuid)),
    updateReturnValueArrayDepth: (value: string, argUuid: string) => dispatch(signaturesActions.updateReturnValueArrayDepth(value, argUuid)),
    updateArgumentType: (name: string, argUuid: string) => dispatch(signaturesActions.updateArgumentType(name, argUuid)),
    updateArgumentName: (name: string, argUuid: string) => dispatch(signaturesActions.updateArgumentName(name, argUuid)),
    updateArgumentArrayDepth: (value: string, argUuid: string) => dispatch(signaturesActions.updateArgumentArrayDepth(value, argUuid)),
    updateArgumentDefaultValue: (value: string, argUuid: string) => dispatch(signaturesActions.updateArgumentDefaultValue(value, argUuid)),
    addFunctionArgument: () => dispatch(signaturesActions.addFunctionArgument()),
    addFunctionReturnValue: () => dispatch(signaturesActions.addFunctionReturnValue()),
    removeFunctionReturnValue: (argUuid: string) => dispatch(signaturesActions.removeFunctionReturnValue(argUuid)),
    removeFunctionArgument: (argUuid: string) => dispatch(signaturesActions.removeFunctionArgument(argUuid)),
    removeFunctionSignature: (sigUuid: string) => dispatch(signaturesActions.removeFunctionSignature(sigUuid)),
    makeFunctionArgumentOptional: (argUuid: string) => dispatch(signaturesActions.makeFunctionArgumentOptional(argUuid))
  }
}

const EditSignature = ({
  types,
  signature,
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
      onClick={() => removeFunctionSignature(signature.uuid)}
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
        signature.requiredArgs.concat(signature.optionalArgs)
          .map((arg, i) =>
            <EditArgument
              index={i}
              arg={arg}
              types={types}
              onTypeChanged={updateArgumentType}
              onNameChanged={updateArgumentName}
              onRemove={removeFunctionArgument}
              onArrayDepthChanged={updateArgumentArrayDepth}
              onMakeOptional={(arg instanceof OptionalArgument) ? null : makeFunctionArgumentOptional}
              onDefaultValueChanged={(arg instanceof OptionalArgument) ? updateArgumentDefaultValue : null}
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