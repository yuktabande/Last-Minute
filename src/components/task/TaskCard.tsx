import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { taskActions } from "../../store";
import { useTheme } from "../../theme";
import type { Task } from "../../types";
interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [percent, setPercent] = useState(task.percentComplete);
  const colors = useTheme();
  const progress = task.estimatedMinutes
    ? Math.min(
        100,
        Math.round((task.completedMinutes / task.estimatedMinutes) * 100),
      )
    : 0;

  const priorityColor =
    task.priority === "high"
      ? "#EF4444"
      : task.priority === "med"
        ? "#F59E0B"
        : "#22C55E";

  return (
    <>
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
            <View style={styles.titleRow}>
              {task.priority && (
                <View
                  style={[styles.dot, { backgroundColor: priorityColor }]}
                />
              )}

              <Text
                style={[
                  styles.title,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {task.title}
              </Text>
            </View>

            {!!task.description && (
              <Text style={[styles.description, { color: colors.secondary }]}>
                {task.description}
              </Text>
            )}
          </View>
          <Pressable onPress={() => taskActions.remove(task.id)}>
            <Ionicons name="trash-outline" size={18} color="#888" />
          </Pressable>
        </View>

        <View style={{ marginTop: 14 }}>
          <View style={styles.progressHeader}>
            <Text
              style={[
                styles.progressLabel,
                {
                  color: colors.secondary,
                },
              ]}
            >
              Progress
            </Text>

            <Text
              style={[
                styles.progressValue,
                {
                  color: colors.text,
                },
              ]}
            >
              {task.completedMinutes}m / {task.estimatedMinutes}m
            </Text>
          </View>

          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: colors.border,
              },
            ]}
          >
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => taskActions.start(task.id)}
          >
            <Ionicons
              name={task.startedAt ? "play" : "camera-outline"}
              size={16}
              color="#555"
            />

            <Text style={styles.secondaryText}>
              {task.startedAt ? "STARTED" : "START"}
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              setPercent(task.percentComplete);
              setShowDialog(true);
            }}
          >
            <Ionicons name="checkmark" size={16} color="white" />

            <Text style={styles.primaryText}>COMPLETE</Text>
          </Pressable>
        </View>
      </View>
      <Modal visible={showDialog} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 24,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              How much is completed?
            </Text>

            <Text
              style={{
                marginVertical: 12,
                fontSize: 42,
                textAlign: "center",
              }}
            >
              {percent}%
            </Text>

            <Slider
              minimumValue={0}
              maximumValue={100}
              step={5}
              value={percent}
              onValueChange={setPercent}
            />

            <Pressable
              style={{
                marginTop: 20,
                backgroundColor: "#6366F1",
                padding: 16,
                borderRadius: 14,
              }}
              onPress={async () => {
                await taskActions.setProgress(task.id, percent);
                setShowDialog(false);
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  title: {
    fontWeight: "700",
    fontSize: 16,
  },

  description: {
    color: "#666",
    marginTop: 4,
    fontSize: 13,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressLabel: {
    fontSize: 11,
    color: "#777",
  },

  progressValue: {
    fontSize: 11,
  },

  progressBar: {
    height: 6,
    backgroundColor: "#ECECEC",
    borderRadius: 4,
  },

  progressFill: {
    height: 6,
    borderRadius: 4,
    backgroundColor: "#6366F1",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#F4F4F5",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#6366F1",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "#555",
  },

  primaryText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "white",
  },
});
