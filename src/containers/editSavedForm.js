import React, { Component } from 'react'
import { ScrollView, Text, FlatList, Switch, View, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class EditSavedFormContainer extends Component {
  fakeData() {
    return [
      {
        id: 1,
        name: 'Student 1',
        created_at: 'a few moments ago'
      },
      {
        id: 2,
        name: 'Student 2',
        created_at: '1 hour ago'
      }
    ]
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={ () => this.props.navigation.navigate('FormDetail', { id: item.id, isFirst: true, isLast: false, title: 'How helpful is your academic advisor?', hint: 'Description about academic advisor', answer: 'He is very good advisor' }) }>
      <Card style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 17, marginBottom: 5 }}>{ item.name }</Text>
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
