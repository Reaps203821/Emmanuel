import React, { useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in over 3s
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Navigate to Login after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000E1A" barStyle="light-content" />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ImageBackground
          source={require("../../assets/splash-logo.png")} // ✅ your full-screen background
          style={styles.background}
          resizeMode="cover" // fills screen nicely
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000E1A",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
