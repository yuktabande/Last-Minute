import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { reminderActions } from "../../store";
import Sheet from "../common/Sheet";

interface Props {
  open: boolean;
  onClose: () => void;
}

const REPEAT_OPTIONS = ["Daily", "Weekly", "Monthly", "Every 2h"];

export default function CreateReminderSheet({ open, onClose }: Props) {
  const [title, setTitle] = useState("");

  const [date, setDate] = useState(new Date());

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [repeat, setRepeat] = useState(false);
  const [repeatLabel, setRepeatLabel] = useState("Daily");

  const [silent, setSilent] = useState(false);

  const reset = () => {
    setTitle("");
    setDate(new Date());
    setRepeat(false);
    setRepeatLabel("Daily");
    setSilent(false);
  };

  async function save() {
    if (!title.trim()) return;

    await reminderActions.add({
      title,
      repeat,
      repeatLabel: repeat ? repeatLabel : undefined,
      silent,
      date: date.toISOString().slice(0, 10),
      time: date.toTimeString().slice(0, 5),
    });

    reset();
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="New Reminder">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Drink Water"
        />

        <Text style={styles.label}>Date</Text>

        <Pressable style={styles.input} onPress={() => setShowDate(true)}>
          <Text>{date.toLocaleDateString()}</Text>
        </Pressable>

        <Text style={styles.label}>Time</Text>

        <Pressable style={styles.input} onPress={() => setShowTime(true)}>
          <Text>
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => setRepeat(!repeat)}>
          <View>
            <Text style={styles.optionTitle}>Repeat</Text>

            <Text style={styles.optionSubtitle}>
              {repeat ? repeatLabel : "Off"}
            </Text>
          </View>

          <Text style={styles.chevron}>›</Text>
        </Pressable>

        {repeat && (
          <View style={styles.chips}>
            {REPEAT_OPTIONS.map((item) => (
              <Pressable
                key={item}
                style={[styles.chip, repeatLabel === item && styles.activeChip]}
                onPress={() => setRepeatLabel(item)}
              >
                <Text
                  style={repeatLabel === item ? styles.activeText : undefined}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <Pressable style={styles.option} onPress={() => setSilent(!silent)}>
          <View>
            <Text style={styles.optionTitle}>Silent Notification</Text>

            <Text style={styles.optionSubtitle}>{silent ? "On" : "Off"}</Text>
          </View>

          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <Pressable style={styles.save} onPress={save}>
          <Text style={styles.saveText}>Save Reminder</Text>
        </Pressable>

        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            minimumDate={new Date()}
            onChange={(_, selected) => {
              setShowDate(false);

              if (!selected) return;

              const updated = new Date(date);

              updated.setFullYear(
                selected.getFullYear(),
                selected.getMonth(),
                selected.getDate(),
              );

              setDate(updated);
            }}
          />
        )}

        {showTime && (
          <DateTimePicker
            value={date}
            mode="time"
            onChange={(_, selected) => {
              setShowTime(false);

              if (!selected) return;

              const updated = new Date(date);

              updated.setHours(selected.getHours());
              updated.setMinutes(selected.getMinutes());

              setDate(updated);
            }}
          />
        )}
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#F4F4F5",
    padding: 14,
    borderRadius: 12,
  },

  row: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },

  chip: {
    backgroundColor: "#F4F4F5",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  activeChip: {
    backgroundColor: "#6366F1",
  },

  activeText: {
    color: "white",
    fontWeight: "700",
  },

  save: {
    backgroundColor: "#6366F1",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 28,
    marginBottom: 20,
  },

  saveText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  option: {
    backgroundColor: "#F4F4F5",
    borderRadius: 14,
    padding: 16,
    marginTop: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  optionSubtitle: {
    marginTop: 4,
    color: "#666",
  },

  chevron: {
    fontSize: 24,
    color: "#999",
  },
});
