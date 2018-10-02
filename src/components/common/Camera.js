import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      shouldreadbarcode: true,
      isReady: false
    };
  }

  reScanBarcode() {
    if(this.camera) {
      this.camera.resumePreview();
      this.setState({ shouldreadbarcode: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => { this.camera = ref; }}
          style={ this.state.isReady ? styles.preview : {}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={(barcodes) => {
            this.camera.pausePreview();
            if(this.state.shouldreadbarcode) {
              alert("Type => " + JSON.stringify(barcodes.type) + "Data => " + JSON.stringify(barcodes.data))
            }
            this.setState({ shouldreadbarcode: false });
          }}
          onCameraReady={() => this.setState({ isReady: true })}
        >
          {({ camera, status }) => {
            if (status !== 'READY' || !this.state.isReady) return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.reScanBarcode()} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> Rescan Barcode </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
