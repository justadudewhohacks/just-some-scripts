import * as React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { IFunction } from '@opencv4nodejs-gen/persistence/types/index';
import EditFunctionMetaData from './EditFunctionMetaData';
import EditSignature from './EditSignature';
import { SaveButton } from './Buttons'
import { RootState } from '../redux/rootReducer';
import { actions as signaturesActions } from '../redux/signatures'
import { selectors as cacheSelectors } from '../redux/cache'
import { actions as editorActions } from '../redux/ui/editor';


type Props = {
  types: string[]
  editContext: { fn: IFunction, currentSignatureIdx?: number }
  editFunctionSignature: (tabId: string) => void
  openSaveFunctionDialog: () => void
}

function getTabId(fnId: string, idx: number) {
  return `${fnId}_${idx}`
}

function getIndexFromTabId(tabId: string): number {
  return parseInt(tabId.split('_')[1])
}

function mapStateToProps(state: RootState) {
  const { signatures, cache } = state
  const editedFunction = signatures.editedFunctions.find(f => f._id === signatures.currentlyEditing._id)
  return {
    editContext: editedFunction && {
      fn: editedFunction,
      currentSignatureIdx: signatures.currentlyEditing.currentSignatureIdx
    },
    types: cacheSelectors.selectTypes(cache)
  }
}

function mapDispatchToProps(dispatch: any) {
  function editFunctionSignature(tabId: string) {
    return tabId === 'ADD_SIGNATURE_BUTTON'
      ? dispatch(signaturesActions.addFunctionSignature())
      : dispatch(signaturesActions.editFunctionSignature(getIndexFromTabId(tabId)))
  }

  return {
    editFunctionSignature,
    openSaveFunctionDialog: () => dispatch(editorActions.openSaveFunctionDialog())
  }
}

const SignatureTablist = ({
  types,
  editContext,
  editFunctionSignature,
  openSaveFunctionDialog
} : Props) => {

  if (!editContext)
    return null

  const { fn: { _id }, currentSignatureIdx } = editContext

  return (
    <div style={{ margin: 10 }}>
      <SaveButton
        style={{ margin: 10, alignSelf: 'flex-end' }}
        label="Show Result"
        onClick={openSaveFunctionDialog}
      />
      <EditFunctionMetaData
        editedFunctionMetaData={editContext.fn}
      />
      <Tabs
        value={getTabId(_id, currentSignatureIdx)}
        onChange={editFunctionSignature}
      >
        {
          editContext.fn.signatures
            .map((s, i) => ({ signature: s, tabId: getTabId(_id, i)}))
            .map(({ signature, tabId }, i) =>
              <Tab
                label={i}
                value={tabId}
                key={tabId}
              >
                <EditSignature
                  types={types}
                  signature={signature}
                  idx={i}
                  key={tabId}
                />
              </Tab>
            )
        }
        <Tab
          value={'ADD_SIGNATURE_BUTTON'}
          icon={<ContentAdd />}
          label="Add Signature"
          buttonStyle={{ flexDirection: 'row', height: 'inherit' }}
        />
      </Tabs>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureTablist)