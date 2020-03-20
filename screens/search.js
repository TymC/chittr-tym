import React, { Component } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  searchUser,
} from '../server';
import AppState from '../global';
import { headerStyles } from '../styles/Header.style';
import topBar from './topBar';
import themeColours from '../styles/themeColours';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { globalStyles } from '../styles/Global.style';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  list: { width: '100%', flex: 1, marginTop: 40 },
  container: {
    flex: 1,
    marginTop: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  textInput: {
    marginTop: 10,
    height: 40,
    width: '75%',
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 2,
    color: themeColours.darkBlue,
  },
  searchBar: {
    flexDirection: 'row',
  },
  user: {
    flex: 1,
    alignSelf: 'stretch',
    marginVertical: 5,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#6D939E',
  },
  user_photo_wrapper: {
    alignSelf: 'flex-start',
  },
  user_photo: {
    margin: 10,
    width: 60,
    height: 60,
  },
  user_content: {
    marginTop: 5,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'column',
    flex: 1
  },
  name: {
    fontSize: 26,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2B3D3F',
    textTransform: "capitalize",
  },
  followButton: {
    backgroundColor: '#703D57',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 3,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: 'white',
  },
  buttonAlignRight: {
    width: '100%'
  }
});

class search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Search",
      headerTintColor: "#fff",
      headerStyle: headerStyles.headerBar,
      headerRight: topBar(true, navigation),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      userId: AppState.currentUser,
      query: '',
      userList: [],
      followes: [],
      following: [],
    };
  }

  async getUsers() {
    var responseJson = await getFollowing(this.state.userId, 'following');
    this.setState({
      following: responseJson,
    });

    responseJson = await getFollowers(this.state.userId, 'followers');
    this.setState({
      followers: responseJson,
    });
  }

  searchUsers = async () => {
    var responseJson = await searchUser(this.state.query);
    this.setState({
      isLoading: false,
      userList: responseJson,
    });
    console.log('userList' + JSON.stringify(this.state.userList));
  };

  onSubmit() {
    this.searchUsers();
  }

  doIFollowUser(userId) {
    var index = this.state.following.findIndex(a => a.user_id == userId);
    return index != -1 ? 'Unfollow' : 'Follow';
  }

 onFollow =  async (user, type) => {
    if (type == 'Follow') {
      await followUser(user.user_id, this.state.authToken);
      await this.getUsers();
      this.searchUsers();
    } else if (type == 'Unfollow') {
      await unfollowUser(user.user_id, this.state.authToken);
      await this.getUsers();
      this.searchUsers();
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
        <View style={globalStyles.container}>
          <View style={styles.list}>
            <FlatList
              data={this.state.userList}
              renderItem={({ item }) => (
                <View style={styles.user}>
                  <View style={styles.user_photo_wrapper}>
                    <Image
                      source={{
                        uri:
                          `http://10.0.2.2:3333/api/v0.0.5/user/${item.user_id}/photo?` +
                          Date.now(),
                      }}
                      style={styles.user_photo}
                    />
                  </View>
                  <View style={styles.user_content}>
                    <Text style={styles.name}>
                      {' '}
                      {item.given_name} {item.family_name}
                    </Text>
                    <TouchableOpacity
                      style={styles.buttonAlignRight}
                      onPress={() => {
                        this.onFollow(item, this.doIFollowUser(item.user_id));
                      }}>
                      <View style={styles.followButton}>
                        <Text style={styles.buttonText}>{this.doIFollowUser(item.user_id)}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={item => item.user_id}
            />
          </View>
          <View style={styles.searchBar}>
            <TextInput
              {...this.props}
              style={styles.textInput}
              editable
              maxLength={40}
              onChange={event => {
                console.log('event: ' + JSON.stringify(event.nativeEvent.text));
                this.setState({
                  query: event.nativeEvent.text,
                });
              }}
              value={this.state.text}
              placeholder={'Search a name'}
            />
            <TouchableOpacity
              onPress={() => {
                console.log('searched' + this.state.query);
                this.onSubmit();
              }}>
              <FontAwesome5
                name={'search'}
                marginTop={10}
                size={35}
                color={themeColours.darkBlue}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default search;
