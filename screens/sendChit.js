import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getChits, postChit,getUserDetails } from '../server';
import { headerStyles } from '../styles/Header.style';
import topBar from './topBar';
import { globalStyles } from '../styles/Global.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';

import AppState from '../global';

class sendChit extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '',
      headerStyle: headerStyles.headerBar,
      headerRight: topBar(true, navigation),
    };
  };
  constructor(props) {
    super(props);
    console.log("inconstructor: " + AppState.currentUser)
    this.state = {
      text: '',
      chitData: [],
      location: null,
      filePath: {},
    };

    this.getUserData(AppState.currentUser);

  }

  getUserData = async () => {
    console.log("currUser1: " + AppState.currentUser)
    var responseJson = await getUserDetails(AppState.currentUser);
    this.setState({
      userData: responseJson,
    });
  };


  onSubmit = async () => {
    if (this.state.userData == null) {
      this.alertLoginNeeded;
    } else {
      var body = this.createChitPOSTBody();
      console.log('body: ' + body);
      await postChit(body);
    }
  };

  saveDraft = async () => {
    if (this.state.userData == null) {
      this.alertLoginNeeded;
    } else {
      var body = this.createChitPOSTBody();
      await saveChitDraft('testKey', body);
      console.log("saved:" + body)
    }
  };

  retrieveDraft = async () => {
    if (this.state.userData == null) {
      this.alertLoginNeeded;
    } else {
      var body = await retrieveChitDraft('testKey');
      console.log("retrieved:" + body)
    }
  };

  createChitPOSTBody() {
    var body = JSON.stringify({
      chit_id: 0,
      timestamp: Date.now(),
      chit_content: this.state.text,
      location: {
        longitude: 0,
        latitude: 0,
      },
      user: {
        user_id: AppState.currentUser,
        given_name: this.state.userData.given_name,
        family_name: this.state.userData.family_name,
        email: this.state.userData.email,
      },
    });
    return body;
  }



  alertLoginNeeded() {
    Alert.alert(
      'Sorry!',
      'You need to log in to share chits.',
      [
        {
          text: 'Log in',
          onPress: () => this.props.navigation.navigate('Home'),
        },
        {
          text: 'Sign up',
          onPress: () => this.props.navigation.navigate('Register'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <View style={globalStyles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              {...this.props}
              multiline
              numberOfLines={3}
              maxLength={141}
              onChange={event => {
                this.setState({
                  text: event.nativeEvent.text,
                });
              }}
              value={this.state.text}
              placeholder={'Share with the world'}
            />
          </View>
          <View style={styles.imageIcons}>
            <TouchableOpacity
              onPress={async () => {
                await this.onSubmit();

              }}>
              <FontAwesome5
                name={'share'}
                size={40}
                color={'black'}
              />
            </TouchableOpacity>

          </View>

        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default sendChit;

const styles = StyleSheet.create({

  imageIcons: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 0,
    justifyContent: 'space-between'

  },
  inputView: {
    alignSelf: "center",
    width: 260,
    paddingHorizontal: 10,
    color: "white"
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 5,
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "black"
  }
});