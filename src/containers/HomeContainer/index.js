import React, { Component } from 'react'
import { connect }          from 'react-redux'
import RNRestart            from 'react-native-restart'
import * as Components      from './components'
import Card                 from '../../components/common/Card'
import FormActions          from '../../redux/FormReducer'
import ResponseActions      from '../../redux/ResponseReducer'
import I18n                 from '../../I18n'
import Logo                 from '../../assets/images/logo.png'
import Database             from '../../config/Database'
import { StatusBar, Alert } from 'react-native'

class MainMenuContainer extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content')
    this.props.navigation.setParams({ handleLanguageChange: this.handleLanguageChange })
    this.props.fetchForms()
    this.props.fetchResponses()
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return { 
      headerRight: (
        <Components.LanguageWrapper onPress={ () => params.handleLanguageChange() }>
          <Components.LanguageShortcut>{ I18n.t('general.newLanguage') }</Components.LanguageShortcut>
        </Components.LanguageWrapper>
      )
    }
  }

  onPress = (screen) => {
    this.props.navigation.navigate(screen)
  }

  handleLanguageChange = () => {
    Alert.alert(
      null,
      I18n.t('general.restartMsg'),
      [{ text: I18n.t('general.cancel') }, { text: I18n.t('general.ok'), onPress: () => this.handleRestart() }]
    )
  }

  handleRestart = () => {
    const currentLang = Database.objects('Setting').filtered('key = $0', 'language')[0]
    const newLang = currentLang.value === 'en' ? 'kh' : 'en'

    Database.write(() => {
      currentLang.value = newLang
    })

    RNRestart.Restart()
  }

  render() {
    return (
      <Components.Container>
        <Components.LogoWrapper>
          <Components.Logo source={ Logo } />
        </Components.LogoWrapper>
        <Components.MenuWrapper>
          <Components.MenuGroup>
            <Components.MenuButton  icon='download' title={ I18n.t('mainMenu.downloadForm') }    color='#23408F' onPress={ () => this.onPress('DownloadForm') } />
            <Components.MenuButton  icon='plus'     title={ I18n.t('mainMenu.fillNewForm') }     color='#23408F' onPress={ () => this.onPress('FillNewForm') } />
          </Components.MenuGroup>
          <Components.MenuGroup>
            <Components.MenuButton  icon='edit'     title={ I18n.t('mainMenu.editSavedForm') }   color='#23408F' onPress={ () => this.onPress('EditForm') } />
            <Components.MenuButton  icon='send'     title={ I18n.t('mainMenu.submitForm') }      color='#23408F' onPress={ () => this.onPress('SubmitForm') } />
          </Components.MenuGroup>
          <Components.MenuGroup>
            <Components.MenuButton  icon='eye'      title={ I18n.t('mainMenu.viewSentForm') }    color='#23408F' onPress={ () => this.onPress('ViewForm') } />
            <Components.MenuButton  icon='trash'    title={ I18n.t('mainMenu.deleteForm') }      color='#EE1C24' onPress={ () => this.onPress('DeleteForm') } />
          </Components.MenuGroup>
        </Components.MenuWrapper>
      </Components.Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  fetchForms: () => dispatch(FormActions.fetchFormsRequest()),
  fetchResponses: () => dispatch(ResponseActions.fetchResponsesRequest()),
})

export default connect(null, mapDispatchToProps)(MainMenuContainer)