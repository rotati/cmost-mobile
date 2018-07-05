import React, { Component } from 'react'
import { ScrollView, Text, FlatList, Switch, View, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class FillNewForm extends Component {
  fakeData() {
    return [
      {
        id: 1,
        name: 'Student Survey',
        created_at: 'a few moments ago'
      },
      {
        id: 2,
        name: 'Election Survey',
        created_at: '1 hour ago'
      }
    ]
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={ () => this.props.navigation.navigate('FormDetail', { id: item.id }) }>
      <Card style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 5 }}>{ item.name }</Text>
        <Text style={{ fontSize: 10 }}>{ item.created_at }</Text>
      </Card>
    </TouchableOpacity>
  )

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={ this.fakeData() }
          renderItem={ this.renderItem }
        />
      </ScrollView>
    );
  }
}
