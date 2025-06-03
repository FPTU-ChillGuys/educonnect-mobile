import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import GridScreen from '../screens/GridScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatBotScreen from '../screens/ChatBotScreen';

// Import theme and constants
import { colors } from '../styles/theme';
import { NAVIGATION } from '../utils/constants';

const Tab = createBottomTabNavigator();

const CenterLogo = () => (
  <View style={styles.centerLogoContainer}>
    <Image 
      source={require('../assets/BOT.png')}
      style={styles.logo}
    />
  </View>
);

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
              case NAVIGATION.BOOKMARKS:
                iconName = focused ? 'bookmark' : 'bookmark-outline';
                break;
              case NAVIGATION.GRID:
                iconName = focused ? 'grid' : 'grid-outline';
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
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name={NAVIGATION.HOME} component={HomeScreen} />
        <Tab.Screen name={NAVIGATION.BOOKMARKS} component={BookmarksScreen} />
        <Tab.Screen 
          name={NAVIGATION.CHATBOT}
          component={ChatBotScreen}
          options={{
            tabBarIcon: () => <CenterLogo />,
          }}
        />
        <Tab.Screen name={NAVIGATION.GRID} component={GridScreen} />
        <Tab.Screen name={NAVIGATION.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    elevation: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  centerLogoContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logo: {
    width: 35,
    height: 35,
    tintColor: '#fff',
  },
});

export default AppNavigator; 