import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { taskActions } from "../../store";

import Sheet from "../common/Sheet";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Priority = "low" | "med" | "high";

export default function CreateTaskSheet({ open, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority | undefined>();
  const [estimate, setEstimate] = useState(60);
  const minimumDeadline = new Date(Date.now() + estimate * 60 * 1000);

  if (deadline < minimumDeadline) {
    Alert.alert(
      "Invalid Deadline",
      `Deadline must be at least ${estimate} minutes from now.`,
    );
    return;
  }
  const [deadline, setDeadline] = useState(
    () => new Date(Date.now() + 60 * 60 * 1000),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const reset = () => {
    setTitle("");
    setDescription("");
    setPriority(undefined);
    setEstimate(60);
    setDeadline(new Date(Date.now() + estimate * 60 * 1000));
  };

  const save = async () => {
    if (!title.trim()) return;

    const minimumDeadline = new Date(Date.now() + estimate * 60000);

    await taskActions.add({
      title,
      description,
      priority,
      estimatedMinutes: estimate,
      deadline: deadline.toISOString(),
    });

    reset();
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title="New Task">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Field label="Title">
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Draft Q3 strategy doc"
            style={styles.input}
          />
        </Field>

        <Field label="Description (Optional)">
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, styles.multiline]}
          />
        </Field>

        <Field label="Priority">
          <View style={styles.priorityRow}>
            {(["low", "med", "high"] as const).map((p) => (
              <PriorityButton
                key={p}
                text={p === "med" ? "Medium" : p}
                active={priority === p}
                onPress={() => setPriority(priority === p ? undefined : p)}
              />
            ))}

            <PriorityButton
              text="AI"
              active={!priority}
              onPress={() => setPriority(undefined)}
            />
          </View>
        </Field>

        <Field label={`Estimated Time : ${estimate} min`}>
          <Slider
            minimumValue={15}
            maximumValue={240}
            step={15}
            value={estimate}
            onValueChange={(v) => {
              setEstimate(v);

              const newMinimum = new Date(Date.now() + v * 60 * 1000);

              if (deadline < newMinimum) {
                setDeadline(newMinimum);
              }
            }}
          />
        </Field>

        <Field label="Deadline">
          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              📅{" "}
              {deadline.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.dateButton, { marginTop: 10 }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.dateText}>
              🕒{" "}
              {deadline.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Pressable>
        </Field>

        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="date"
            minimumDate={minimumDeadline}
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);

              if (selectedDate) {
                const updated = new Date(deadline);
                updated.setFullYear(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate(),
                );
                setDeadline(updated);
              }
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={deadline}
            mode="time"
            minimumDate={minimumDeadline}
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);

              if (selectedTime) {
                const updated = new Date(deadline);
                updated.setHours(selectedTime.getHours());
                updated.setMinutes(selectedTime.getMinutes());
                setDeadline(updated);
              }
            }}
          />
        )}

        <Pressable
          style={[styles.saveButton, !title.trim() && { opacity: 0.5 }]}
          disabled={!title.trim()}
          onPress={save}
        >
          <Text style={styles.saveText}>Save Task</Text>
        </Pressable>
      </ScrollView>
    </Sheet>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function PriorityButton({
  text,
  active,
  onPress,
}: {
  text: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.priorityButton, active && styles.priorityActive]}
    >
      <Text style={[styles.priorityText, active && styles.priorityTextActive]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 18,
  },
  dateButton: {
    backgroundColor: "#F4F4F5",
    padding: 16,
    borderRadius: 14,
  },

  dateText: {
    fontSize: 15,
    fontWeight: "500",
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    color: "#666",
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: "#F4F4F5",
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
  },

  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  priorityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  priorityButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F4F4F5",
  },

  priorityActive: {
    backgroundColor: "#E0E7FF",
  },

  priorityText: {
    fontWeight: "600",
  },

  priorityTextActive: {
    color: "#4F46E5",
  },

  saveButton: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
