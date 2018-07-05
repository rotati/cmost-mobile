import React, { Component } from 'react'
import { ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DownloadFormContainer extends Component {
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
      this.props.navigation.navigate('MainMenu')
    } else if (formCount > 1) {
      alert(formCount + ' forms are downloaded')
      this.props.navigation.navigate('MainMenu')
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

  onSwitchChange = (key) => {
    const selectedId = this.state.selectedFormId
    debugger
    if (selectedId.includes(key)) {
      this.setState({ selectedFormId: selectedId.filter((id) => id !== key) })
    } else {
      this.setState({ selectedFormId: [...selectedId, key] })
    }
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onSwitchChange(item.id) }>
      <Card style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 5 }}>{ item.name }</Text>
          <Text style={{ fontSize: 10 }}>{ item.created_at }</Text>
        </View>
        {
          this.state.selectedFormId.includes(item.id) &&
          <Icon name ='check-circle' color='green' size={30}/>
        }
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
