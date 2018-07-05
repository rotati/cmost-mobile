import React, { Component } from 'react'
import { KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet, View, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: {
        value: '',
        hasError: false
      },
      password: {
        value: '',
        hasError: false
      },
      mission: {
        value: '',
        hasError: false
      },
    }
  }

  componentDidMount() {
     StatusBar.setBarStyle('dark-content')
  }

  onLogin = () => {
    const { mission, username, password } = this.state
    if (mission.value !== '' && username.value !== '' && password.value !== '' ) {
      return this.props.navigation.navigate('MainMenu')
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
      <KeyboardAvoidingView style={ styles.wrapper } behavior='padding' >
        <View style={styles.container}>
          <Text style={ styles.header }>Welcome to CMOST</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name='book'
              size={20}
              color={ mission.hasError ? 'red' : '#ddd'}
              style={{ marginBottom: 15, marginRight: 10 }}
            />
            <TextInput
              style={ mission.hasError ? [styles.textInput, styles.textInputError] : styles.textInput }
              placeholder='Mission'
              underlineColorAndroid='transparent'
              onChangeText={(mission) => this.setState({ mission: { value: mission } })}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name='user'
              size={20}
              color={ username.hasError ? 'red' : '#ddd'}
              style={ { marginBottom: 15, marginRight: 10 }}
            />
            <TextInput
              style={ username.hasError ? [styles.textInput, styles.textInputError] : styles.textInput }
              placeholder='Username'
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({ username: { value: username } })}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name='key'
              size={20}
              color={ password.hasError ? 'red' : '#ddd'}
              style={ { marginBottom: 15, marginRight: 10 }}
            />
            <TextInput
              style={ password.hasError ? [styles.textInput, styles.textInputError] : styles.textInput }
              placeholder='Password'
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password: { value: password } })}
              secureTextEntry={ true }
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={ this.onLogin }>
            <Text style={ styles.loginBtn }>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkred',
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -30
  },
  textInput: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flex: 1
  },

  textInputError: {
    borderColor: 'red'
  },
  btn: {
    alignSelf: 'stretch',
    padding: 12,
    backgroundColor: '#337ab7',
    borderRadius: 20,
  },
  loginBtn: {
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    fontSize: 15
  },
})

export default LoginContainer