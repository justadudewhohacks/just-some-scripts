import { AutoComplete, FloatingActionButton } from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';
import * as React from 'react';
import { connect } from 'react-redux';

import { actions as cacheActions } from '../redux/cache';
import { RootState } from '../redux/rootReducer';
import { actions as signatureActions } from '../redux/signatures';
import { actions as editorActions, selectors as editorSelectors } from '../redux/ui/editor';
import { AddButton } from './Buttons';

type Props = {
  searchFunctionsInput: string
  searchFunctionsSuggestions: string[]
  createNewFunctionSignature: (value: string) => void
  onSearchFunctionsInputChanged: (value: string) => void
  search: (value: string) => void
}

function mapStateToProps(state: RootState) {
  const { searchFunctionsInput } = state.ui.editor

  return {
    searchFunctionsInput,
    searchFunctionsSuggestions: editorSelectors.autoCompleteFunctionName(state, searchFunctionsInput)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    createNewFunctionSignature: (value: string) => dispatch(signatureActions.createNewFunctionSignature(value)),
    onSearchFunctionsInputChanged: (value: string) => dispatch(editorActions.searchFunctionsInputChanged(value)),
    search: (value: string) => dispatch(cacheActions.fetchFunction(value)),
  }
}

class EditorMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onNewFunctionSignature = this.onNewFunctionSignature.bind(this)
  }

  onKeyPress(e: React.KeyboardEvent<any>) {
    if (e.key === 'Enter')
      this.onSearch()
  }

  onSearch() {
    this.props.search(this.props.searchFunctionsInput)
  }

  onNewFunctionSignature() {
    this.props.createNewFunctionSignature(this.props.searchFunctionsInput)
  }

  render() {
    return (
      <div>
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
        <AddButton
          label="New"
          style={{ margin: '10px' }}
          onClick={this.onNewFunctionSignature}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorMenu)