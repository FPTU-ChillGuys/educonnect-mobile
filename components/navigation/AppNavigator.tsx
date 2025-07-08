import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import BookmarksScreen from "../screens/BookmarksScreen";
import GridScreen from "../screens/GridScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatBotScreen from "../screens/ChatBotScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import VerificationScreen from "../screens/VerificationScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import NotifyDetailScreen from "../screens/NotifyDetailScreen";
import ScheduleScreen from "../screens/ScheduleScreen";

// Import theme and constants
import { colors } from "../styles/theme";
import { NAVIGATION } from "../utils/constants";
import ChatBotHistoryScreen from "../screens/ChatBotHistoryScreen";
import uuid from 'react-native-uuid';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

const BookmarksStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookmarksMain" component={BookmarksScreen} />
      <Stack.Screen name="NotifyDetail" component={NotifyDetailScreen} />
    </Stack.Navigator>
  );
};

const ChatbotStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={NAVIGATION.CHATBOT}
        component={ChatBotScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.push(NAVIGATION.CHATBOTHISTORY)}>
              <Text style={{ marginLeft: 15 }}> ☰</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.replace(NAVIGATION.CHATBOT, {
              conversationId: uuid.v4(), // Generate a new conversation ID
            })}>
              <Ionicons name="chatbubbles" size={24} color={colors.primary} style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={NAVIGATION.CHATBOTHISTORY}
        component={ChatBotHistoryScreen}
      />
    </Stack.Navigator>
  );
};

const CenterLogo = () => (
  <View style={styles.centerLogoContainer}>
    <Image source={require("../../assets/BOT.png")} style={styles.logo} />
  </View>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case NAVIGATION.HOME:
              iconName = focused ? "home" : "home-outline";
              break;
            case NAVIGATION.BOOKMARKS:
              iconName = focused ? "bookmark" : "bookmark-outline";
              break;
            case NAVIGATION.GRID:
              iconName = focused ? "grid" : "grid-outline";
              break;
            case NAVIGATION.PROFILE:
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "help-outline";
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
      <Tab.Screen name={NAVIGATION.BOOKMARKS} component={BookmarksStack} />
      <Tab.Screen
        name={NAVIGATION.CHATBOT}
        component={ChatbotStack}
        initialParams={{ conversationId: uuid.v4() }} // Generate a new conversation ID
        options={{
          tabBarIcon: () => <CenterLogo />,
        }}
      />
      <Tab.Screen name={NAVIGATION.GRID} component={ScheduleScreen} />
      <Tab.Screen
        name={NAVIGATION.PROFILE}
        component={ProfileStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? "ProfileMain";
            const hideOnScreens = [
              "Settings",
              "Login",
              "ForgotPassword",
              "Verification",
              "ResetPassword",
            ];
            if (hideOnScreens.includes(routeName)) {
              return { display: "none" };
            }
            return styles.tabBar;
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 24 : 16,
    left: 16,
    right: 16,
    elevation: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  centerLogoContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
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
    tintColor: "#fff",
  },
});

export default AppNavigator;
