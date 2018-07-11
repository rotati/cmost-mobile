import React, { Component } from 'react'
import FormList   from '../../components/form/FormList'
import Container  from '../../components/common/Container'

class EditFormContainer extends Component {
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

  onPress = (id) => {
    const { navigation } = this.props
    navigation.navigate('FormBuilder', { 
      id: id, 
      isFirst: true, 
      isLast: false, 
      title: 'How helpful is your academic advisor?',
      hint: 'Description about academic advisor',
      answer: 'He is very good advisor'
    })
  }

  render() {
    return (
      <Container>
        <FormList
          dataSource={ this.fakeData() }
          onPress={ (id) => this.onPress(id) }
        />
      </Container>
    );
  }
}

export default EditFormContainer
