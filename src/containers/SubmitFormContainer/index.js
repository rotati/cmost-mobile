import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import {  TouchableOpacity }  from 'react-native'
import Icon                   from 'react-native-vector-icons/FontAwesome'
import FormList               from '../../components/form/FormList'
import Container              from '../../components/common/Container'
import SubmitResponseActions  from '../../redux/SubmitResponseReducer'

import _ from 'lodash'

class SubmitFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: [],
      responses: props.responses
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      responses: Object.values(_.pickBy(nextProps.responses, (response, resId) => response.finalized === true)) 
    })
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
    const { selectedId, responses } = this.state
    const formCount = selectedId.length

    selectedId.forEach((responseId) => {
      this.props.submitResponse(responseId)
    })

    if (formCount === 1) {
      alert('1 form is submitted')
      this.props.navigation.navigate('Home')
    } else {
      alert(formCount + ' forms are submitted')
      this.props.navigation.navigate('Home')
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
  }

  onFormPress = (key) => {
    const { selectedId } = this.state
    let valueCount = selectedId.length

    if (selectedId.includes(key)) {
      this.setState({ selectedId: selectedId.filter((id) => id !== key) })
      valueCount -= 1
    } else {
      this.setState({ selectedId: [...selectedId, key] })
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
          dataSource={ this.state.responses }
          onPress={ (key) => this.onFormPress(key)}
          selectedIds={ this.state.selectedId }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    responses: Object.values(_.pickBy(state.responses.data, (response, resId) => response.finalized === true))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    submitResponse: (id) => dispatch(SubmitResponseActions.requestSubmit(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitFormContainer)
