import React, { Component } from "react"
import Video                from "react-native-video"
import ProgressBar          from "react-native-progress/Bar"
import Icon                 from "react-native-vector-icons/FontAwesome"
import styled               from 'styled-components'

import {
  View,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native"

export default class VideoPlayer extends Component {
  state = {
    paused: true,
    progress: 0,
    duration: 0,
  }

  secondsToTime = () => {
    const time = Math.floor(this.state.progress * this.state.duration)
    return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60
  }

  handleMainButtonTouch = () => {
    if (this.state.progress >= 1) {
      this.player.seek(0)
    }

    this.setState(state => ({ paused: !state.paused }))
  }

  handleProgressPress = e => {
    const position = e.nativeEvent.locationX
    const progress = (position / 250) * this.state.duration

    this.player.seek(progress)
  }

  handleProgress = progress => {
    this.setState({
      progress: progress.currentTime / this.state.duration,
    })
  }

  handleEnd = () => {
    this.setState({ paused: true, progress: 1 })
  }

  handleLoad = meta => {
    this.setState({ duration: meta.duration })
  }

  render() {
    return (
      <VideoWrapper>
        <View>
          <Video
            paused={this.state.paused}
            source={{ uri: this.props.uri }}
            resizeMode="contain"
            repeat={true}
            onLoad={this.handleLoad}
            onProgress={this.handleProgress}
            onEnd={this.handleEnd}
            style={{ width: '100%', height: '100%' }}
            ref={ ref => this.player = ref }
          />
          <Controls>
            <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
              <PlayPausedButton
                name={!this.state.paused ? "pause" : "play"}
                size={20}
                color="#FFF"
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.handleProgressPress}>
              <View>
                <ProgressBar
                  progress={this.state.progress}
                  color="#FFF"
                  unfilledColor="rgba(255,255,255,.5)"
                  borderColor="#FFF"
                  width={250}
                  height={15}
                />
              </View>
            </TouchableWithoutFeedback>

            <Duration>
              { this.secondsToTime() }
            </Duration>
          </Controls>
        </View>
      </VideoWrapper>
    )
  }
}

const VideoWrapper = styled.View`
  width: ${ Dimensions.get('window').width - 40 };
  height: ${ (Dimensions.get('window').width - 40) * 9 / 16 };
  margin-top: 15px;
  background-color: #000;
`

const Controls = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  height: 40;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  flexDirection: row;
  alignItems: center;
  justifyContent: space-around;
`
const Duration = styled.Text`
  color: #fff;
  margin-left: 10px;
  margin-right: 10px;
`

const PlayPausedButton = styled(Icon)`
  margin-left: 10px;
  margin-right: 10px;
`