import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import themeColours from '../styles/themeColours';
import { globalStyles } from '../styles/Global.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { headerStyles } from '../styles/Header.style';
import { setUserPhoto, updateUser } from '../server';

class updateProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Update Account',
      headerTintColor: "#fff",
      headerStyle: headerStyles.headerBar,
      headerRight: topBar(true, navigation),
    };
  };

  constructor(props) {
    super(props);

    var cameraPic = this.props.navigation.state.params?.cameraPic;
    this.state = {
      email: '',
      password: '',
      given_name: '',
      family_name: '',
      cameraPic: cameraPic,
    };
  }

  componentDidMount() {
    this.onFocus();
  }

  onFocus() {
    if (this.props.navigation.state.params?.cameraPic != null) {
      var cameraPic = this.props.navigation.state.params.cameraPic;
      console.log('image:' + cameraPic);
      this.setState({
        cameraPic: cameraPic,
      });
    }
  }

  async submit() {
    if (this.state.cameraPic != {}) {
      await setUserPhoto(this.state.cameraPic);
    }
    await updateUser(this.state.email, this.state.password, this.state.given_name, this.state.family_name);

    this.props.navigation.navigate('Profile');
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
        <View style={globalStyles.container}>
          <Image
            source={{ uri: this.state.cameraPic?.uri }}
            style={styles.imagePreview}
          />
          <View>
            <TextInput
              placeholder='First Name'
              style={styles.textInput}
              onChangeText={given_name => this.setState({ given_name })}
              value={this.state.given_name}
            />
          </View>

          <View>
            <TextInput
              placeholder='Surname'
              style={styles.textInput}
              onChangeText={family_name => this.setState({ family_name })}
              value={this.state.family_name}
            />
          </View>

          <View>
            <TextInput
              placeholder='Email'
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View>
            <TextInput
              placeholder='Password'
              style={styles.textInput}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>
          <View>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Camera')
                }>
                <View style={styles.submitButton}>
                  <FontAwesome5
                    name={'camera'}
                    size={30}
                    color={themeColours.lightBlue}
                  />
                  <Text style={styles.buttonText}>
                    Take New Profile Picture
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.submit();
              }}>
              <View style={styles.submitButton}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default updateProfile;

const styles = StyleSheet.create({
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  infoText: { color: themeColours.darkBlue },
  textInput: {
    height: 40,
    width: 200,
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 0.5,
    color: themeColours.darkBlue,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: themeColours.darkBlue,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 3,
    margin: 5,
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
  },
  imagePreview: {
    width: 80, height: 80
  }
});