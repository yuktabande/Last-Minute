import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneShell from "../src/components/layout/PhoneShell";
import { useTheme } from "../src/theme";

export default function LoginScreen() {
  const colors = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <PhoneShell>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <Ionicons name="flash" size={34} color="white" />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Welcome Back
          </Text>

          <Text style={[styles.subtitle, { color: colors.secondary }]}>
            Live More. Stress Less.
          </Text>
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Email</Text>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={colors.secondary}
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { color: colors.text }]}>Password</Text>

        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.secondary}
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={[styles.login, { backgroundColor: colors.primary }]}
          onPress={async () => {
            await AsyncStorage.setItem("loggedIn", "true");
            router.replace("/");
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/signup")}>
          <Text style={[styles.signup, { color: colors.primary }]}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </View>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    justifyContent: "center",
  },

  top: {
    alignItems: "center",
    marginBottom: 50,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
  },

  label: {
    marginBottom: 8,
    marginTop: 18,
    fontWeight: "700",
  },

  input: {
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 15,
  },

  login: {
    marginTop: 34,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },

  signup: {
    marginTop: 24,
    textAlign: "center",
    fontWeight: "700",
  },
});
