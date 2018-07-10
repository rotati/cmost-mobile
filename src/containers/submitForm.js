import React, { Component } from 'react'
import { ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SubmitFormContainer extends Component {
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
            <Icon name='send' size={25} color='#fff' style={{ marginRight: 15 }}/>
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
      alert('1 form is submitted')
      this.props.navigation.navigate('MainMenu')
    } else {
      alert(formCount + ' forms are submitted')
      this.props.navigation.navigate('MainMenu')
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
  }

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
        created_at: 'a few moments ago'
      },
      {
        id: 3,
        name: 'Student 3',
        created_at: 'a few moments ago'
      },
      {
        id: 4,
        name: 'Student 4',
        created_at: 'a few moments ago'
      },
    ]
  }

  onSwitchChange = (key) => {
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

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onSwitchChange(item.id) }>
      <Card style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View>
          <Text style={{ fontSize: 17, marginBottom: 5 }}>{ item.name }</Text>
          <Text style={{ fontSize: 10 }}>{ item.created_at }</Text>
        </View>
        {
          this.state.selectedFormId.includes(item.id) &&
          <Icon name ='check-circle' color='#219724' size={30}/>
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
