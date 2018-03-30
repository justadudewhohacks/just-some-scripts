import { Argument, OptionalArgument } from '@opencv4nodejs-gen/entities';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import styled from 'styled-components';

import { AddButton, RemoveButton } from './Buttons';
import { ReturnValue } from '../../../../entities/classes/Argument';

const Row = styled.div`
  background: ${props => props.theme.colors.passive};
  display: inline-flex;
  align-items: baseline;
  margin-bottom: 10px;
  > * {
    margin: 0 20px;
  }
`

type Props = {
  arg: Argument | OptionalArgument
  index: number
  types: string[]
  onTypeChanged: (type: string, argUuid: string) => void
  onNameChanged: (name: string, argUuid: string) => void
  onArrayDepthChanged: (value: string, argUuid: string) => void
  onRemove: (argUuid: string) => void
  onMakeOptional?: (argUuid: string) => void
  onDefaultValueChanged?: (value: string, argUuid: string) => void
}

export const EditArgument = ({ arg, index, types, onTypeChanged, onNameChanged, onRemove, onDefaultValueChanged, onArrayDepthChanged, onMakeOptional } : Props) => (
  <Row>
    <h3> { `${index}. ` } </h3>
    <AutoComplete
      dataSource={types}
      floatingLabelText="Type"
      searchText={arg.type}
      onUpdateInput={value => onTypeChanged(value, arg.uuid)}
      onNewRequest={value => onTypeChanged(value, arg.uuid)}
      style={{ width: 120 }}
    />
    <TextField
      value={arg.name}
      floatingLabelText="Name"
      hintText="Name"
      onChange={(_, value) => onNameChanged(value, arg.uuid)}
      style={{ width: 120 }}
    />
    <TextField
      value={arg.arrayDepth || 0}
      floatingLabelText="Array Depth"
      hintText="Name"
      onChange={(_, value) => onArrayDepthChanged(value, arg.uuid)}
      style={{ width: 120 }}
    />
    {
      (arg instanceof OptionalArgument) &&
        <TextField
          value={arg.defaultValue || ''}
          floatingLabelText="Name"
          hintText="Name"
          onChange={(_, value) => onDefaultValueChanged(value, arg.uuid)}
          style={{ width: 180 }}
        />
    }
    {
      !(arg instanceof OptionalArgument) && !(arg instanceof ReturnValue) &&
      <AddButton
        label="Optional"
        onClick={() => onMakeOptional(arg.uuid)}
        style={{ width: 180 }}
      />
    }
    <RemoveButton
      label={''}
      style={{ alignSelf: 'center'}}
      onClick={() => onRemove(arg.uuid)}
    />
  </Row>
)