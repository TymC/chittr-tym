import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../styles/Global.style';
import { getUserDetails, logout } from '../server';
import AppState from '../global';
import { headerStyles } from '../styles/Header.style';
import topBar from './topBar';
import themeColours from '../styles/themeColours';

const styles = StyleSheet.create({
  user: {
    fontSize: 26,
    fontWeight: "bold"
  },
  ProfilePicture: { width: 100, height: 100, borderRadius: 95, alignSelf: 'center' },
  userContainer: {
    flexDirection: "row",
    flex: 1
  },
  imageContainer: {
    flex: 1,
    alignSelf: "flex-start",
  },
  columnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  scrollView: {
    width:'100%',
    flex: 5,
  },
  button: {
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
  detailsContainer: {
    flex: 1,
    flexDirection: "row"
  },  
  chit: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#6D939E',
    marginVertical: 5,
    flexDirection: 'row',
  },
  chit_photo_wrapper: {
    alignSelf: 'center',
  },
  chit_user_photo: {
    margin: 20,
    width: 100,
    height: 100,
  },
  chit_content: {
    flex:1,
    marginTop: 10,
    marginRight:10,
    flexDirection: 'column',
  },
  user: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    color: themeColours.darkBlue,
    textTransform: 'capitalize',
  },
  chitText: {
    flex: 1,
    margin: 0,
    width: '80%',
    textTransform: 'capitalize',
  },
});


class profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'My Profile',
      headerTintColor: "#fff",
      headerStyle: headerStyles.headerBar,
      headerRight: topBar(true, navigation),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: '',
      profileImageUri: '',
    };
  }

  async componentDidMount() {
    await this.getUserData();
    this.setState({
      isLoading: false,
    });
  }

  async onFocus() {
    this.setState({
      isLoading: true,
    });
    await this.getUserData();
    this.setState({
      isLoading: false,
    });
  }

  async getUserData() {
    var responseJson = await getUserDetails(AppState.currentUser);
    this.setState({
      userData: responseJson,
      profileImageUri: `http://10.0.2.2:3333/api/v0.0.5/user/${AppState.currentUser}/photo`,
    });
    this.render();
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <KeyboardAwareScrollView
          style={globalStyles.bgContainer}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={globalStyles.container}
          scrollEnabled={false}>
          <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
          <View style={globalStyles.container}>
            <View style={styles.userContainer}>
              <Image
                source={{
                  uri: this.state.profileImageUri + '?' + Date.now(),
                }}
                style={styles.ProfilePicture}
              />
              <View style={styles.columnContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.props.navigation.navigate('Follows', {
                      type: 'followers',
                    })
                  }>
                  <Text style={styles.buttonText}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.props.navigation.navigate('Follows', {
                      type: 'following',
                    })
                  }>
                  <Text style={styles.buttonText}>Following</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={styles.scrollView}>
              <FlatList
                data={this.state.userData.recent_chits}
                renderItem={({ item }) => {
                   return (
                    <View style={styles.chit}>
                      <View style={styles.chit_photo_wrapper}>
                        <Image
                          source={{
                            uri:
                              `http://10.0.2.2:3333/api/v0.0.5/user/${this.state.userData.user_id}/photo?` +
                              Date.now(),
                          }}
                          style={styles.chit_user_photo}
                        />
                      </View>
                      <View style={styles.chit_content}>
                        <Text style={styles.user}>
                          {' '}
                          {this.state.userData.given_name} {this.state.userData.family_name}
                        </Text>
                        <Text style={styles.chitText}> {item.chit_content}</Text>
                      </View>
                    </View>
                  )
                }}
                keyExtractor={item => item.chit_id}
              />
            </ScrollView>
            <View style={styles.detailsContainer}>
              <View style={styles.columnContainer}>
                <Text style={styles.user}>
                  {this.state.userData.given_name}{' '}
                  {this.state.userData.family_name}
                </Text>
                <Text>{this.state.userData.email}</Text>
              </View>
              <View style={styles.columnContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('UpdateProfile')}>
                  <View>
                    <Text>
                      Edit Account
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </KeyboardAwareScrollView>
      );
    }
  }
}
export default profile;

