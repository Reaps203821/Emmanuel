import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { Video } from "expo-av"; // ✅ Use expo-av directly
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function LiveScreen() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // LIVE badge pulse animation
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const videoUrl =
    "https://live-za.streann.tech/emmanueltvlive_abr/emmanueltvlive/emmanueltvlive/emmanueltvlive_5/chunks.m3u8?auth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJhbm9ueW1vdXMiLCJleHAiOjE3NjI4MTYwMzEsInJpZCI6IjYzNTg4NTAwZTRiMGEzZWZkZmZjZDdhZSIsImtleSI6ImtleTEiLCJjaWQiOiI2NjI5NDhhOThmMDg1MTEzNzZlMGZkMTYifQ.bTglu5oHA9a64CQxvd_Jo_rwY1zhHJKg7c13dTcKL1M";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient colors={["#0a0a0a", "#1a1a1a", "#000"]} style={StyleSheet.absoluteFill} />

      {/* Video Player */}
      <View style={styles.videoContainer}>
        {loading && <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />}
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode="contain"
          shouldPlay={isPlaying}
          isLooping
          useNativeControls={Platform.OS !== "web"}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          onError={(e) => console.log("Video Error: ", e)}
        />

        <LinearGradient colors={["rgba(0,0,0,0.6)", "transparent"]} style={styles.topOverlay} />

        <View style={styles.overlayContent}>
          <Animated.Text style={[styles.liveBadge, { transform: [{ scale: pulseAnim }] }]}>
            ● LIVE
          </Animated.Text>
          <Text style={styles.title}>Emmanuel TV Live Broadcast</Text>
          <Text style={styles.subtitle}>Now streaming: Worship & Inspiration</Text>
        </View>
      </View>

      {/* Watch/Pause */}
      <View style={styles.details}>
        <TouchableOpacity style={styles.button} onPress={() => setIsPlaying(!isPlaying)}>
          <LinearGradient colors={["#FFD700", "#E6C200"]} style={styles.buttonInner}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="#000" />
            <Text style={styles.buttonText}>{isPlaying ? "Pause Stream" : "Watch Live"}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.inspiration}>Tune in from anywhere and feel the presence of God.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  videoContainer: { position: "relative", height: 300, width: "100%", backgroundColor: "#111" },
  video: { width: "100%", height: "100%" },
  topOverlay: { position: "absolute", width: "100%", height: 120, top: 0 },
  overlayContent: { position: "absolute", top: 20, left: 15 },
  liveBadge: {
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 14,
    alignSelf: "flex-start",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  title: { marginTop: 10, color: "#fff", fontSize: 20, fontWeight: "800", textShadowColor: "rgba(0,0,0,0.6)", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 6 },
  subtitle: { color: "#ccc", fontSize: 14, marginTop: 2 },
  details: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 25, marginTop: 20 },
  button: { width: width * 0.7, borderRadius: 30, overflow: "hidden", elevation: 5, shadowColor: "#FFD700", shadowOpacity: 0.4, shadowRadius: 6 },
  buttonInner: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, borderRadius: 30 },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#000", marginLeft: 8 },
  loader: { position: "absolute", alignSelf: "center", top: "45%" },
  inspiration: { color: "#ccc", fontSize: 14, textAlign: "center", marginTop: 15, lineHeight: 20 },
});
