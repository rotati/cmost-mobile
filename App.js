import React, { Component } from 'react'
import LoginContainer from './src/containers/login'
import RootStack from './src/navigation/AppNavigation'
import { createStackNavigator } from 'react-navigation';

export default class App extends Component {
  render() {
    return <RootStack />
  }
}
