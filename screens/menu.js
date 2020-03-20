import React, { Component } from 'react';
import { Text, View, Image, TextInput, Button, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { logout } from '../server';
import { headerStyles } from '../styles/Header.style';
import topBar from './topBar';
import themeColours from '../styles/themeColours';
import { globalStyles } from '../styles/Global.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppState from '../global';
import { StyleSheet } from 'react-native';

class menu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '',
      headerStyle: headerStyles.headerBar,
      headerRight: topBar(false, navigation),
    };
  };

  async logout() {
    await logout(AppState.authToken);
    this.props.navigation.navigate('Home');
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
        {/* Feed Shortcut*/}
        <View style={globalStyles.container}>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Send', {})}>
              <View style={styles.menuButton}>
                <Text style={styles.menuButton}>Send Chit</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.hr} />
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.push('Feed')}>
              <View style={styles.menuButton}>
                <Text style={styles.menuButton}>Feed</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.hr} />
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}>
              <View style={styles.menuButton}>
                <Text style={styles.menuButton}>User Search</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.hr} />
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UpdateProfile')}>
              <View style={styles.menuButton}>
                <Text style={styles.menuButton}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.hr} />
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <View style={styles.menuButton}>
                <Text style={styles.menuButton}>My Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.hr} />
          <View>
            <TouchableOpacity
              onPress={() => this.logout()}>
              <View style={styles.menuButton}>
                <Text style={styles.menuButton}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}
export default menu;

const styles = StyleSheet.create({
  hr: {
    alignSelf: 'stretch',
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 2,
  },

  menuButton: {
    backgroundColor: 'white',
    borderBottomColor: themeColours.darkBlue,
    fontSize: 30,
  },
});