import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Editor from './components/Editor';
import { actions as cacheActions } from './redux/cache';
import { actions as databaseConnectionActions } from './redux/databaseConnection';
import { RootState } from './redux/rootReducer';

const theme = {
  colors: {
    active: '#BBDEFB',
    passive: '#FAFAFA',
    button: '#90CAF9'
  }
}

function mapStateToProps(state: RootState) {
  return {
    isConnectedToDatabase: state.databaseConnection.isConnected
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    connectToDatabase: () => dispatch(databaseConnectionActions.connect()),
    fetchClassNames: () => dispatch(cacheActions.fetchClassNames()),
    fetchFunctionMetaData: () => dispatch(cacheActions.fetchFunctionMetaData())
  }
}

type RootProps = {
  isConnectedToDatabase: boolean
  connectToDatabase: () => Promise<void>
  fetchClassNames: () => Promise<void>
  fetchFunctionMetaData: () => Promise<void>
}

class Root extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props)
    props.connectToDatabase().then(() =>
      Promise.all([
        props.fetchClassNames(),
        props.fetchFunctionMetaData()
      ])
    )
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
                    <Editor />
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
