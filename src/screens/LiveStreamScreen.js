// LiveStreamScreen.js
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";

const { height } = Dimensions.get("window");

const LIVE_STREAM_URL = "https://www.stream.emmanuel.tv/";

export default function LiveStreamScreen() {
  return (
    // SafeAreaView helps with notches and status bar on iOS
    <SafeAreaView style={styles.container}>
      {/* Set status bar to dark content for better visibility on this screen */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <WebView
        // The URL to load inside the webview
        source={{ uri: LIVE_STREAM_URL }}
        // Settings to allow media playback
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false} // Allows autoplay if the website permits
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // Styles to make it fill the screen
        style={styles.webView}
        // Optional: Show loading progress or status
        onLoadProgress={({ nativeEvent }) => {
          // console.log('Loading progress:', nativeEvent.progress);
        }}
        // Optional: Error handling
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webView: {
    flex: 1,
    // Add extra padding at the top if needed for Android status bar offset
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    minHeight: height * 0.9, // Ensure it's large enough
  },
});
