import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export default function App() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const loadHtml = async () => {
      const asset = Asset.fromModule(require("../assets/app.html"));
      await asset.downloadAsync(); // ensure file is downloaded
      const fileContent = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setHtmlContent(fileContent);
    };

    loadHtml();
  }, []);

  if (!htmlContent) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
