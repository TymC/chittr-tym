import React, {Component} from 'react';
import {Text, View, Image, TextInput, Button, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {login} from '../server';
import {headerStyles} from '../styles/Header.style';
import topBar from './topBar';
import AppState from '../global';
import themeColours from '../styles/themeColours';
import {globalStyles} from '../styles/Global.style' ;
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

class home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:'',
      headerStyle: headerStyles.headerBar,
      headerRight: topBar(true, navigation),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  async submit() {
    var responseJson = await login(this.state.email, this.state.password);
    AppState.authToken = responseJson.token;
    AppState.currentUser = responseJson.id;
    this.props.navigation.navigate('Profile', {});
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
        {/* Feed Shortcut*/}
        <View style={globalStyles.container}>
        <View>
        <Text style={styles.menuButton}>
            Straight to the feed?
          </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Feed')}>
              <View style={styles.skipLoginButton}>
              
                <Text style={styles.skipLoginText}>
                  Click Here
                </Text>
              </View>
            </TouchableOpacity>
          </View>
                  
          <Image style={styles.logo} source={require('./../images/TymLogo.png')} />
          <View>
            
            {/* The Email text field */}
            <TextInput
            placeholder='Email'
              style={styles.textInput}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View>
            {/* The password text field */}
            <TextInput
            placeholder='Password'
              style={styles.textInput}
              secureTextEntry
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.submit();
              }}>
              <View style={styles.loginRegButton}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>                  
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <View style={styles.loginRegButton}>
                <Text style={styles.buttonText}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default home;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  textInput: {
    height: 40,
    width: 200,
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 0.5,
    color: themeColours.darkBlue,
  },
  loginRegButton: {
    backgroundColor: themeColours.darkBlue,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
  },

  infoText: {color: themeColours.darkBlue},
  
  skipLoginButton: {
    backgroundColor: 'white',
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 0.5,
    alignSelf: 'center',
  },

  menuButton: {
    borderBottomColor: themeColours.darkBlue,
    fontSize: 30,
  },

  skipLoginText: {color: themeColours.darkBlue},
});
