import React, { Component } from 'react'
import * as Components      from './components'
import { StatusBar }        from 'react-native'
import Card                 from '../../components/common/Card'

class MainMenuContainer extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  onPress = (screen) => {
    this.props.navigation.navigate(screen)
  }

  render() {
    return (
      <Components.Container>
        <Components.MenuButton    icon='download' title='Download New Form' color='#008CBA' onPress={ () => this.onPress('DownloadForm') } />
        <Components.MenuButton    icon='plus'     title='Fill New Form'     color='#008CBA' onPress={ () => this.onPress('FillNewForm') } />
        <Components.MenuButton    icon='edit'     title='Edit Saved Form'   color='#008CBA' onPress={ () => this.onPress('EditForm') } />
        <Components.MenuButton    icon='send'     title='Submit Form'       color='#008CBA' onPress={ () => this.onPress('SubmitForm') } />
        <Components.MenuButton    icon='eye'      title='View Sent Form'    color='#008CBA' onPress={ () => this.onPress('ViewForm') } />
        <Components.DeleteFormWrapper>
          <Components.MenuButton  icon='trash'    title='Delete Saved Form' color='#AD2A1A' onPress={ () => this.onPress('DeleteForm') } />
        </Components.DeleteFormWrapper>
      </Components.Container>
    );
  }
}

export default MainMenuContainer