import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import * as React from 'react';
import styled from 'styled-components';

type TabProps = {
  isSelected: boolean,
  theme?: any
}

const Tab = styled.div`
  display: flex;
  align-items: center;
  background: ${(props: TabProps) => props.theme.colors[props.isSelected ? 'active' : 'passive']};
  margin-right: 10px;
`

type Props = {
  isSelected: boolean
  tabName: string
  onSelect: () => void
  onClose: () => void
}

export const EditorTabIcon = ({ isSelected, tabName, onSelect, onClose } : Props) =>
  <Tab isSelected={isSelected}>
    <FlatButton
      label={ tabName }
      onClick={onSelect}
      style={{ height: '100%' }}
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