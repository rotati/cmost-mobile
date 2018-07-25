import React, { Component } from 'react'
import * as Components      from './components'
import { StatusBar, Image } from 'react-native'
import Card                 from '../../components/common/Card'
import { connect }          from 'react-redux'
import FormActions          from '../../redux/FormReducer'
import ResponseActions      from '../../redux/ResponseReducer'
import I18n                 from '../../I18n'
import CPPLogo              from '../../assets/images/cpp-logo.png'

class MainMenuContainer extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content')
    this.props.fetchForms()
    this.props.fetchResponses()
  }

  onPress = (screen) => {
    this.props.navigation.navigate(screen)
  }

  render() {
    return (
      <Components.Container>
        <Components.LogoWrapper>
          <Image source={ CPPLogo } />
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