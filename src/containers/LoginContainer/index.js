import React, { Component } from 'react'
import { StatusBar }        from 'react-native'
import * as Components      from './components'

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: { value: '', hasError: false },
      password: { value: '', hasError: false },
      mission: { value: '', hasError: false },
    }
  }

  componentDidMount() {
     StatusBar.setBarStyle('dark-content')
  }

  onLogin = () => {
    const { mission, username, password } = this.state
    if (mission.value !== '' && username.value !== '' && password.value !== '' ) {
      return this.props.navigation.navigate('Home')
    }

    this.setState({
      mission:  { hasError: mission.value  === '', value: mission.value },
      username: { hasError: username.value === '', value: username.value },
      password: { hasError: password.value === '', value: password.value },
    })
  }

  render() {
    const { mission, username, password } = this.state
    return (
      <Components.Container>
        <Components.Header>Welcome to CMOST</Components.Header>
        <Components.Input
          icon='book'
          hasError={ mission.hasError }
          placeholder='Mission'
          onChange={ (value) => this.setState({ mission: { value: value } }) }
        />

        <Components.Input
          icon='user'
          hasError={ username.hasError }
          placeholder='Username'
          onChange={ (value) => this.setState({ username: { value: value } }) }
        />

        <Components.Input
          icon='key'
          hasError={ password.hasError }
          placeholder='Password'
          onChange={ (value) => this.setState({ password: { value: value } }) }
          secureTextEntry={ true }
        />
        <Components.LoginButton onPress={ this.onLogin }>
          <Components.LoginText>Login</Components.LoginText>
        </Components.LoginButton>
      </Components.Container>
    );
  }
}

export default LoginContainer