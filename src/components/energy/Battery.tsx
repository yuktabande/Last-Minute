import React, { useMemo, useRef } from "react";
import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { EnergyLevel, energyColor, energyLabel, snapLevel } from "./constants";

interface Props {
  level: EnergyLevel;
  onChange: (level: EnergyLevel) => void;
}

export default function Battery({ level, onChange }: Props) {
  const batteryHeight = useRef(0);

  function updateFromTouch(y: number) {
    if (!batteryHeight.current) return;

    const ratio = 1 - y / batteryHeight.current;

    const percent = Math.max(0, Math.min(100, ratio * 100));

    onChange(snapLevel(percent));
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: (e) => {
          updateFromTouch(e.nativeEvent.locationY);
        },

        onPanResponderMove: (e) => {
          updateFromTouch(e.nativeEvent.locationY);
        },
      }),
    [],
  );

  function onLayout(e: LayoutChangeEvent) {
    batteryHeight.current = e.nativeEvent.layout.height;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.tip} />

      <View
        onLayout={onLayout}
        style={styles.body}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.fill,
            {
              height: `${level}%`,
              backgroundColor: energyColor(level),
            },
          ]}
        />

        <View style={styles.overlay}>
          <Text
            style={[
              styles.percent,
              {
                color: level >= 60 ? "white" : "#1F2937",
              },
            ]}
          >
            {level}%
          </Text>

          <Text
            style={[
              styles.label,
              {
                color: level >= 60 ? "white" : "#1F2937",
              },
            ]}
          >
            {energyLabel(level)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },

  tip: {
    width: 46,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#222",
    marginBottom: 8,
  },

  body: {
    width: 170,
    height: 320,

    borderRadius: 28,

    borderWidth: 5,
    borderColor: "#222",

    overflow: "hidden",

    justifyContent: "flex-end",
  },

  fill: {
    width: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: "center",
    alignItems: "center",

    pointerEvents: "none",
  },

  percent: {
    fontSize: 38,
    fontWeight: "800",
  },

  label: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 16,
  },
});
