import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneShell from "../src/components/layout/PhoneShell";
import { useTheme } from "../src/theme";

export default function SignupScreen() {
  const colors = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <PhoneShell>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Create Account
        </Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor={colors.secondary}
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
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

        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          placeholderTextColor={colors.secondary}
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
          value={confirm}
          onChangeText={setConfirm}
        />

        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={async () => {
            await AsyncStorage.setItem("SignedIn", "true");
            router.replace("/");
          }}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={[styles.link, { color: colors.primary }]}>
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    height: 56,
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  button: {
    marginTop: 20,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    marginTop: 24,
    fontWeight: "600",
  },
});
