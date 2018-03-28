import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'
import { AutoComplete, FloatingActionButton, TextField } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import styled from 'styled-components'
import { IFunction, IFunctionMetaData } from '@opencv4nodejs-gen/persistence/types/index'
import { EditorTabIcon } from './EditorTabIcon'
import SignatureTablist from './SignatureTablist';
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
  searchFunctionsInput: string
  searchFunctionsSuggestions: string[]
  editFunction: (_id: string) => void
  onSearchFunctionsInputChanged: (value: string) => void
  search: (value: string) => void
}

function mapStateToProps(state: RootState) {
  const { functions } = state.cache
  const { editedFunctions, currentlyEditing } = state.signatures
  const { searchFunctionsInput } = state.ui.editor

  return {
    editContext: {
      // TODO selector
      fn: editedFunctions.find(f => f._id === currentlyEditing._id),
      currentSignatureIdx: currentlyEditing.currentSignatureIdx
    },
    functions,
    searchFunctionsInput,
    searchFunctionsSuggestions: editorSelectors.autoCompleteFunctionName(state, searchFunctionsInput)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    editFunction: (_id: string) => dispatch(signaturesActions.editFunction(_id)),
    onSearchFunctionsInputChanged: (value: string) => dispatch(editorActions.searchFunctionsInputChanged(value)),
    search: (value: string) => dispatch(cacheActions.fetchFunction(value)),
  }
}

class Editor extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onEditorTabSelected = this.onEditorTabSelected.bind(this)
    this.onEditorTabClosed = this.onEditorTabClosed.bind(this)
  }

  onKeyPress(e: React.KeyboardEvent<any>) {
    if (e.key === 'Enter')
      this.onSearch()
  }

  onSearch() {
    this.props.search(this.props.searchFunctionsInput)
  }

  onEditorTabSelected(tabId: string) {
    const fn = this.props.functions.find(f => f._id === tabId)
    this.props.editFunction(fn._id)
  }

  onEditorTabClosed(tabId: string) {

  }

  render() {
    const { fn } = this.props.editContext
    return (
      <div>
        <Tablist>
          {
            this.props.functions
              .map(s =>({ tabName: s.fnName, tabId: s._id }))
              .map(({ tabName, tabId }) =>
                <EditorTabIcon
                  isSelected={tabId === (fn && fn._id)}
                  key={tabId}
                  tabName={tabName}
                  onSelect={() => this.onEditorTabSelected(tabId)}
                  onClose={() => this.onEditorTabClosed(tabId)}
                />
            )
          }
        </Tablist>
        <AutoComplete
          floatingLabelText="Load Function Signature"
          hintText="Load Function Signature"
          dataSource={this.props.searchFunctionsSuggestions}
          filter={() => true}
          onUpdateInput={this.props.onSearchFunctionsInputChanged}
          onNewRequest={this.props.search}
          searchText={this.props.searchFunctionsInput}
        />
        <FloatingActionButton
          onClick={this.onSearch}
          style={{ marginRight: 20 }}
        >
          <ActionSearch />
        </FloatingActionButton>
        <SignatureTablist />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)