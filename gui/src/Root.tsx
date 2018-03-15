import * as React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles';
import { SignatureEditor } from './components/SignatureEditor'
import { RootState } from './redux/rootReducer'
import { actions as helloWorldActions } from './redux/HelloWorld'

function mapStateToProps(state: RootState) {
  return {
    message: state.helloWorld.message
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    sayHello: (message: string) => dispatch(helloWorldActions.sayHello(message))
  }
}

type RootProps = {
  message: string,
  sayHello: (message: string) => void
}

class Root extends React.Component<RootProps> {
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
                    message={this.props.message}
                    sayHello={this.props.sayHello}
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
