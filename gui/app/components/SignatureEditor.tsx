import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { FloatingActionButton, TextField } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import { IFunction } from '@opencv4nodejs-gen/persistence/types/index'
import { SignatureTablist } from './SignatureTablist';

type SignatureEditorProps = {
  signatures: IFunction[]
  onSearch: (value: string) => void
}

type SignatureEditorState = {
  inputValue: string
}

export class SignatureEditor extends React.Component<SignatureEditorProps, SignatureEditorState> {
  constructor(props: SignatureEditorProps) {
    super(props)
    this.state = {
      inputValue: ''
    }

    this.onInputChanged = this.onInputChanged.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onInputChanged(_: any, inputValue: string) {
    this.setState({
      inputValue
    })
  }

  onSearch() {
    this.props.onSearch(this.state.inputValue)
  }

  render() {

    return (
      <div>
        <SignatureTablist
          selectedIdx={0}
          tabNames={this.props.signatures.map(s => s.fnName)}
        />
        <TextField
          value={this.state.inputValue}
          onChange={this.onInputChanged}
          hintText="Load Function Signature"
          floatingLabelText="Load Function Signature"
        />
        <FloatingActionButton
          onClick={this.onSearch}
          style={{ marginRight: 20 }}
        >
          <ActionSearch />
        </FloatingActionButton>
      </div>
    )
  }
}