import * as React from 'react'
import AutoComplete from './AutoComplete';
import TextField from 'material-ui/TextField';
import { IFunction, ISignature } from '../../../persistence/types/index';
import { EditTypeAndValue } from './EditTypeAndValue';

type Props = {
  signature: ISignature
  updateReturnValueType: (type: string, argName: string) => void
  updateReturnValueName: (name: string, argName: string) => void
  updateArgumentType: (type: string, argName: string) => void
  updateArgumentName: (name: string, argName: string) => void
}

const types = ['Mat', 'Vec', 'int', 'uint', 'string']

export const EditSignature = ({ signature, updateReturnValueType, updateReturnValueName, updateArgumentType, updateArgumentName } : Props) => (
  <div>
    <h1> {'Return Values'} </h1>
    {
      (signature.returnValues || []).map((ret, i) =>
        <EditTypeAndValue
          arg={ret}
          types={types}
          updateType={updateReturnValueType}
          updateName={updateReturnValueName}
        />
      )
    }
    <h1> {'Arguments'} </h1>
    {
      (signature.requiredArgs.concat(signature.optionalArgs)).map((arg, i) =>
        <EditTypeAndValue
          arg={arg}
          types={types}
          updateType={updateArgumentType}
          updateName={updateArgumentName}
        />
      )
    }
  </div>
)