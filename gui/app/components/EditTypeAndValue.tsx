import * as React from 'react'
import AutoComplete from './AutoComplete';
import TextField from 'material-ui/TextField';
import { IFunction, ISignature, IArgument } from '../../../persistence/types/index';

type Props = {
  arg: IArgument
  types: string[]
  updateType: (type: string, argName: string) => void
  updateName: (name: string, argName: string) => void
}

export const EditTypeAndValue = ({ arg, types, updateType, updateName } : Props) => (
  <span>
    <AutoComplete
      floatingLabelText="Type"
      dataSource={types}
      onNewRequest={value => updateType(value, arg.name)}
      initialSearchText={arg.type}
    />
    <TextField
      value={arg.name}
      floatingLabelText="Name"
      hintText="Name"
      onChange={(_, value) => updateName(value, arg.name)}
    />
  </span>
)