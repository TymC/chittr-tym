import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import register from './screens/register';
import home from './screens/home';
import feed from './screens/feed';
import profile from './screens/profile';
import followersOrFollowing from './screens/followersOrFollowing';
import updateProfilScreen from './screens/updateProfile';
import search from './screens/search';
import camera from './screens/camera';
import menu from './screens/menu';
import sendChit from './screens/sendChit';

const AppStackNav = createStackNavigator({
  Home: {
    screen: home,
  },
  Register: {
    screen: register,
  },
  Feed: {
    screen: feed,
  },
  Profile: {
    screen: profile,
  },
  UpdateProfile: {
    screen: updateProfilScreen,
  },
  Follows: {
    screen: followersOrFollowing,
  },
  Search: {
    screen: search,
  },
  Camera: {
    screen: camera,
  },
  Menu:{
    screen: menu,
  },
  Send:{
    screen: sendChit
  }
});

const AppContainer = createAppContainer(AppStackNav);

export default AppContainer;
