import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native'
import styled from 'styled-components'
import MDIcon   from 'react-native-vector-icons/MaterialIcons'

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

export default class Location extends React.Component {
  constructor(props) {
    super(props)
    const coordinate = props.coordinate || ''
    const latitude   = parseFloat(coordinate.split(' ')[0]) || 11.5564
    const longitude  = parseFloat(coordinate.split(' ')[1]) || 104.9282

    this.state = {
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      coordinate: {
        latitude: latitude,
        longitude: longitude
      },
      hasCoordinate: props.coordinate !== undefined
    }
  }

  setRegion(region) {
    const coordinateAsString = region.latitude + ' ' + region.longitude

    this.setState({ 
      region: {
        ...region,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA
      },
      coordinate: region
    })

    this.props.onChange(coordinateAsString)
  }

  componentDidMount() {
    if (!this.state.hasCoordinate) this.getCurrentPosition()
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

  render() {

    const { region, coordinate } = this.state
    const { label, hint } = this.props

    return (
      <View>
        <Label>{ label }</Label>
        { hint && <Hint>{ hint }</Hint> }

        <MapWrapper>
          <Map
            region={region}
            showsUserLocation={true}
            provider="google"
            onPress={(e) => this.setRegion(e.nativeEvent.coordinate) }
            ref={ map => { this.map = map }}
          >
            <Marker 
              coordinate={ coordinate }
            />
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