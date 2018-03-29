import * as React from 'react'
import TextField from 'material-ui/TextField';
import styled from 'styled-components'
import { IFunction, ISignature } from '@opencv4nodejs-gen/persistence/types/index';
import { EditTypeAndValue } from './EditTypeAndValue';
import { AddButton } from './AddButton';
import { RemoveButton } from './RemoveButton';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

type Props = {
  types: string[]
  signature: ISignature
  updateReturnValueType: (type: string, argName: string) => void
  updateReturnValueName: (name: string, argName: string) => void
  updateArgumentType: (type: string, argName: string) => void
  updateArgumentName: (name: string, argName: string) => void
  addFunctionArgument: () => void
  addFunctionReturnValue: () => void
  removeReturnValue: (argName: string) => void
  removeArgument: (argName: string) => void
  removeFunctionSignature: () => void
}

export const EditSignature = ({
  types,
  signature,
  updateReturnValueType,
  updateReturnValueName,
  updateArgumentType,
  updateArgumentName,
  addFunctionArgument,
  addFunctionReturnValue,
  removeReturnValue,
  removeArgument,
  removeFunctionSignature

} : Props) => (
  <Container>
    <RemoveButton 
      style={{ margin: 10, alignSelf: 'flex-end' }}
      label="Remove Signature"
      onClick={removeFunctionSignature}
    />
    <h3> {'Return Values'} </h3>
    <div>
      {
        (signature.returnValues || []).map((ret, i) =>
          <EditTypeAndValue
            index={i}
            arg={ret}
            types={types}
            onTypeChanged={updateReturnValueType}
            onNameChanged={updateReturnValueName}
            onRemove={removeReturnValue}
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
        (signature.requiredArgs.concat(signature.optionalArgs)).map((arg, i) =>
          <EditTypeAndValue
            index={i}
            arg={arg}
            types={types}
            onTypeChanged={updateArgumentType}
            onNameChanged={updateArgumentName}
            onRemove={removeArgument}
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