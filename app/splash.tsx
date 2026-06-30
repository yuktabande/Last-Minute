import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    async function checkLogin() {
      const loggedIn = await AsyncStorage.getItem("loggedIn");

      if (loggedIn === "true") {
        router.replace("/");
      } else {
        router.replace("/login");
      }
    }

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6366F1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
