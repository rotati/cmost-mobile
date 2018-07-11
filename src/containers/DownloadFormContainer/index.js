import React, { Component } from 'react'
import Icon                 from 'react-native-vector-icons/FontAwesome'
import FormList             from '../../components/form/FormList'
import Container            from '../../components/common/Container'
import { TouchableOpacity } from 'react-native'

class DownloadFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFormId: []
    }
  }

  static navigationOptions = ({ navigation }) => ({ 
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.onSave() } >
        <Icon name='save' size={25} color='#fff' style={{ marginRight: 15 }}/>
      </TouchableOpacity>
    ),
  })
  
  handleSave = () => {
    const { selectedFormId } = this.state
    const formCount = selectedFormId.length

    if (formCount === 1) {
      alert('1 form is downloaded')
      this.props.navigation.navigate('Home')
    } else if (formCount > 1) {
      alert(formCount + ' forms are downloaded')
      this.props.navigation.navigate('Home')
    } else {
      alert('No selected form')
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
    if (selectedId.includes(key)) {
      this.setState({ selectedFormId: selectedId.filter((id) => id !== key) })
    } else {
      this.setState({ selectedFormId: [...selectedId, key] })
    }
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
    );
  }
}

export default DownloadFormContainer
