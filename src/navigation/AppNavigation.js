import { StackNavigator } from 'react-navigation'

import LoginContainer from '../containers/login'
import MainMenuContainer from '../containers/mainMenu'
import DownloadFormContainer from '../containers/downloadForm'
import FillNewFormContainer from '../containers/fillNewForm'
import FormDetailContainer from '../containers/formDetail'
import SaveFormContainer from '../containers/saveForm'
import EditSavedFormContainer from '../containers/editSavedForm'
import DeleteFormContainer from '../containers/deleteForm'
import ViewSavedFormContainer from '../containers/viewSavedForm'
import AnswerDetailContainer from '../containers/answerDetail'
import SubmitFormContainer from '../containers/submitForm'

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
        headerStyle: {backgroundColor: '#2196F3'},
        title: 'Home'
      }
    },
    DownloadForm: {
      screen: DownloadFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#2196F3'},
        title: 'Available Form'
      }
    },
    FillNewForm: {
      screen: FillNewFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#2196F3'},
        title: 'Fill New Form'
      }
    },
    EditSavedForm: {
      screen: EditSavedFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#2196F3'},
        title: 'Edit Saved Form'
      }
    },
    FormDetail: {
      screen: FormDetailContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#2196F3'},
        title: 'Form Detail'
      }
    },
    SaveForm: {
      screen: SaveFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#2196F3'},
        title: 'Save Form'
      }
    },
    DeleteForm: {
      screen: DeleteFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#2196F3'},
        title: 'Delete'
      }
    },
    ViewSavedForm: {
      screen: ViewSavedFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#2196F3'},
        title: 'Saved Form'
      }
    },
    AnswerDetail: {
      screen: AnswerDetailContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#2196F3'},
        title: 'Answer Detail'
      }
    },
    SubmitForm: {
      screen: SubmitFormContainer,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#2196F3'},
        title: 'Answer Detail'
      }
    }
  },
  {
    initialRouteName: 'Login',
  }
)
export default RootStack;
