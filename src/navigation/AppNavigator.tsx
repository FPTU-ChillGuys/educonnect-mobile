import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import theme and constants
import { colors } from '../styles/theme';
import { NAVIGATION } from '../utils/constants';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case NAVIGATION.HOME:
                iconName = focused ? 'home' : 'home-outline';
                break;
              case NAVIGATION.SEARCH:
                iconName = focused ? 'search' : 'search-outline';
                break;
              case NAVIGATION.SCHEDULE:
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case NAVIGATION.PROFILE:
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          headerShown: false,
        })}
      >
        <Tab.Screen name={NAVIGATION.HOME} component={HomeScreen} />
        <Tab.Screen name={NAVIGATION.SEARCH} component={SearchScreen} />
        <Tab.Screen name={NAVIGATION.SCHEDULE} component={ScheduleScreen} />
        <Tab.Screen name={NAVIGATION.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 