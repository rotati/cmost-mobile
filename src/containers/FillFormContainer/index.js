import React, { Component } from 'react'
import FormList   from '../../components/form/FormList'
import Container  from '../../components/common/Container'
import Database from '../../config/Database'
import _ from 'lodash'

class FillFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forms: Database.objects('BlankForm')
    }
  }

  onPress = (id) => {
    const { navigation } = this.props
    const { forms }      = this.state
    const form           = forms.filtered('id = $0', id)[0]
    const questions      = JSON.parse(form.questions)
    
    navigation.navigate('FormBuilder', {
      id: id, 
      form: JSON.stringify(form),
      action: 'Create',
      numberOfQuestions: _.size(questions)
    })
  }

  render() {
    return (
      <Container>
        <FormList
          dataSource={ this.state.forms }
          onPress={ (id) => this.onPress(id) }
        />
      </Container>
    );
  }
}

export default FillFormContainer
