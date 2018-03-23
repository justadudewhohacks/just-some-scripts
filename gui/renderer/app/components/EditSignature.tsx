import * as React from 'react'
import AutoComplete from './AutoComplete';
import TextField from 'material-ui/TextField';
import { IFunction, ISignature } from '@opencv4nodejs-gen/persistence/types/index';
import { EditTypeAndValue } from './EditTypeAndValue';
import { AddButton } from './AddButton';

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
  removeArgument

} : Props) => (
  <div>
    <h3> {'Return Values'} </h3>
    <div>
      {
        (signature.returnValues || []).map((ret, i) =>
          <EditTypeAndValue
            index={i}
            arg={ret}
            types={types}
            updateType={updateReturnValueType}
            updateName={updateReturnValueName}
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
            updateType={updateArgumentType}
            updateName={updateArgumentName}
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
  </div>
)