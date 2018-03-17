import * as React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import { ThemeProvider } from 'styled-components'
import { IFunction } from '@opencv4nodejs-gen/persistence'
import { SignatureEditor } from './components/SignatureEditor'
import { RootState } from './redux/rootReducer'
import { actions as databaseConnectionActions } from './redux/DatabaseConnection'
import { actions as signaturesActions } from './redux/Signatures'

const theme = {
  colors: {
    active: '#BBDEFB',
    button: '#90CAF9'
  }
}

function mapStateToProps(state: RootState) {
  return {
    isConnectedToDatabase: state.databaseConnection.isConnected,
    signatures: state.signatures.signatures
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    connectToDatabase: () => dispatch(databaseConnectionActions.connect()),
    fetchFunctionSignature: (name: string) => dispatch(signaturesActions.fetchFunctionSignature(name))
  }
}

type RootProps = {
  isConnectedToDatabase: boolean
  signatures: IFunction[]
  connectToDatabase: () => void
  fetchFunctionSignature: () => void
}

class Root extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props)
    props.connectToDatabase()
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
                to={'/signatures'}
              />
              <Route
                path={'/signatures'}
                render={
                  () => (
                    <SignatureEditor
                      signatures={this.props.signatures}
                      onSearch={this.props.fetchFunctionSignature}
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
