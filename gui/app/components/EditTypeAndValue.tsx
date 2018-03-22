import * as React from 'react'
import TextField from 'material-ui/TextField';
import styled from 'styled-components'
import AutoComplete from './AutoComplete';
import { RemoveButton } from './RemoveButton'
import { IFunction, ISignature, IArgument } from '../../../persistence/types/index';

const Row = styled.div`
  background: ${props => props.theme.colors.passive}
  display: inline-flex;
  align-items: baseline;
  margin-bottom: 10px;
  > * {
    margin: 0 20px;
  }
`

type Props = {
  arg: IArgument
  index: number
  types: string[]
  updateType: (type: string, argName: string) => void
  updateName: (name: string, argName: string) => void
  onRemove: (argName: string) => void
}

export const EditTypeAndValue = ({ arg, index, types, updateType, updateName, onRemove } : Props) => (
  <Row>
    <h3> { `${index}. ` } </h3>
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
    <RemoveButton 
      label={''} 
      style={{ alignSelf: 'center'}}
      onClick={() => onRemove(arg.name)}
    />
  </Row>
)