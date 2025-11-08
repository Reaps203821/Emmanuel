import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../themes/colors";

const GoldButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
      <LinearGradient
        colors={[colors.gold, colors.goldLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    marginVertical: 12,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  text: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default GoldButton;
