import {StyleSheet} from 'react-native';
import themeColours from './themeColours';
import { whileStatement } from '@babel/types';

export const headerStyles = StyleSheet.create({
  headerBar: {
    backgroundColor: themeColours.headerBlue,
    height: 100,
    elevation: 0,
  },
  headerNavView: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  headerNavIcon: {
    padding: 5,
  },
  
});
