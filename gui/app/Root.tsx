import * as React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles';
import { SignatureEditor } from './components/SignatureEditor'
import { RootState } from './redux/rootReducer'
import { actions as databaseConnectionActions } from './redux/DatabaseConnection'

function mapStateToProps(state: RootState) {
  return {
    isConnectedToDatabase: state.databaseConnection.isConnected
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    connectToDatabase: () => dispatch(databaseConnectionActions.connect())
  }
}

type RootProps = {
  isConnectedToDatabase: boolean
  connectToDatabase: () => any
}

class Root extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props)
    props.connectToDatabase()
  }

  render() {
    return (
      <MuiThemeProvider>
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
                  />
                )
              }
            />
            <Route
              path={'/signatures/foo'}
              render={
                _ => (
                  <h1> oops </h1>
                )
              }
            />
          </Switch>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
