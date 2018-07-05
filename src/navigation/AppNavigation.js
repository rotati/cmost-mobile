import { StackNavigator } from 'react-navigation'

import LoginContainer from '../containers/login'
import MainMenuContainer from '../containers/mainMenu'
import DownloadFormContainer from '../containers/downloadForm'
import FillNewFormContainer from '../containers/fillNewForm'
import FormDetailContainer from '../containers/formDetail'

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
    },
    FillNewForm: {
      screen: FillNewFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#1a48a0'},
        title: 'Fill New Form'
      }
    },
    FormDetail: {
      screen: FormDetailContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#1a48a0'},
        title: 'Form Detail'
      }
    }
  },
  {
    initialRouteName: 'Login',
  }
)
export default RootStack;
