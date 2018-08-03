import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native'
import styled   from 'styled-components'
import MDIcon   from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'

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

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = 0.01

export default class MapSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      region: {
        latitude: props.markers[0].latitude,
        longitude: props.markers[0].longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: props.markers
    }
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

  onLocationSelect = (marker) => {
    this.props.onChange(marker.value)
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
    const { markers, value } = this.props
    let validMarkers = []
    _.each(markers, (marker, index) => {
      if (marker.latitude && marker.longitude) {
        validMarkers.push(
          <Marker
            key={ index }
            coordinate={ { latitude: marker.latitude, longitude: marker.longitude } }
            onPress={ () => this.onLocationSelect(marker) }
            title={ marker.label }
            pinColor={ value === marker.value ? 'blue' : 'red' }
          />
        )
      }
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
      </View>
    )
  }
}