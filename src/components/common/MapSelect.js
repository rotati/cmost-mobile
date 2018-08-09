import React, { Component } from 'react'
import MapView, { Marker }  from 'react-native-maps'
import styled               from 'styled-components'
import MDIcon               from 'react-native-vector-icons/MaterialIcons'
import _                    from 'lodash'
import axios                from 'axios'
import Database             from '../../config/Database'
import TextField            from './TextField'

import { CREATE_OPTION_URL, API_KEY } from '../../constants/EndPoints'

import {
  View,
  Dimensions,
  Alert,
  Modal
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
    const { markers, newLocationName, newLocationCoords } = this.state
    const { options }              = this.props
    const { latitude, longitude }  = newLocationCoords
    const isExistingPlace          = _.some(markers, { latitude, longitude })

    if (!isExistingPlace) {
      // axios.put(
      //   CREATE_OPTION_URL(options.id),
      //   { name: newLocationName, ...newLocationCoords },
      //   { headers: { Authorization: "Token " + API_KEY } }
      // ).then(result => {
      // })
      this.setState({ showNewLocationModal: false, newLocationName: '', newLocationCoords: {} })
    }
  }

  onMapPress = (coordinate) => {
    this.setState({ newLocationCoords: coordinate, showNewLocationModal: true })
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
    const { markers, value }    = this.props
    const { selectedOptionIds } = this.state
    let validMarkers            = []

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
        
        <Modal animationType="slide" transparent={ true } visible={ this.state.showNewLocationModal }>
          <ModalContainer>
            <FormWrapper>
              <TextField
                value={ this.state.newLocationName }
                label='Name'
                onChange={ (value) => this.setState({ newLocationName: value }) }
              />
              <Button onPress={ () => this.onAddNewLocation() }>
                <ButtonTitle>Save</ButtonTitle>
              </Button>
            </FormWrapper>
          </ModalContainer>
        </Modal>
      </View>
    )
  }
}

const MapWrapper = styled.View`
  width: ${Dimensions.get('window').width - 40};
  height: ${Dimensions.get('window').width - 40};
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
`

const Button = styled.TouchableOpacity`
`

const ButtonTitle = styled.Text`
`

const FormWrapper = styled.View`
  padding: 10px;
  background-color: white;
`