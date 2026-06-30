import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme";
export type TabKey = "reminders" | "tasks" | "completed";

interface Props {
  value: TabKey;
  onChange: (tab: TabKey) => void;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "reminders", label: "Reminders" },
  { key: "tasks", label: "Tasks" },
  { key: "completed", label: "Completed" },
];

export default function TabSwitch({ value, onChange }: Props) {
  const colors = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      {tabs.map((tab) => {
        const active = value === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={[
              styles.tab,
              active && [
                styles.activeTab,
                {
                  backgroundColor: colors.background,
                },
              ],
            ]}
            onPress={() => onChange(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: active ? colors.text : colors.secondary,
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,

    flexDirection: "row",

    borderRadius: 14,

    padding: 4,
  },

  tab: {
    flex: 1,

    paddingVertical: 10,

    alignItems: "center",

    borderRadius: 10,
  },

  activeTab: {
    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 4,

    elevation: 2,
  },

  tabText: {
    fontSize: 13,

    fontWeight: "600",
  },
});
