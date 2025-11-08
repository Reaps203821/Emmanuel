import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../Auth/LoginScreen";
import SignUpScreen from "../Auth/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import LiveScreen from "../screens/LiveScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Theme colors
import colors from "../themes/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* =======================================
🎬 Bottom Tab Navigator (Netflix-style)
======================================= */
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000", // Netflix black
          borderTopColor: "transparent",
          height: 65,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Live") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          } else if (route.name === "Library") {
            iconName = focused ? "albums" : "albums-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={26}
              color={focused ? colors.gold : "#ccc"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

/* =======================================
🌍 Main App Stack Navigator
======================================= */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {/* 🌀 Splash screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* 🔐 Auth screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* 🎬 Main app (with tabs) */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
