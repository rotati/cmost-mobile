import React, { Component } from 'react'
import { Provider }         from 'react-redux'
import RootStack            from './src/config/Routes'
import configureStore       from './src/config/Store'

export default class App extends Component {
  render() {
    return (
      <Provider store={ configureStore() }>
        <RootStack />
      </Provider>
    )
  }
}
