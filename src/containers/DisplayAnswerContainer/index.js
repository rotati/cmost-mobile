import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Card from '../../components/common/Card'

export default class AnswerDetailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.navigation.getParam('title'),
      hint: this.props.navigation.getParam('hint'),
      answer: this.props.navigation.getParam('answer') || '',
      isFirst: this.props.navigation.getParam('isFirst'),
      isLast: this.props.navigation.getParam('isLast')
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <Card>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>How helpful is your academic advisor?</Text>
            <Text style={{ fontStyle: 'italic', marginBottom: 20 }}>He is very good</Text>

            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>How well-maintained are the facilities at this university?</Text>
            <Text style={{ fontStyle: 'italic', marginBottom: 20 }}>Very good</Text>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
