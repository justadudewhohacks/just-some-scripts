import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import ContentSave from 'material-ui/svg-icons/content/save';

type Props = {
  label: string
  onClick: () => void
  style?: any
}

export const SaveButton = (props : Props) =>
  <RaisedButton
    primary
    icon={<ContentSave />}
    {...props}
  />