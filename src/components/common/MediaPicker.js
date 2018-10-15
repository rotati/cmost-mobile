import React, { Component }  from 'react'
import Video                 from './VideoPlayer'
import ImagePicker           from 'react-native-image-picker'
import styled                from 'styled-components'
import axios                 from 'axios'
import Loading               from '../../components/common/Loading'

import { Image, Dimensions, Platform } from 'react-native'
import { MEDIA_UPLOAD_URL, API_KEY }   from '../../constants/EndPoints'

export default class MediaPicker extends Component {

  state = {
    loading: false
  }

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
    if (this.state.loading) return

    const options = this.props.type === 'image' ? this.imageOptions : this.videoOptions

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) return
      if (response.error) {
        alert('There was a problem while opening picker. ', response.error);
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
    const headers   = { headers: { Authorization: "Token " + API_KEY, "Content-Type": "multipart/form-data" } }
    const mediaType = this.props.type + "s"
    const endPoint  = MEDIA_UPLOAD_URL(mediaType)

    const formData  = new FormData()
    formData.append('upload', upload)

    this.setState({ loading: true })
    axios.post(endPoint, formData, headers)
      .then(result => {
        const media_object_id = result.data.id
        this.props.onChange({ ...upload, media_object_id })
        this.setState({ loading: false })
      })
      .catch(function (error) {
        alert(error)
      })
  }

  getFileName = (file) => {
    let fileName = file.uri.split('/').pop();
    if(Platform.OS === 'android') {
      fileName = file.path.split('/').pop();
    }
    return fileName
  }

  previewer = () => {
    const { type, value = {} } = this.props
    const uri = value.uri

    if (type === 'image' && !!uri) return this.imagePreviewer(uri)
    else if (type === 'video' && !!uri) return this.videoPlayer(uri)
  }

  imagePreviewer = (uri) => (
    <ImageWrapper>
      <ImagePreviewer
        source={{ uri }}
        resizeMode='contain'
      />
    </ImageWrapper>
  )

  videoPlayer = (uri) => (
    <Video uri={uri} />
  )

  render() {
    const { type, label, hint } = this.props

    return (
      <Wrapper>
        <Label>{ label }</Label>
        { hint && <Hint>{ hint }</Hint> }
        <PickerButton onPress={ () => this.selectMediaTapped() }>
          { this.state.loading && <Loading/> }
          <PickerText>Please Choose</PickerText>
        </PickerButton>
        { this.previewer() }
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

const ImageWrapper = styled.View`
  margin-top: 15px;
  border-color: #ddd;
  border-width: 1px;
`

const ImagePreviewer = styled(Image)`
  height: ${ (Dimensions.get('window').width - 40) };
  flex: 1;
  width: null;
`
