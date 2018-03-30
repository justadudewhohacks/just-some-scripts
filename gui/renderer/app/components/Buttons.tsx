import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSave from 'material-ui/svg-icons/content/save';
import * as React from 'react';

type Props = {
  label: string
  onClick: () => void
  style?: any
}

export const AddButton = (props : Props) =>
  <RaisedButton
    primary
    icon={<ContentAdd />}
    {...props}
  />

export const RemoveButton = (props : Props) =>
  <RaisedButton
    secondary
    icon={<ContentRemove />}
    {...props}
  />

export const SaveButton = (props : Props) =>
  <RaisedButton
    primary
    icon={<ContentSave />}
    {...props}
  />