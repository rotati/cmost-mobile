import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/FontAwesome'

class MainMenuContainer extends Component {
  componentDidMount() {
     StatusBar.setBarStyle('light-content')
  }

  renderOptions(icon, displayText, color, screen) {
    return (
      <TouchableOpacity onPress={ () => this.props.navigation.navigate(screen) }>
        <Card style={ [styles.options, {backgroundColor: color}] }>
          <Icon
            name={ icon }
            size={ 30 }
            style={{ marginBottom: 10 }}
            color='#fff'
          />
          <Text style={{ fontSize: 15, textAlign: 'center', color: '#fff'}}>
            { displayText }
          </Text>
        </Card>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
        { this.renderOptions("download", "Download New Form",   "#107896", "DownloadForm") }
        { this.renderOptions("plus",     "Fill New Form",       "#107896", "FillNewForm") }
        { this.renderOptions("edit",     "Edit Saved Form",     "#107896", "Edit Save Form") }
        { this.renderOptions("send",     "Send Finalized Form", "#107896", "Send Finalized Form") }
        { this.renderOptions("eye",      "View Sent Form",      "#107896", "View Send Form") }
        { this.renderOptions("trash",    "Delete Saved Form",   "#AD2A1A", "Delete Saved Form") }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  options: {
    width: Dimensions.get('window').width - 20,
    height: 100,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default MainMenuContainer