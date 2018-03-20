import * as React from 'react'
import TextField from 'material-ui/TextField';
import { IFunction, ISignature } from '../../../persistence/types/index';
import MUIAutoComplete from 'material-ui/AutoComplete';

/*

TODO

type Props = AutoCompleteProps<string> & {
  initialSearchText: string
}
*/

type Props = {
  initialSearchText: string
  floatingLabelText: string
  dataSource: string[]
  onNewRequest: (value: string) => void
}

type State = {
  searchText: string
}

export default class AutoComplete extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      searchText: props.initialSearchText
    }

    this.onUpdateInput = this.onUpdateInput.bind(this)
  }

  onUpdateInput(searchText: string) {
    this.setState({ searchText })
  }

  render() {
    return (
      <MUIAutoComplete
        {...this.props}
        searchText={this.state.searchText}
        onUpdateInput={this.onUpdateInput}
      />
    )
  }
}