import * as React from 'react'
import AutoComplete from './AutoComplete';
import TextField from 'material-ui/TextField';
import { IFunction, ISignature } from '../../../persistence/types/index';

type Props = {
  signature: ISignature
  updateReturnValueType: (type: string, idx: number) => void
  updateReturnValueName: (name: string, idx: number) => void
}

export const EditSignature = ({ signature, updateReturnValueType, updateReturnValueName } : Props) => (
  <div>
    {
      (signature.returnValues || []).map((ret, i) =>
        <span>
          <AutoComplete
            floatingLabelText="Type"
            dataSource={['Mat', 'Vec', 'int', 'uint', 'string']}
            onNewRequest={(value: any) => updateReturnValueType(value, i)}
            initialSearchText={ret.type}
          />
          <TextField
            value={ret.name}
            floatingLabelText="Name"
            hintText="Name"
            onChange={(_, value) => updateReturnValueName(value, i)}
          />
        </span>
      )
    }
  </div>
)