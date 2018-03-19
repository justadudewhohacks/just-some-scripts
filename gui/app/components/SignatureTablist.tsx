import * as React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { IFunction } from '../../../persistence/types/index';
import { EditSignature } from './EditSignature';

type Props = {
  editContext: { fn: IFunction, selectedSignatureIdx?: number }
  selectedTab: number
  onSelect: (tabId: string) => void
}

export const SignatureTablist = ({ editContext, selectedTab, onSelect } : Props) => (
  <Tabs
    value={selectedTab}
    onChange={onSelect}
  >
    {
      editContext.fn.signatures.map((sig, i) =>
        <Tab
          label={i}
          value={i}
          key={i}
        >
          <EditSignature
            key={i}
            signature={sig}
          />
        </Tab>
      )
    }
  </Tabs>
)