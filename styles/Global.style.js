import {StyleSheet} from 'react-native';
import themeColours from './themeColours';
export const globalStyles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: themeColours.darkBlue,
  },
  container: {
    // Gives a white background to the entire app
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
