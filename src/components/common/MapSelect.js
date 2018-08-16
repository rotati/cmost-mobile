import React, { Component } from 'react'
import MapView, { Marker }  from 'react-native-maps'
import styled               from 'styled-components'
import MDIcon               from 'react-native-vector-icons/MaterialIcons'
import _                    from 'lodash'
import axios                from 'axios'
import Database             from '../../config/Database'
import TextField            from './TextField'
import I18n from '../../I18n'

import { CREATE_OPTION_URL, API_KEY } from '../../constants/EndPoints'
import Modal from "react-native-modal"

import {
  View,
  Dimensions,
  Alert, Text, TouchableOpacity
} from 'react-native'

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = 0.01

export default class MapSelect extends Component {
  state = {
    region: {
      latitude: 11.5761,
      longitude: 104.9230,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    markers: this.props.options.data,
    selectedOptionIds: [],
    showNewLocationModal: false,
    newLocationName: "",
    newLocationCoords : {}
  }

  componentDidMount() {
    const { formId, responseId, questionId, options, value, canChooseOnce } = this.props
    const markers = options.data

    // ----- Find Options which are already selected
    const relatedResponses  = Database.objects('Responses').filtered('formId = $0 AND id <> $1', formId, responseId)
    const selectedOptionIds = canChooseOnce === false ? [] :
      _.map(relatedResponses, (response, index) => {
        const answers = JSON.parse(response.answers)
        return answers[questionId].option_node_id
      })

    // ----- Initailize latitude and longitude
    const selectedMarker    = _.filter(markers, marker => marker.value === value)
    const availableMarkers  = _.filter(markers, marker => {
      return !_.includes(selectedOptionIds, marker.value)
    })

    const currentMarker     = value === undefined ?
      availableMarkers[0] || markers[0] : selectedMarker[0]

    const latitude          = currentMarker.latitude
    const longitude         = currentMarker.longitude

    this.setState({ 
      selectedOptionIds,
      region: {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    })
  }

  onLocationSelect = (marker) => {
    const { selectedOptionIds } = this.state
    if (_.includes(selectedOptionIds, marker.value)) return

    this.props.onChange(marker.value)
  }

  setRegion(region) {
    this.setState({
      region: {
        latitude: region.latitude,
        longitude: region.longitude,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA
      }
    })
  }

  onAddNewLocation = () => {
    const { newLocationName, newLocationCoords } = this.state
    const { options } = this.props

    axios.put(
      CREATE_OPTION_URL(options.id),
      { name: newLocationName, ...newLocationCoords },
      { headers: { Authorization: "Token " + API_KEY } }
    ).then(result => {
      this.addNewOptionToQuestion(result.data)
      this.setState({ showNewLocationModal: false, newLocationName: '', newLocationCoords: {} })
    })
  }

  addNewOptionToQuestion = (option_node_id) => {
    const { questionId, formId } = this.props
    const { newLocationName, newLocationCoords } = this.state
    const form         = Database.objects('Forms').filtered("id = $0", formId)[0]
    const questionings = JSON.parse(form.questions)
    let questionPath

    const result = _.forEach(questionings, (questioning, index) => {
      const type = questioning.type
      if (type === 'Question') {
        const question = questioning.data
        if (question.id === questionId) questionPath = index + '.data'
      } else {
        _.forEach(questioning.data, (question, qIndex) => {
          if (question.id === questionId) questionPath =  index + '.data.' + qIndex
        })
      }
    })
    const options = _.get(questionings, questionPath + '.options.data')
    const newOption = { label: newLocationName, value: option_node_id, ...newLocationCoords }
    _.set(questionings, questionPath + '.options.data', [...options, newOption])

    Database.write(() => {
      form.questions = JSON.stringify(questionings)
    })

    const oldMarkers = this.state.markers
    this.setState({ markers: [...oldMarkers, newOption] })
  }

  onMapPress = (coordinate) => {
    const { markers, newLocationCoords } = this.state
    const { options }                    = this.props
    const { latitude, longitude }        = coordinate
    const isExistingPlace                = _.some(markers, { latitude, longitude })

    if (!isExistingPlace) {
      this.setState({ newLocationCoords: coordinate, showNewLocationModal: true })
    }
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setRegion(position.coords);
        },
        (error) => {
          Alert.alert("", "Can not detect current location")
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  }

  renderMarkers = () => {
    const { value }  = this.props
    let validMarkers = []
    const { selectedOptionIds, markers } = this.state

    _.each(markers, (marker, index) => {
      if (!(marker.latitude && marker.longitude)) return

      const active = (value === marker.value) || _.includes(selectedOptionIds, marker.value)
      validMarkers.push(
        <Marker
          key={ index }
          coordinate={ { latitude: marker.latitude, longitude: marker.longitude } }
          onPress={ () => this.onLocationSelect(marker) }
          title={ marker.label }
          pinColor={ active ? 'blue' : 'red' }
        />
      )
    })
    return validMarkers
  }

  render() {

    const { region, markers } = this.state
    const { label, hint }     = this.props

    return (
      <View>
        <Label>{ label }</Label>
        { hint && <Hint>{ hint }</Hint> }

        <MapWrapper>
          <Map
            region={region}
            onRegionChangeComplete={ (region) => this.setState({ region }) }
            showsUserLocation={true}
            provider="google"
            onPress={ (e) => this.onMapPress(e.nativeEvent.coordinate) }
          >
            { this.renderMarkers() }
          </Map>
          <CurrentLocationButton onPress={ () => this.getCurrentPosition() }>
            <MDIcon
              name='my-location'
              size={ 30 }
              color='#000'
            />
          </CurrentLocationButton>
        </MapWrapper>

        <Modal isVisible={this.state.showNewLocationModal}>
          <ModalContainer>
            <ModalContent>
              <ModalTitle>{ I18n.t('general.newLocation') }</ModalTitle>
              <TextField
                label={ I18n.t('general.name') }
                value={ this.state.newLocationName }
                onChange={ (value) => this.setState({ newLocationName: value }) }
              />
              <ModalAction>
                <CancelButton onPress={ () => this.setState({ showNewLocationModal: false }) }>
                  <ButtonText>{ I18n.t('general.cancel') }</ButtonText>
                </CancelButton>
                <SaveButton onPress={ () => this.onAddNewLocation() }>
                  <ButtonText>{ I18n.t('general.save') }</ButtonText>
                </SaveButton>
              </ModalAction>
            </ModalContent>
          </ModalContainer>
        </Modal>
      </View>
    )
  }
}

const MapWrapper = styled.View`
  width: ${Dimensions.get('window').width - 40};
  height: ${Dimensions.get('window').width - 40};
  margin-bottom: 20px;
`

const Map = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5;
`

const Hint = styled.Text`
  font-style: italic; 
  margin-bottom: 10;
`

const CurrentLocationButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 60;
  border-width: 2;
  border-color: #ddd;
  position: absolute;
  bottom: 10;
  right: 10;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
  align-items: center;
`

const ModalContent = styled.View`
  width: ${Dimensions.get('window').width - 20};
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`

const SaveButton = styled.TouchableOpacity`
  width: ${(Dimensions.get('window').width - 70) /2};
  background-color: blue;
  padding: 10px;
  justify-content: center;
  background-color: #008CBA;
  align-items: center;
  border-radius: 5px;
`

const CancelButton = styled.TouchableOpacity`
  width: ${(Dimensions.get('window').width - 70) /2};
  background-color: blue;
  padding: 10px;
  justify-content: center;
  background-color: #008CBA;
  align-items: center;
  border-radius: 5px;
`

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`

const ModalAction = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`
