import React, { Component } from 'react'
import LoginContainer from './src/containers/login'
import RootStack from './src/navigation/AppNavigation'

export default class App extends Component {
  render() {
    return <RootStack />
  }
}
