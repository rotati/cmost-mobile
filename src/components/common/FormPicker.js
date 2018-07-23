import React, { Component } from "react"
import styled from 'styled-components'
import {
  Modal,
  TouchableWithoutFeedback,
  Platform,
  View,
  Picker,
  TouchableOpacity
} from "react-native";

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  renderPicker = (props) => (
    <Picker selectedValue={ props.value } onValueChange={ props.onValueChange }>
      <Picker.Item value='' label='Please select...' />
      { props.items.map((i, index) => (
        <Picker.Item key={ index } label={ i.label } value={ i.value } />
      )) }
    </Picker>
  )

  render() {
    if (Platform.OS === "android") {
      return (
        this.renderPicker(this.props)
      );
    } else {
      const selectedItem = this.props.items.find(i => i.value === this.props.value)
      const selectedLabel = selectedItem ? selectedItem.label : "";

      return (
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
                  <Picker
                    selectedValue={this.props.value}
                    onValueChange={this.props.onValueChange}
                  >
                    <Picker.Item value='' label='Please select...' />
                    {this.props.items.map((i, index) => (
                      <Picker.Item
                        key={index}
                        label={i.label}
                        value={i.value}
                      />
                    ))}
                  </Picker>
                </View>
              </ModalContainer>
            </TouchableWithoutFeedback>
          </Modal>
        </InputContainer>
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
  padding-top: 5;
  padding-bottom: 5;
`

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`
const ModalContent = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  padding: 10;
  background-color: #fff;
`

const DoneButton = styled.Text`
  color: blue;
  font-weight: bold;
`