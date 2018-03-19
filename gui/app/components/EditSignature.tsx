import * as React from 'react'
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import { IFunction, ISignature } from '../../../persistence/types/index';

type Props = {
  signature: ISignature
}

export const EditSignature = ({ signature } : Props) => (
  <div>
    {
      signature.returnValues.map(ret =>
        <span>
          <AutoComplete
            floatingLabelText="Type"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={['Mat', 'Vec', 'int', 'uint', 'string']}
            searchText={ret.type}
            onNewRequest={(e) => console.log(e)}
          />
          <TextField
            value={ret.name}
            floatingLabelText="Name"
            hintText="Name"
          />
        </span>
      )
    }
  </div>
)