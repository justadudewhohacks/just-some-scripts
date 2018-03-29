import * as React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { IFunction } from '@opencv4nodejs-gen/persistence/types/index';
import EditFunctionMetaData from './EditFunctionMetaData';
import { SaveButton } from './Buttons'
import { EditSignature } from './EditSignature';
import { RootState } from '../redux/rootReducer';
import { actions as signaturesActions } from '../redux/signatures'
import { selectors as cacheSelectors } from '../redux/cache'
import { actions as editorActions } from '../redux/ui/editor';


type Props = {
  types: string[]
  editContext: { fn: IFunction, currentSignatureIdx?: number }
  editFunctionSignature: (tabId: string) => void
  updateReturnValueType: (type: string, argName: string) => void
  updateReturnValueName: (name: string, argName: string) => void
  updateArgumentType: (type: string, argName: string) => void
  updateArgumentName: (name: string, argName: string) => void
  addFunctionArgument: () => void
  addFunctionReturnValue: () => void
  removeFunctionReturnValue: (argName: string) => void
  removeFunctionArgument: (argName: string) => void,
  removeFunctionSignature: (idx: number) => void
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
    updateReturnValueType: (type: string, argName: string) => dispatch(signaturesActions.updateReturnValueType(type, argName)),
    updateReturnValueName: (name: string, argName: string) => dispatch(signaturesActions.updateReturnValueName(name, argName)),
    updateArgumentType: (name: string, argName: string) => dispatch(signaturesActions.updateArgumentType(name, argName)),
    updateArgumentName: (name: string, argName: string) => dispatch(signaturesActions.updateArgumentName(name, argName)),
    addFunctionArgument: () => dispatch(signaturesActions.addFunctionArgument()),
    addFunctionReturnValue: () => dispatch(signaturesActions.addFunctionReturnValue()),
    removeFunctionReturnValue: (argName: string) => dispatch(signaturesActions.removeFunctionReturnValue(argName)),
    removeFunctionArgument: (argName: string) => dispatch(signaturesActions.removeFunctionArgument(argName)),
    removeFunctionSignature: (idx: number) => dispatch(signaturesActions.removeFunctionSignature(idx)),
    openSaveFunctionDialog: () => dispatch(editorActions.openSaveFunctionDialog())
  }
}

const SignatureTablist = ({
  types,
  editContext,
  editFunctionSignature,
  updateReturnValueType,
  updateReturnValueName,
  updateArgumentType,
  updateArgumentName,
  addFunctionArgument,
  addFunctionReturnValue,
  removeFunctionReturnValue,
  removeFunctionArgument,
  removeFunctionSignature,
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
                  key={tabId}
                  signature={signature}
                  updateReturnValueType={updateReturnValueType}
                  updateReturnValueName={updateReturnValueName}
                  updateArgumentType={updateArgumentType}
                  updateArgumentName={updateArgumentName}
                  addFunctionArgument={addFunctionArgument}
                  addFunctionReturnValue={addFunctionReturnValue}
                  removeReturnValue={removeFunctionReturnValue}
                  removeArgument={removeFunctionArgument}
                  removeFunctionSignature={() => removeFunctionSignature(i)}
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