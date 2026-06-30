import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.background}>
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(progress, 100)}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 7,
    borderRadius: 4,
    backgroundColor: "#ECECEC",
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    backgroundColor: "#6366F1",
  },
});
