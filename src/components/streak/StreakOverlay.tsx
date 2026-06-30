import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function StreakOverlay() {
  const [count, setCount] = useState<number | null>(null);

  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    globalThis.__SHOW_STREAK__ = (value: number) => {
      setCount(value);

      scale.setValue(0.6);
      opacity.setValue(0);

      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setCount(null));
        }, 2000);
      });
    };

    return () => {
      delete globalThis.__SHOW_STREAK__;
    };
  }, []);

  if (count === null) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <Text style={styles.emoji}>🔥</Text>

      <Text style={styles.title}>STREAK +1</Text>

      <Text style={styles.day}>Day {count}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.25)",

    zIndex: 999,
  },

  emoji: {
    fontSize: 72,
  },

  title: {
    marginTop: 16,
    fontSize: 30,
    fontWeight: "800",
    color: "white",
  },

  day: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
});
