import * as React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import { ThemeProvider } from 'styled-components'
import { IFunction, IFunctionMetaData } from '@opencv4nodejs-gen/persistence'
import Editor from './components/Editor'
import { RootState } from './redux/rootReducer'
import { actions as databaseConnectionActions } from './redux/databaseConnection'
import { actions as cacheActions } from './redux/cache'

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
