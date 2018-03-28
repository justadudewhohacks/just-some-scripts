import * as React from 'react'
import TextField from 'material-ui/TextField';
import styled from 'styled-components'
import AutoComplete from 'material-ui/AutoComplete';
import { RemoveButton } from './RemoveButton'
import { IFunction, ISignature, IArgument } from '@opencv4nodejs-gen/persistence/types/index';

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
  onTypeChanged: (type: string, argName: string) => void
  onNameChanged: (name: string, argName: string) => void
  onRemove: (argName: string) => void
}

export const EditTypeAndValue = ({ arg, index, types, onTypeChanged, onNameChanged, onRemove } : Props) => (
  <Row>
    <h3> { `${index}. ` } </h3>
    <AutoComplete
      dataSource={types}
      floatingLabelText="Type"
      searchText={arg.type}
      onUpdateInput={value => onTypeChanged(value, arg.name)}
      onNewRequest={value => onTypeChanged(value, arg.name)}
    />
    <TextField
      value={arg.name}
      floatingLabelText="Name"
      hintText="Name"
      onChange={(_, value) => onNameChanged(value, arg.name)}
    />
    <RemoveButton
      label={''}
      style={{ alignSelf: 'center'}}
      onClick={() => onRemove(arg.name)}
    />
  </Row>
)