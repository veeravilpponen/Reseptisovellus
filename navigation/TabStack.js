import React from 'react';
import { Icon } from 'native-base';
import Etusivu from '../pages/Etusivu';
import LisaaResepti from '../pages/LisaaResepti';
import Reseptilista2 from '../pages/Reseptilista2';
import NaytaResepti3 from '../pages/NaytaResepti3';
import MuokkaaReseptia from '../pages/MuokkaaReseptia';
import {
  createTabNavigator,
  TabBarBottom,
  createStackNavigator,
} from 'react-navigation';

const Tab = createTabNavigator(
  {
    Etusivu: { screen: Etusivu },
    Listaa: { screen: Reseptilista2 },
    Lisää: { screen: LisaaResepti },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        let iconName;

        if (navigation.state.routeName === 'Etusivu') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (navigation.state.routeName === 'Listaa') {
          iconName = `ios-list-box${focused ? '' : '-outline'}`;
        } else if (navigation.state.routeName === 'Lisää') {
          iconName = `ios-create${focused ? '' : '-outline'}`;
        } 

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#696969',
      labelStyle: { fontSize: 16 },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
  }
);

const NaviTabStack = createStackNavigator(
  {
    Tab: {
      screen: Tab,
    },
    Resepti: {
      screen: NaytaResepti3,
    },
    Muokkaa: {
      screen: MuokkaaReseptia,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default NaviTabStack;