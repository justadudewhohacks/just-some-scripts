import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';

type Props = {
  label?: string
  onClick: () => void
  style?: any
}

export const RemoveButton = (props : Props) => 
  <RaisedButton
    secondary
    icon={<ContentRemove />}
    {...props}
  />