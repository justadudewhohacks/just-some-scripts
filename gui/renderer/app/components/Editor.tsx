import { Function } from '@opencv4nodejs-gen/entities';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions as cacheActions } from '../redux/cache';
import { RootState } from '../redux/rootReducer';
import { actions as signaturesActions } from '../redux/signatures';
import { actions as editorActions } from '../redux/ui/editor';
import EditorMenu from './EditorMenu';
import { EditorTabIcon } from './EditorTabIcon';
import SaveFunctionDialog from './SaveFunctionDialog';
import SignatureTablist from './SignatureTablist';


const Tablist = styled.div`
  height: 40px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
`
type Props = {
  isSaveFunctionDialogOpen: boolean
  functions: Function[]
  editContext: { fn: Function | null, currentSignatureIdx: number | null }
  closeSaveFunctionDialog: () => void
  editFunction: (uuid: string) => void
  unloadFunction: (uuid: string) => void
}

function mapStateToProps(state: RootState) {
  const { editedFunctions, currentlyEditing } = state.signatures
  const { isSaveFunctionDialogOpen } = state.ui.editor

  return {
    isSaveFunctionDialogOpen,
    editContext: {
      // TODO selector
      fn: editedFunctions.find(f => f.uuid === currentlyEditing.uuid),
      currentSignatureIdx: currentlyEditing.currentSignatureIdx
    },
    functions: editedFunctions
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    editFunction: (uuid: string) => dispatch(signaturesActions.editFunction(uuid)),
    unloadFunction: (uuid: string) => dispatch(cacheActions.unloadFunction(uuid)),
    closeSaveFunctionDialog: () => dispatch(editorActions.closeSaveFunctionDialog())
  }
}

class Editor extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }


  render() {
    const { fn } = this.props.editContext
    return (
      <div>
        <EditorMenu />
        <Tablist>
          {
            this.props.functions
              .map(s =>({ tabName: s.fnName, tabId: s.uuid }))
              .map(({ tabName, tabId }) =>
                <EditorTabIcon
                  isSelected={tabId === (fn && fn.uuid)}
                  key={tabId}
                  tabName={tabName}
                  onSelect={() => this.props.editFunction(tabId)}
                  onClose={() => this.props.unloadFunction(tabId)}
                />
            )
          }
        </Tablist>
        <SignatureTablist />
        <SaveFunctionDialog
          resultFunction={fn}
          isOpen={this.props.isSaveFunctionDialogOpen}
          onSave={() => console.log('SaveFunctionDialog onSave')}
          onClose={this.props.closeSaveFunctionDialog}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)