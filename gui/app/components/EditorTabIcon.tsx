import * as React from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'

const Tab = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.active};
  margin-right: 10px;
`

type Props = {
  tabName: string
  onSelect: () => void
  onClose: () => void
}

export const EditorTabIcon = ({ tabName, onSelect, onClose } : Props) =>
  <Tab>
    <FlatButton
      label={ tabName }
      style={{ height: '100%' }}
      onClick={onSelect}
    />
    <IconButton
      style={{ padding: 0, width: 30, }}
      tooltip="Close"
      touch={true}
      tooltipPosition="bottom-center"
      onClick={onClose}
    >
      <NavigationClose />
    </IconButton>
  </Tab>