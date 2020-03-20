import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, FlatList, ActivityIndicator, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getChits } from '../server';
import { headerStyles } from '../styles/Header.style';
import topBar from './topBar';
import { globalStyles } from '../styles/Global.style';
import { StyleSheet } from 'react-native';



class feed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'News Feed',
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
    this.getChitData();
  }
  onFocus(){
    this.getChitData();
  }

  getChitData = async () => {
    var responseJson = await getChits();
    this.setState({
      isLoading: false,
      chitData: responseJson,
    });
  };

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
        <NavigationEvents onWillFocus={() => this.onFocus()} />
        <View style={globalStyles.container}>
          <FlatList
            style={styles.list}
            data={this.state.chitData}
            renderItem={({ item }) => {
              return (

                <View style={styles.chit}>
                  <View style={styles.chit_photo_wrapper}>
                    <Image
                      source={{
                        uri:
                          `http://10.0.2.2:3333/api/v0.0.5/user/${item.user.user_id}/photo?` +
                          Date.now(),
                      }}
                      style={styles.chit_user_photo}
                    />
                  </View>
                  <View style={styles.chit_content}>
                    <Text style={styles.user}>
                      {' '}
                      {item.usergiven_name} {item.user.family_name}
                    </Text>
                    <Text style={styles.chitText}> {item.chit_content}</Text>
                  </View>
                </View>
              )
            }}

            keyExtractor={item => item.chit_id}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default feed;

const styles = StyleSheet.create({
  list: { width: '100%', flex: 1, marginTop: 40 },
  bottom: {
    height: '20%',
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 15,
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
    flex: 1,
    marginTop: 10,
    marginRight: 10,
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
