import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { themeActions, useEnergy, useStreak, useThemeMode } from "../../store";
import { useTheme } from "../../theme";

interface Props {
  onEnergyPress: () => void;
}
export default function TopBar({ onEnergyPress }: Props) {
  const energy = useEnergy();
  const level = energy?.level ?? 60;
  const colors = useTheme();
  const mode = useThemeMode();

  const profile = {
    name: "Yukta",
  };
  const streak = useStreak();
  console.log("TopBar streak", streak);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.left}>
        <Pressable
          onPress={() => router.push("/profile")}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>
            {profile.name.charAt(0).toUpperCase()}
          </Text>
        </Pressable>

        <View>
          <Text style={[styles.caption, { color: colors.secondary }]}>
            FOCUSING TODAY
          </Text>
          <Text style={[styles.name, { color: colors.text }]}>
            {profile.name}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <View style={[styles.badge, { backgroundColor: colors.card }]}>
          <Ionicons name="flame" size={15} color="#F97316" />

          <Text style={[styles.badgeText, { color: colors.text }]}>
            {streak.count}
          </Text>
        </View>

        <Pressable
          style={[styles.energy, { backgroundColor: colors.card }]}
          onPress={onEnergyPress}
        >
          <Text style={{ color: colors.text }}>{level}%</Text>
        </Pressable>

        <Pressable
          style={[styles.iconButton, { backgroundColor: colors.card }]}
          onPress={() => themeActions.toggle()}
        >
          <Ionicons
            name={mode === "dark" ? "sunny-outline" : "moon-outline"}
            size={18}
            color={colors.text}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#6366F1",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  caption: {
    fontSize: 10,
    color: "#888",
    letterSpacing: 1,
    fontWeight: "600",
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFF2E8",

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 18,

    marginRight: 8,
  },

  badgeText: {
    marginLeft: 4,
    fontWeight: "700",
    color: "#F97316",
  },

  energy: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EEF2FF",

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 18,

    marginRight: 8,
  },

  energyText: {
    marginLeft: 4,
    fontWeight: "700",
    color: "#6366F1",
  },

  iconButton: {
    width: 36,
    height: 36,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 18,

    backgroundColor: "#F5F5F5",
  },
});
