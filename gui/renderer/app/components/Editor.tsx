import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'
import { AutoComplete, FloatingActionButton, TextField } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import styled from 'styled-components'
import { IFunction, IFunctionMetaData } from '../../../../persistence/types/index'
import { EditorTabIcon } from './EditorTabIcon'
import SignatureTablist from './SignatureTablist';
import EditorMenu from './EditorMenu';
import { RootState } from '../redux/rootReducer';
import { actions as cacheActions } from '../redux/cache';
import { actions as signaturesActions } from '../redux/signatures';
import { actions as editorActions, selectors as editorSelectors } from '../redux/ui/editor';


const Tablist = styled.div`
  height: 40px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
`
type Props = {
  functions: IFunction[]
  editContext: { fn: IFunction | null, currentSignatureIdx: number | null }
  editFunction: (_id: string) => void
  unloadFunction: (_id: string) => void
}

function mapStateToProps(state: RootState) {
  const { editedFunctions, currentlyEditing } = state.signatures

  return {
    editContext: {
      // TODO selector
      fn: editedFunctions.find(f => f._id === currentlyEditing._id),
      currentSignatureIdx: currentlyEditing.currentSignatureIdx
    },
    functions: editedFunctions
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    editFunction: (_id: string) => dispatch(signaturesActions.editFunction(_id)),
    unloadFunction: (_id: string) => dispatch(cacheActions.unloadFunction(_id))
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
              .map(s =>({ tabName: s.fnName, tabId: s._id }))
              .map(({ tabName, tabId }) =>
                <EditorTabIcon
                  isSelected={tabId === (fn && fn._id)}
                  key={tabId}
                  tabName={tabName}
                  onSelect={() => this.props.editFunction(tabId)}
                  onClose={() => this.props.unloadFunction(tabId)}
                />
            )
          }
        </Tablist>
        <SignatureTablist />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)