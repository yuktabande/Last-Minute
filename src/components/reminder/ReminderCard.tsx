import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { reminderActions } from "../../store";
import { useTheme } from "../../theme";
import type { Reminder } from "../../types";
interface Props {
  reminder: Reminder;
}

export default function ReminderCard({ reminder }: Props) {
  const colors = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            {reminder.title}
          </Text>

          <Text style={styles.subtitle}>
            {reminder.date} • {reminder.time}
          </Text>

          {reminder.repeat && (
            <View style={styles.repeatBadge}>
              <Ionicons name="repeat" size={14} color="#6366F1" />
              <Text style={styles.repeatText}>{reminder.repeatLabel}</Text>
            </View>
          )}
        </View>

        <Pressable onPress={() => reminderActions.remove(reminder.id)}>
          <Ionicons name="trash-outline" size={18} color="#888" />
        </Pressable>
      </View>

      <View style={styles.footer}>
        <View style={styles.silentBadge}>
          <Ionicons
            name={
              reminder.silent
                ? "notifications-off-outline"
                : "notifications-outline"
            }
            size={15}
            color="#555"
          />

          <Text style={styles.silentText}>
            {reminder.silent ? "Silent" : "Notification"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  header: {
    flexDirection: "row",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 5,
    color: "#666",
  },

  repeatBadge: {
    marginTop: 12,
    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EEF2FF",

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 20,
  },

  repeatText: {
    marginLeft: 6,
    color: "#6366F1",
    fontWeight: "600",
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  silentBadge: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F5F5F5",

    paddingHorizontal: 10,
    paddingVertical: 8,

    borderRadius: 16,
  },

  silentText: {
    marginLeft: 5,
    color: "#555",
    fontWeight: "600",
  },
});
