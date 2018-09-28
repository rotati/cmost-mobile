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
    const options = this.props.type === 'image' ? this.imageOptions : this.videoOptions

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) return
      if (response.error) {
        alert('ImagePicker Error: ', response.error);
      }
      else {
        this.uploadMedia(response)
      }
    });
  }

  uploadMedia = (response) => {
    const uri       = response.uri
    const name      = this.getFileName(response)
    const path      = response.path !== undefined ? `file://${response.path}` : response.uri
    const extension = name.substring(name.lastIndexOf('.') + 1)
    const type      = `${this.props.type}/${extension}`

    const upload    = { path, uri, name, type }
    console.log(upload)
  }

  getFileName = (file) => {
    let fileName = file.fileName
    if (fileName === undefined) {
      const path = file.path
      fileName   = path.substring(path.lastIndexOf('/') + 1)
    }

    return fileName
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
