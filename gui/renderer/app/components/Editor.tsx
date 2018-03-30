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
import { selectCurrentlyEditedFunction } from '../redux/signatures/selectors';


const Tablist = styled.div`
  height: 40px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
`
type Props = {
  isSaveFunctionDialogOpen: boolean
  functions: Function[]
  editedFunction: Function | null
  closeSaveFunctionDialog: () => void
  editFunction: (uuid: string) => void
  unloadFunction: (uuid: string) => void
}

function mapStateToProps(state: RootState) {
  const { isSaveFunctionDialogOpen } = state.ui.editor
  const { functions } = state.signatures

  const sel = selectCurrentlyEditedFunction(state.signatures)
  return {
    isSaveFunctionDialogOpen,
    editedFunction: sel ? sel.fn : null,
    functions
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
    const { editedFunction } = this.props
    return (
      <div>
        <EditorMenu />
        <Tablist>
          {
            this.props.functions
              .map(fn =>
                <EditorTabIcon
                  isSelected={fn.uuid === (editedFunction && editedFunction.uuid)}
                  key={fn.uuid}
                  tabName={fn.fnName}
                  onSelect={() => this.props.editFunction(fn.uuid)}
                  onClose={() => this.props.unloadFunction(fn.uuid)}
                />
            )
          }
        </Tablist>
        <SignatureTablist
          editedFunction={editedFunction}
        />
        <SaveFunctionDialog
          resultFunction={editedFunction}
          isOpen={this.props.isSaveFunctionDialogOpen}
          onSave={() => console.log('SaveFunctionDialog onSave')}
          onClose={this.props.closeSaveFunctionDialog}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)