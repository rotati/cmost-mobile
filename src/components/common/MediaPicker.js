import React, { Component } from 'react'
import ImagePicker          from 'react-native-image-picker'
import styled               from 'styled-components'

export default class MediaPicker extends Component {
  imageOptions = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    }
  }

  videoOptions = {
    title: 'Video Picker',
    takePhotoButtonTitle: 'Take Video...',
    mediaType: 'video',
    videoQuality: 'medium'
  }

  selectMediaTapped = () => {
    const options = this.props.type === 'Image' ? this.imageOptions : this.videoOptions

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        console.log(response.uri)
      }
    });
  }

  render() {
    const { type, label, hint } = this.props

    return (
      <Wrapper>
        <Label>{ label }</Label>
        { hint && <Hint>{ hint }</Hint> }
        <PickerButton onPress={ () => this.selectMediaTapped() }>
          <PickerText>Please Choose</PickerText>
        </PickerButton>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  margin-bottom: 10px;
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
`

const PickerText = styled.Text`
  font-size: 15px;
  color: #fff;
`
