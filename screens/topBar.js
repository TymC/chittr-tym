import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {headerStyles} from '../styles/Header.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import themeColours from '../styles/themeColours';

topBar = (feed, navigation) => {
  var FeedButton = (
    <TouchableOpacity
      onPress={() => navigation.navigate('Menu', {})}
      style={headerStyles.headerNavIcon}>
      <FontAwesome5 name={'bars'} size={25} color={themeColours.white} />
    </TouchableOpacity>
  );

  return (
    <View style={headerStyles.headerNavView}>
      {feed == true ? FeedButton : <View />}
      
      
    </View>
  );
};
export default topBar;
