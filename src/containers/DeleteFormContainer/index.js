import React, { Component } from 'react'
import { connect }          from 'react-redux'
import Icon                 from 'react-native-vector-icons/FontAwesome'
import FormList             from '../../components/form/FormList'
import Container            from '../../components/common/Container'
import I18n                 from '../../I18n'

import { TouchableOpacity, Alert } from 'react-native'

class DeleteFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFormId: []
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    if (params.showDeleteBtn) {
      return { 
        headerRight: (
          <TouchableOpacity onPress={() => navigation.state.params.onSave() } >
            <Icon name='trash' size={25} color='#fff' style={{ marginRight: 15 }}/>
          </TouchableOpacity>
        )
      }
    } else {
      return { headerRight: null }
    }
  }

  handleSave = () => {
    const { selectedFormId } = this.state
    const formCount = selectedFormId.length

    alert(I18n.t('general.deleted', { count: formCount }))
    this.props.navigation.navigate('Home')
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
  }

  onFormPress = (key) => {
    const selectedId = this.state.selectedFormId
    let valueCount = selectedId.length

    if (selectedId.includes(key)) {
      this.setState({ selectedFormId: selectedId.filter((id) => id !== key) })
      valueCount -= 1
    } else {
      this.setState({ selectedFormId: [...selectedId, key] })
      valueCount += 1
    }

    this.props.navigation.setParams({
      showDeleteBtn: valueCount > 0
    });
  }

  render() {
    return (
      <Container>
        <FormList
          dataSource={ this.props.responses }
          onPress={ (key) => this.onFormPress(key)}
          selectedIds={ this.state.selectedFormId }
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    responses: Object.values(state.responses.data)
  }
}

export default connect(mapStateToProps, null)(DeleteFormContainer)
