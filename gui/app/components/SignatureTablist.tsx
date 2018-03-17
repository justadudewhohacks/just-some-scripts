import * as React from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'

const Tablist = styled.div`
  height: 40px;
  display: flex;
  overflow-x: auto;
`

const Tab = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.active};
`

type _Props = {
  tabName: string
  onSelect: () => void
  onClose: () => void
}

const SignatureTab = ({ tabName, onSelect, onClose } : _Props) =>
  <Tab>
    <FlatButton
      label={ tabName }
      style={{ height: '100%' }}
      onClick={onSelect}
    />
    <IconButton
      style={{ padding: 0, height: '100%' }}
      tooltip="Close"
      touch={true}
      tooltipPosition="bottom-center"
      onClick={onClose}
    >
      <NavigationClose />
    </IconButton>
  </Tab>

type Props = {
  selectedIdx: number
  tabNames: string[]
}

export const SignatureTablist = ({ selectedIdx, tabNames } : Props) => (
  <Tablist>
    {
      tabNames.map(t =>
        <SignatureTab
          key={t}
          tabName={t}
          onSelect={() => console.log('select ' + t)}
          onClose={() => console.log('close ' + t)}
        />
      )
    }
  </Tablist>
)