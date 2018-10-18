import React, { Component } from 'react'
import { RNCamera }         from 'react-native-camera'
import { Dimensions, Vibration }       from 'react-native'
import styled               from 'styled-components'

export default class BarcodeReader extends Component {
  state = {
    openCamera: false,
  }

  showCamera() {
    this.setState({ openCamera: true })
  }

  onBarCodeRead = (e) => {
    this.setState({ openCamera: false })
    this.props.onChange(e.data)
    Vibration.vibrate(500)
  }

  displayValue = () => (
    this.props.value &&
      <ResultWrapper>
        <Result>{ this.props.value }</Result>
      </ResultWrapper>
  )

  render() {
    const { label, hint } = this.props
    const { openCamera } = this.state

    return (
      <Container>
        { label && <Label>{ label }</Label> }
        { hint && <Hint>{ hint }</Hint> }
        <PickerButton onPress={ () => this.showCamera() }>
          <PickerText>Scan Barcode</PickerText>
        </PickerButton>
        {
          openCamera ?
            <RNCamera
              ref={ref => { this.camera = ref; }}
              style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
              onBarCodeRead={ (e) => this.onBarCodeRead(e) }
            >
              <CameraContainer>
                <Finder>
                  <TopLeftEdge />
                  <TopRightEdge />
                  <BottomLeftEdge />
                  <BottomRightEdge />
                </Finder>
              </CameraContainer>
            </RNCamera>
          : this.displayValue()
        }
      </Container>
    )
  }
}

{/* ---------- Styled Components ---------- */}

const Container = styled.View`
  flex: 1;
`

const ResultWrapper = styled.View`
  padding: 5px;
  margin-bottom: 10;
  align-items: center;
`

const Result = styled.Text`
  font-style: italic;
  font-size: 18px;
`

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5;
`

const Hint = styled.Text`
  font-style: italic; 
  margin-bottom: 10;
`

const PickerButton = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  align-items: center;
  border-radius: 5px;
  background-color: #008CBA;
  margin-top: 5px;
  margin-bottom: 15px;
`

const PickerText = styled.Text`
  font-size: 15px;
  color: #fff;
`

const CameraContainer = styled.View`
  width: ${ (Dimensions.get('window').width - 40) }
  height: ${ (Dimensions.get('window').width - 40) }
  align-items: center;
  justify-content: center;
`

const Finder = styled.View`
  width: ${ (Dimensions.get('window').width - 80) }
  height: ${ (Dimensions.get('window').width - 80) }
`

const TopLeftEdge = styled.View`
  position: absolute;
  width: 40;
  height: 20;
  top: 0;
  left: 0;
  border-color: #008CBA;
  border-top-width: 2px;
  border-left-width: 2px;
`

const TopRightEdge = styled.View`
  position: absolute;
  width: 40;
  height: 20;
  top: 0;
  right: 0;
  border-color: #008CBA;
  border-top-width: 2px;
  border-right-width: 2px;
`

const BottomLeftEdge = styled.View`
  position: absolute;
  width: 40;
  height: 20;
  bottom: 0;
  left: 0;
  border-color: #008CBA;
  border-bottom-width: 2px;
  border-left-width: 2px;
`

const BottomRightEdge = styled.View`
  position: absolute;
  width: 40;
  height: 20;
  bottom: 0;
  right: 0;
  border-color: #008CBA;
  border-bottom-width: 2px;
  border-right-width: 2px;
`
