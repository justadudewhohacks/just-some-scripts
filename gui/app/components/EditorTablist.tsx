import * as React from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'
import { EditorTabIcon } from './EditorTabIcon'

const Tablist = styled.div`
  height: 40px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
`

type Props = {
  selectedTabId: string
  tabs: { tabName: string, tabId: string }[]
  onSelect: (tabId: string) => void
  onClose: (tabId: string) => void
}

export const EditorTablist = ({ selectedTabId, tabs, onSelect, onClose } : Props) => (
  <Tablist>
    {
      tabs.map(({ tabName, tabId }) =>
        <EditorTabIcon
          isSelected={tabId === selectedTabId}
          key={tabId}
          tabName={tabName}
          onSelect={() => onSelect(tabId)}
          onClose={() => onClose(tabId)}
        />
      )
    }
  </Tablist>
)