import * as React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import { ThemeProvider } from 'styled-components'
import { IFunction } from '@opencv4nodejs-gen/persistence'
import { Editor } from './components/Editor'
import { RootState } from './redux/rootReducer'
import { actions as databaseConnectionActions } from './redux/databaseConnection'
import { actions as signaturesActions } from './redux/signatures'
import { actions as cacheActions } from './redux/cache'

const theme = {
  colors: {
    active: '#BBDEFB',
    passive: '#FAFAFA',
    button: '#90CAF9'
  }
}

function mapStateToProps(state: RootState) {
  const { signatures, cache } = state
  const editedFunction = signatures.editedFunctions.find(f => f._id === signatures.currentlyEditing._id)
  return {
    isConnectedToDatabase: state.databaseConnection.isConnected,
    editContext: editedFunction && {
      fn: editedFunction,
      currentSignatureIdx: signatures.currentlyEditing.currentSignatureIdx
    },
    functions: cache.functions
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    connectToDatabase: () => dispatch(databaseConnectionActions.connect()),
    fetchClassNames: () => dispatch(cacheActions.fetchClassNames()),
    fetchFunction: (name: string) => dispatch(cacheActions.fetchFunction(name)),
    editFunction: (_id: string) => dispatch(signaturesActions.editFunction(_id))
  }
}

type RootProps = {
  isConnectedToDatabase: boolean
  functions: IFunction[]
  editContext: { fn: IFunction | undefined, currentSignatureIdx: number }
  connectToDatabase: () => Promise<void>
  fetchClassNames: () => Promise<void>
  fetchFunction: (name: string) => void
  editFunction: (_id: string) => void
}

class Root extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props)
    props.connectToDatabase().then(props.fetchClassNames)
  }

  render() {
    return (
      <MuiThemeProvider>
        <ThemeProvider theme={theme}>
          <HashRouter>
            <Switch>
              <Redirect
                exact
                path={'/'}
                to={'/functions'}
              />
              <Route
                path={'/functions'}
                render={
                  () => (
                    <Editor
                      functions={this.props.functions}
                      editContext={this.props.editContext}
                      editFunction={this.props.editFunction}
                      onSearch={this.props.fetchFunction}
                    />
                  )
                }
              />
            </Switch>
          </HashRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
