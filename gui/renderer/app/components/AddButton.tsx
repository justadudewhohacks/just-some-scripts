import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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