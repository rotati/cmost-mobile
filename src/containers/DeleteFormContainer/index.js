import React, { Component } from 'react'
import Icon                 from 'react-native-vector-icons/FontAwesome'
import FormList             from '../../components/form/FormList'
import Container            from '../../components/common/Container'
import { TouchableOpacity } from 'react-native'

export default class DeleteFormContainer extends Component {
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

    if (formCount === 1) {
      alert('1 form is deleted')
      this.props.navigation.navigate('Home')
    } else {
      alert(formCount + ' forms are deleted')
      this.props.navigation.navigate('Home')
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
  }

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
      },
      {
        id: 3,
        name: 'Teaching Survey',
        created_at: '9 hours ago'
      },
      {
        id: 4,
        name: 'Vihecle Survey',
        created_at: 'Yesterday'
      },
    ]
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
          dataSource={ this.fakeData() }
          onPress={ (key) => this.onFormPress(key)}
          selectedIds={ this.state.selectedFormId }
        />
      </Container>
    )
  }
}