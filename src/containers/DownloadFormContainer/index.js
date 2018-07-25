import React, { Component } from 'react'
import { connect }          from 'react-redux'
import Icon                 from 'react-native-vector-icons/FontAwesome'
import FormList             from '../../components/form/FormList'
import Container            from '../../components/common/Container'
import { TouchableOpacity } from 'react-native'
import DownloadFormActions  from '../../redux/DownloadFormReducer'
import FormActions          from '../../redux/FormReducer'
import I18n                 from '../../I18n'

class DownloadFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFormId: [],
      forms: []
    }
  }

  static navigationOptions = ({ navigation }) => ({ 
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.onSave() } >
        <Icon name='save' size={25} color='#fff' style={{ marginRight: 15 }}/>
      </TouchableOpacity>
    ),
  })

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    if (params.showDeleteBtn) {
      return { 
        headerRight: (
          <TouchableOpacity onPress={() => navigation.state.params.onSave() } >
            <Icon name='save' size={25} color='#fff' style={{ marginRight: 15 }}/>
          </TouchableOpacity>
        )
      }
    } else {
      return { headerRight: null }
    }
  }
  
  handleSave = () => {
    const { selectedFormId, forms } = this.state
    const formCount = selectedFormId.length

    selectedFormId.forEach((formId) => {
      const currentForm = forms.filter((form) => form.id === formId)[0]
      this.props.saveLocally(currentForm)
    })

    alert(I18n.t('general.downloaded', { count: formCount }))
    this.props.fetchLocalForms()
    this.props.navigation.navigate('Home')
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
    this.props.fetchNewForms()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ forms: nextProps.forms })
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
          dataSource={ this.state.forms }
          onPress={ (key) => this.onFormPress(key)}
          selectedIds={ this.state.selectedFormId }
        />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  fetchNewForms: () => dispatch(DownloadFormActions.downloadFormsRequest()),
  saveLocally: (form) => dispatch(DownloadFormActions.saveFormLocalRequest(form)),
  fetchLocalForms: (form) => dispatch(FormActions.fetchFormsRequest())
})

const mapStateToProps = (state) => ({
  forms: state.downloadForms.data
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadFormContainer)
