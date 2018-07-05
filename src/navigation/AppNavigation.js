import { StackNavigator } from 'react-navigation'

import LoginContainer from '../containers/login'
import MainMenuContainer from '../containers/mainMenu'
import DownloadFormContainer from '../containers/downloadForm'

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginContainer,
      navigationOptions: {
        header: null
      }
    },
    MainMenu: {
      screen: MainMenuContainer,
      navigationOptions: {
        headerLeft: null,
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#1a48a0'},
        title: 'Home'
      }
    },
    DownloadForm: {
      screen: DownloadFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#1a48a0'},
        title: 'Available Form'
      }
    }
  },
  {
    initialRouteName: 'Login',
  }
)
export default RootStack;
