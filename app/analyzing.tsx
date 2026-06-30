import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { refreshTasks, refreshTodayPlan } from "../src/store";
import { api } from "../utils/api";
const messages = [
  "Understanding today's workload...",
  "Checking your calendar...",
  "Finding focus blocks...",
  "Prioritizing your tasks...",
  "Building today's sprint...",
  "Almost ready...",
];

const emojis = ["🔥", "💪🏼", "📆", "💻", "✈️", "📖"];

export default function AnalyzingScreen() {
  const rotate = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  const [message, setMessage] = useState(messages[0]);
  const [dots, setDots] = useState("");

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    let i = 0;

    const interval = setInterval(() => {
      i++;

      setMessage(messages[i % messages.length]);

      const d = ".".repeat((i % 3) + 1);

      setDots(d);
    }, 1800);

    const runDiscovery = async () => {
      try {
        setMessage("Connecting to your workspace...");

        await api("/discovery/run", {
          method: "POST",
        });

        setMessage("Planning today's schedule...");
        await api("/ai/generate-day", {
          method: "POST",
        });

        setMessage("Updating your task list...");

        await Promise.all([refreshTasks(), refreshTodayPlan()]);

        setMessage("Done!");

        setTimeout(() => {
          router.replace("/");
        }, 800);
      } catch (err) {
        console.error(err);
        setMessage("Couldn't sync your workspace.");
      }
    };
    runDiscovery();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ rotate: rotation }],
        }}
      >
        <View style={styles.orbit}>
          {emojis.map((emoji, index) => {
            const angle = (Math.PI * 2 * index) / emojis.length;

            return (
              <Text
                key={index}
                style={[
                  styles.emoji,
                  {
                    left: 110 + Math.cos(angle) * 90,
                    top: 110 + Math.sin(angle) * 90,
                  },
                ]}
              >
                {emoji}
              </Text>
            );
          })}
        </View>
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            transform: [{ scale: pulse }],
          },
        ]}
      >
        Analyzing{dots}
      </Animated.Text>

      <Text style={styles.subtitle}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1120",
    justifyContent: "center",
    alignItems: "center",
  },

  orbit: {
    width: 240,
    height: 240,
  },

  emoji: {
    position: "absolute",
    fontSize: 32,
  },

  title: {
    marginTop: 40,
    color: "white",
    fontSize: 34,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 16,
    color: "#CBD5E1",
    fontSize: 16,
  },
});
