import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Alert, // 💡 Added Alert for dummy functionality
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import colors from "../themes/colors"; // ❌ Commenting out, using mock defined below

// 🎨 Mock Colors Definition
const colors = {
  gold: "#FFC72C", // Used for the Play button
  white: "#FFFFFF",
  black: "#000000",
};

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const featuredVideo = require("../../assets/banner.mp4.mp4"); // 🎥 Replace with your own video
  const thumbnails = [
    require("../../assets/thumb1.jpeg"),
    require("../../assets/thumb2.jpeg"),
    require("../../assets/thumb3.jpeg"),
    require("../../assets/thumb4.jpeg"),
  ];

  // 💡 Dummy Button Handler
  const handlePlayPress = () => {
    Alert.alert("Playback Started", "Now playing the featured video.");
  };

  const handleMoreInfoPress = () => {
    Alert.alert(
      "More Information",
      "This would navigate to a detailed view screen."
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* 🎥 Featured Video Banner */}
      <View style={styles.bannerContainer}>
        <Video
          source={featuredVideo}
          style={styles.bannerVideo}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />

        {/* 🌈 Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.95)"]}
          style={styles.gradientOverlay}
        />

        {/* 🧾 Banner Text & Buttons */}
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Emmanuel TV</Text>
          <Text style={styles.subtitle}>Faith. Hope. Love.</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayPress}
            >
              <Ionicons name="play" size={18} color={colors.black} />
              <Text style={styles.playText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={handleMoreInfoPress}
            >
              <Ionicons
                name="information-circle-outline"
                size={18}
                color={colors.white}
              />
              <Text style={styles.infoText}>More Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 🎞️ Scrollable Content Sections */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section title="Latest Messages" thumbnails={thumbnails} />
        <Section title="Faith Tools" thumbnails={thumbnails} />
        <Section title="Documentaries" thumbnails={thumbnails} />
        <Section title="Live Broadcasts" thumbnails={thumbnails} />
      </ScrollView>
    </View>
  );
}

/* 🎬 Reusable Section Component */
const Section = ({ title, thumbnails }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {thumbnails.map((thumb, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() =>
            Alert.alert("Card Tapped", `You selected item ${index + 1}`)
          } // 💡 Dummy Card Handler
        >
          <Image source={thumb} style={styles.thumbnail} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  bannerContainer: {
    width: "100%",
    height: height * 0.6, // Make banner taller for Netflix feel
    position: "relative",
    // Adjusting for status bar padding based on OS
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bannerVideo: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  gradientOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0,
  },
  bannerContent: {
    position: "absolute",
    bottom: 60,
    left: 20,
    zIndex: 5,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginVertical: 8,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gold,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  playText: {
    marginLeft: 5,
    fontWeight: "700",
    color: colors.black,
  },
  infoText: {
    color: "#fff",
    marginLeft: 5,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  card: {
    marginRight: 10,
  },
  thumbnail: {
    width: width * 0.4,
    height: 160,
    borderRadius: 10,
    // 🗑️ Typo removed: The 'i' at the end of the original definition is gone.
  },
});
