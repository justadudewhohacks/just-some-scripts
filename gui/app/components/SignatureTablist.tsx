import * as React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { connect } from 'react-redux'
import { IFunction } from '../../../persistence/types/index';
import { EditSignature } from './EditSignature';
import { RootState } from '../redux/rootReducer';
import { actions as signaturesActions } from '../redux/Signatures'

type Props = {
  editContext: { fn: IFunction, selectedSignatureIdx?: number }
  editFunctionSignature: (tabId: string) => void
  updateReturnValueType: (type: string, argName: string) => void
  updateReturnValueName: (name: string, argName: string) => void
  updateArgumentType: (type: string, argName: string) => void
  updateArgumentName: (name: string, argName: string) => void
}

function getTabId(fnId: string, idx: number) {
  return `${fnId}_${idx}`
}

function getIndexFromTabId(tabId: string): number {
  return parseInt(tabId.split('_')[1])
}

function mapStateToProps(state: RootState) {
  const { signatures } = state
  const editedFunction = signatures.editedFunctions.find(f => f._id === signatures.currentlyEditing._id)
  return {
    editContext: editedFunction && {
      fn: editedFunction,
      selectedSignatureIdx: signatures.currentlyEditing.selectedSignatureIdx
    }
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    editFunctionSignature: (tabId: string) => dispatch(signaturesActions.editFunctionSignature(getIndexFromTabId(tabId))),
    updateReturnValueType: (type: string, argName: string) => dispatch(signaturesActions.updateReturnValueType(type, argName)),
    updateReturnValueName: (name: string, argName: string) => dispatch(signaturesActions.updateReturnValueName(name, argName)),
    updateArgumentType: (name: string, argName: string) => dispatch(signaturesActions.updateArgumentType(name, argName)),
    updateArgumentName: (name: string, argName: string) => dispatch(signaturesActions.updateArgumentName(name, argName))
  }
}

const SignatureTablist = ({ editContext, editFunctionSignature, updateReturnValueType, updateReturnValueName, updateArgumentType, updateArgumentName } : Props) => {
  if (!editContext)
    return null

  const { fn: { _id }, selectedSignatureIdx } = editContext

  return (
    <Tabs
      value={getTabId(_id, selectedSignatureIdx)}
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
                key={tabId}
                signature={signature}
                updateReturnValueType={updateReturnValueType}
                updateReturnValueName={updateReturnValueName}
                updateArgumentType={updateArgumentType}
                updateArgumentName={updateArgumentName}
              />
            </Tab>
          )
      }
    </Tabs>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureTablist)