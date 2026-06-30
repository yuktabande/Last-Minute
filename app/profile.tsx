import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PhoneShell from "../src/components/layout/PhoneShell";
import { useTheme } from "../src/theme";

export default function ProfileScreen() {
  const colors = useTheme();

  return (
    <PhoneShell>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </Pressable>

        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Ionicons name="person-circle" size={70} color={colors.primary} />

          <Text style={[styles.name, { color: colors.text }]}>Yukta</Text>
        </View>

        <Pressable
          style={[styles.logout, { backgroundColor: "#EF4444" }]}
          onPress={async () => {
            await AsyncStorage.removeItem("loggedIn");
            router.replace("/login");
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="white" />

          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 30,
  },

  card: {
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
  },

  name: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
  },

  logout: {
    marginTop: 40,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  logoutText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
