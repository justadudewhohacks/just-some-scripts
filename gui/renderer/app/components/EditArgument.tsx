import * as React from 'react'
import TextField from 'material-ui/TextField';
import styled from 'styled-components'
import AutoComplete from 'material-ui/AutoComplete';
import { RemoveButton, AddButton } from './Buttons';
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
  onArrayDepthChanged: (value: string, argName: string) => void
  onRemove: (argName: string) => void
  onMakeOptional?: (argName: string) => void
  onDefaultValueChanged?: (value: string, argName: string) => void
}

export const EditArgument = ({ arg, index, types, onTypeChanged, onNameChanged, onRemove, onDefaultValueChanged, onArrayDepthChanged, onMakeOptional } : Props) => (
  <Row>
    <h3> { `${index}. ` } </h3>
    <AutoComplete
      dataSource={types}
      floatingLabelText="Type"
      searchText={arg.type}
      onUpdateInput={value => onTypeChanged(value, arg.name)}
      onNewRequest={value => onTypeChanged(value, arg.name)}
      style={{ width: 120 }}
    />
    <TextField
      value={arg.name}
      floatingLabelText="Name"
      hintText="Name"
      onChange={(_, value) => onNameChanged(value, arg.name)}
      style={{ width: 120 }}
    />
    <TextField
      value={arg.arrayDepth || 0}
      floatingLabelText="Array Depth"
      hintText="Name"
      onChange={(_, value) => onArrayDepthChanged(value, arg.name)}
      style={{ width: 120 }}
    />
    {
      onDefaultValueChanged
        ?
          <TextField
            value={arg.defaultValue || ''}
            floatingLabelText="Name"
            hintText="Name"
            onChange={(_, value) => onDefaultValueChanged(value, arg.name)}
            style={{ width: 180 }}
          />
        :
          <AddButton
            label="Optional"
            onClick={() => onMakeOptional(arg.name)}
            style={{ width: 180 }}
          />
    }
    <RemoveButton
      label={''}
      style={{ alignSelf: 'center'}}
      onClick={() => onRemove(arg.name)}
    />
  </Row>
)