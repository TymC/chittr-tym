import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { createUser } from '../server';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { headerStyles } from '../styles/Header.style';
import themeColours from '../styles/themeColours';
import { globalStyles } from '../styles/Global.style';
import { StyleSheet } from 'react-native';

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

class register extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Sign Up",
      headerTintColor: "#fff",
      headerStyle: headerStyles.headerBar,
    };
  };
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', given_name: '', family_name: '' };
  }

  async submit() {
    await createUser(
      this.state.given_name,
      this.state.family_name,
      this.state.email,
      this.state.password,
    );
    this.props.navigation.navigate('Home');
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
          <View>
            {/* The Name text field */}
            <TextInput
              placeholder='First Name'
              style={styles.textInput}
              onChangeText={given_name => this.setState({ given_name })}
              value={this.state.given_name}
            />
          </View>
          <View>
            {/* The Surname text field */}
            <TextInput
              placeholder='Surename'
              style={styles.textInput}
              onChangeText={family_name => this.setState({ family_name })}
              value={this.state.family_name}
            />
          </View>
          <View>
            {/* The Email text field */}
            <TextInput
              placeholder='Email'
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View>
            {/* The password text field */}
            <TextInput
              placeholder='Password'
              style={styles.textInput}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.submit();
              }}>
              <View style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default register;
