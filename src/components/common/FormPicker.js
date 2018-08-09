import React, { Component } from "react"
import styled from 'styled-components'
import {
  Modal,
  TouchableWithoutFeedback,
  Platform,
  View,
  Picker,
  TouchableOpacity
} from "react-native"

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  renderPicker = (props) => (
    <Picker selectedValue={ props.value } onValueChange={ props.onChange } >
      <Picker.Item value='' label='Please select...' />
      { props.options.map((i, index) => (
        <Picker.Item key={ index } label={ i.label } value={ i.value } />
      )) }
    </Picker>
  )

  render() {
    if (Platform.OS === "android") {
      return (
        <View>
          <Label>{ this.props.label }</Label>
          { this.props.hint && <Hint>{ this.props.hint }</Hint> }
          <AndroidPickerWrapper>{ this.renderPicker(this.props) }</AndroidPickerWrapper>
        </View>
      );
    } else {
      const selectedItem = this.props.options.find(i => i.value === this.props.value)
      const selectedLabel = selectedItem ? selectedItem.label : "";

      return (
        <View>
          <Label>{ this.props.label }</Label>
          { this.props.hint && <Hint>{ this.props.hint }</Hint> }
          <InputContainer>
            <TouchableOpacity onPress={() => {this.setState({ modalVisible: true })}}>
              {
                this.props.value === undefined ?
                  <Input style={{ color: '#ddd' }}>Please select...</Input>
                  : <Input>{ selectedLabel }</Input>
              }
            </TouchableOpacity>
            <Modal animationType="slide" transparent={ true } visible={ this.state.modalVisible }>
              <TouchableWithoutFeedback
                onPress={() => this.setState({ modalVisible: false })}
                style={{backgroundColor: 'blue'}}
              >
                <ModalContainer>
                  <ModalContent>
                    <DoneButton onPress={ () => this.setState({ modalVisible: false }) }>
                      Done
                    </DoneButton>
                  </ModalContent>
                  <View
                    onStartShouldSetResponder={evt => true}
                    onResponderReject={evt => {}}
                  >
                    { this.renderPicker(this.props) }
                  </View>
                </ModalContainer>
              </TouchableWithoutFeedback>
            </Modal>
          </InputContainer>
        </View>
      )
    }
  }
}

const InputContainer = styled.View`
  border-color: #ddd;
  border-width: 1;
`

const Input = styled.Text`
  padding-left: 5;
  padding-right: 5;
  padding-top: 10;
  padding-bottom: 10;
`

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`
const ModalContent = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  padding: 10px;
  background-color: #fff;
`

const DoneButton = styled.Text`
  color: blue;
  font-weight: bold;
`

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5;
`

const Hint = styled.Text`
  font-style: italic; 
  margin-bottom: 10;
`

const AndroidPickerWrapper = styled.View`
  border-width: 1px;
  border-color: #ddd;
`