import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { FloatingActionButton, TextField } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import { IFunction } from '@opencv4nodejs-gen/persistence/types/index'
import { EditorTablist } from './EditorTablist';
import { SignatureTablist } from './SignatureTablist';

type EditorProps = {
  functions: IFunction[]
  editContext?: { fn: IFunction, selectedSignatureIdx?: number }
  onSearch: (value: string) => void
  editFunction: (_id: string) => void
}

type EditorState = {
  inputValue: string
}

export class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props)
    this.state = {
      inputValue: ''
    }

    this.onInputChanged = this.onInputChanged.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onEditorTabSelected = this.onEditorTabSelected.bind(this)
    this.onEditorTabClosed = this.onEditorTabClosed.bind(this)
  }

  onInputChanged(_: any, inputValue: string) {
    this.setState({
      inputValue
    })
  }

  onKeyPress(e: React.KeyboardEvent<any>) {
    if (e.key === 'Enter')
      this.props.onSearch(this.state.inputValue)
  }

  onSearch() {
    this.props.onSearch(this.state.inputValue)
  }

  onEditorTabSelected(tabId: string) {
    const fn = this.props.functions.find(f => f._id === tabId)
    this.props.editFunction(fn._id)
  }

  onEditorTabClosed(tabId: string) {

  }

  render() {
    const { editContext } = this.props
    console.log(editContext && editContext.fn._id)

    return (
      <div>
        <EditorTablist
          tabs={this.props.functions.map(s =>({ tabName: s.fnName, tabId: s._id }))}
          selectedTabId={editContext && editContext.fn._id}
          onSelect={this.onEditorTabSelected}
          onClose={this.onEditorTabClosed}
        />
        <TextField
          value={this.state.inputValue}
          onChange={this.onInputChanged}
          onKeyPress={this.onKeyPress}
          hintText="Load Function Signature"
          floatingLabelText="Load Function Signature"
        />
        <FloatingActionButton
          onClick={this.onSearch}
          style={{ marginRight: 20 }}
        >
          <ActionSearch />
        </FloatingActionButton>
        {
          editContext &&
            <SignatureTablist
              editContext={editContext}
              selectedTab={editContext.selectedSignatureIdx}
              onSelect={(e) => console.log(e)}
            />
        }
      </div>
    )
  }
}