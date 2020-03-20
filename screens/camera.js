import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { globalStyles } from '../styles/Global.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { headerStyles } from '../styles/Header.style';

class Camera extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '',
      headerStyle: headerStyles.headerBar,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.props.navigation.push('UpdateProfile', { imageData: data });
    }
  }

  //render view containing capture button and image preview.
  render() {
    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
          />
          <View
            style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}>
              <Text style={{ fontSize: 16 }}>CAPTURE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera;