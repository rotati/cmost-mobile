import React                 from 'react'
import { ActivityIndicator } from "react-native"
import styled                from 'styled-components'

const Loading = () => (
  <LoadingWrapper>
    <ActivityIndicator size='large'/>
  </LoadingWrapper>
)

const LoadingWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.5;
  background-color: black;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

export default Loading
