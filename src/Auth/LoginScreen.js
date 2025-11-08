import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import InputField from "../components/InputField";
import GoldButton from "../components/GoldButton";
import colors from "../themes/colors";
import { BlurView } from "expo-blur"; // blur stays for the nice background effect

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // validation checks
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill in both fields.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // show loader
    setLoading(true);

    // simulate login request
    setTimeout(() => {
      setLoading(false);
      console.log("✅ Logged in successfully!");
      navigation.replace("Home"); // navigate to HomeScreen
    }, 2000);
  };

  return (
    <ImageBackground
      source={require("../../assets/cross.png.png")}
      style={styles.container}
      resizeMode="cover"
      blurRadius={3}
    >
      <BlurView intensity={60} tint="dark" style={styles.overlay}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue watching</Text>

        <View style={styles.form}>
          <InputField
            icon="mail-outline"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            icon="lock-closed-outline"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.gold}
              style={{ marginTop: 16 }}
            />
          ) : (
            <GoldButton
              title="Sign In"
              onPress={handleLogin}
              disabled={loading}
            />
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.link}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "90%",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    color: colors.gold,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 24,
  },
  form: {
    width: "100%",
  },
  signupText: {
    color: colors.white,
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    color: colors.gold,
    fontWeight: "600",
  },
});

export default LoginScreen;
