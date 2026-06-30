import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Sheet from "../common/Sheet";
import Battery from "./Battery";

import { energyActions } from "../../store";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LEVELS: (20 | 40 | 60 | 80 | 100)[] = [100, 80, 60, 40, 20];

export default function EnergySheet({ open, onClose }: Props) {
  const [level, setLevel] = useState<20 | 40 | 60 | 80 | 100>(60);

  async function save() {
    await energyActions.set(level);
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Today's Energy">
      <Text style={styles.subtitle}>How energetic are you feeling?</Text>

      <View style={styles.content}>
        <Battery level={level} onChange={setLevel} />
      </View>

      <Pressable style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginBottom: 26,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#6366F1",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
