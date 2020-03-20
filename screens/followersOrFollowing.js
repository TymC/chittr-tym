import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, FlatList, ActivityIndicator, Image, TouchableOpacity, Text } from 'react-native';
import {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} from '../server';
import AppState from '../global';
import { headerStyles } from '../styles/Header.style';
import topBar from './topBar';
import { StyleSheet } from 'react-native';

class followersOrFollowing extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Followers',
      headerTintColor: "#fff",
      headerStyle: headerStyles.headerBar,
      headerRight: topBar(true, navigation),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userId: AppState.currentUser,
      type: this.props.navigation.state.params.type,
      userList: [],
      followers: [],
      following: [],
    };
  }

  componentDidMount() {
    this.getUsers();
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

    this.setState({
      isLoading: false,
      userList:
        this.state.type == 'followers'
          ? this.state.followers
          : this.state.following,
    });
  }

  doIFollowUser(userId) {
    var index = this.state.following.findIndex(a => a.user_id == userId);
    return index != -1 ? 'Unfollow' : 'Follow';
  }

  onFollow = async (user, type) => {
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
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.onFocus()} />
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
      );
    }
  }
}
export default followersOrFollowing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5,
  }, name: {
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
});