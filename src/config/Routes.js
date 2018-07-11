import { StackNavigator } from 'react-navigation'

import LoginScreen              from '../containers/LoginContainer'
import HomeScreen               from '../containers/HomeContainer'
import DownloadFormScreen       from '../containers/DownloadFormContainer'
import FillNewFormScreen        from '../containers/FillFormContainer'
import FormBuilderScreen        from '../containers/FormBuilderContainer'
import SaveFormScreen           from '../containers/SaveFormContainer'
import EditFormScreen           from '../containers/EditFormContainer'
import DeleteFormScreen         from '../containers/DeleteFormContainer'
import ViewFormScreen           from '../containers/ViewFormContainer'
import DisplayAnswerScreen      from '../containers/DisplayAnswerContainer'
import SubmitFormScreen         from '../containers/SubmitFormContainer'

const RootStack = StackNavigator({
  Login:         { screen: LoginScreen,         navigationOptions: { header: null } },
  Home:          { screen: HomeScreen,          navigationOptions: { title: 'Home', headerLeft: null } },
  SaveForm:      { screen: SaveFormScreen,      navigationOptions: { title: 'Save Form' } },
  EditForm:      { screen: EditFormScreen,      navigationOptions: { title: 'Edit Form' } },
  ViewForm:      { screen: ViewFormScreen,      navigationOptions: { title: 'View Forms' } },
  DeleteForm:    { screen: DeleteFormScreen,    navigationOptions: { title: 'Delete Forms' } },
  SubmitForm:    { screen: SubmitFormScreen,    navigationOptions: { title: 'Submit Forms' } },
  FormBuilder:   { screen: FormBuilderScreen,   navigationOptions: { title: 'Question' } },
  FillNewForm:   { screen: FillNewFormScreen,   navigationOptions: { title: 'New Form' } },
  DownloadForm:  { screen: DownloadFormScreen,  navigationOptions: { title: 'Download Form' } },
  DisplayAnswer: { screen: DisplayAnswerScreen, navigationOptions: { title: 'Answer' } },
}, { initialRouteName: 'Home', navigationOptions: { headerTintColor: '#fff', headerStyle: { backgroundColor: '#2196F3' } }})

export default RootStack;
