import ContentAdd from 'material-ui/svg-icons/content/add';
import { Tab, Tabs } from 'material-ui/Tabs';
import * as React from 'react';
import { connect } from 'react-redux';

import { FunctionInstance } from '../classes';
import { selectors as cacheSelectors } from '../redux/cache';
import { RootState } from '../redux/rootReducer';
import { actions as signaturesActions } from '../redux/signatures';
import { selectCurrentlyEditedFunctionSignature } from '../redux/signatures/selectors';
import { actions as editorActions } from '../redux/ui/editor';
import { SaveButton } from './Buttons';
import EditFunctionMetaData from './EditFunctionMetaData';
import EditSignature from './EditSignature';


type Props = {
  types: string[]
  editedFunction: FunctionInstance | null,
  editedSignatureUuid: string | null,
  editFunctionSignature: (uuid: string) => void
  openSaveFunctionDialog: () => void
}

function mapStateToProps(state: RootState) {
  const sel = selectCurrentlyEditedFunctionSignature(state.signatures)
  return {
    editedSignatureUuid: sel ? sel.sig.uuid : null,
    types: cacheSelectors.selectTypes(state.cache)
  }
}

function mapDispatchToProps(dispatch: any) {
  function editFunctionSignature(uuid: string) {
    return uuid === 'ADD_SIGNATURE_BUTTON'
      ? dispatch(signaturesActions.addFunctionSignature())
      : dispatch(signaturesActions.editFunctionSignature(uuid))
  }

  return {
    editFunctionSignature,
    openSaveFunctionDialog: () => dispatch(editorActions.openSaveFunctionDialog())
  }
}

const SignatureTablist = ({
  types,
  editedFunction,
  editedSignatureUuid,
  editFunctionSignature,
  openSaveFunctionDialog
} : Props) => {

  if (!editedFunction)
    return null

  return (
    <div style={{ margin: 10 }}>
      <SaveButton
        style={{ margin: 10, alignSelf: 'flex-end' }}
        label="Show Result"
        onClick={openSaveFunctionDialog}
      />
      <EditFunctionMetaData
        editedFunctionMetaData={editedFunction}
      />
      <Tabs
        value={editedSignatureUuid}
        onChange={editFunctionSignature}
      >
        {
          editedFunction.signatures
            .map((sig, idx) =>
              <Tab
                label={idx}
                value={sig.uuid}
                key={sig.uuid}
              >
                <EditSignature
                  types={types}
                  signature={sig}
                  key={sig.uuid}
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