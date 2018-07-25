import { StackNavigator } from 'react-navigation'
import I18n               from '../I18n'

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
  Home:          { screen: HomeScreen,          navigationOptions: { title: I18n.t('screenTitle.home'), headerLeft: null } },
  SaveForm:      { screen: SaveFormScreen,      navigationOptions: { title: I18n.t('screenTitle.saveForm') } },
  EditForm:      { screen: EditFormScreen,      navigationOptions: { title: I18n.t('screenTitle.editForm') } },
  ViewForm:      { screen: ViewFormScreen,      navigationOptions: { title: I18n.t('screenTitle.viewForms') } },
  DeleteForm:    { screen: DeleteFormScreen,    navigationOptions: { title: I18n.t('screenTitle.deleteForms') } },
  SubmitForm:    { screen: SubmitFormScreen,    navigationOptions: { title: I18n.t('screenTitle.submitForms') } },
  FormBuilder:   { screen: FormBuilderScreen,   navigationOptions: { title: I18n.t('screenTitle.question') } },
  FillNewForm:   { screen: FillNewFormScreen,   navigationOptions: { title: I18n.t('screenTitle.newForm') } },
  DownloadForm:  { screen: DownloadFormScreen,  navigationOptions: { title: I18n.t('screenTitle.downloadForm') } },
  DisplayAnswer: { screen: DisplayAnswerScreen, navigationOptions: { title: I18n.t('screenTitle.answer') } },
}, { initialRouteName: 'Home', navigationOptions: { headerTintColor: '#fff', headerStyle: { backgroundColor: '#3E72FF' } }})

export default RootStack
