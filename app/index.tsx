import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import EnergySheet from "../src/components/energy/EnergySheet";
import PhoneShell from "../src/components/layout/PhoneShell";
import TabSwitch, { TabKey } from "../src/components/layout/TabSwitch";
import TopBar from "../src/components/layout/TopBar";
import CreateReminderSheet from "../src/components/reminder/CreateReminderSheet";
import ReminderCard from "../src/components/reminder/ReminderCard";
import StreakOverlay from "../src/components/streak/StreakOverlay";
import CreateTaskSheet from "../src/components/task/CreateTaskSheet";
import TaskCard from "../src/components/task/TaskCard";
import { useEnergy, useReminders, useTasks, useTodayPlan } from "../src/store";
import { useTheme } from "../src/theme";

export default function HomeScreen() {
  const [openEnergy, setOpenEnergy] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [openReminderSheet, setOpenReminderSheet] = useState(false);
  const [tab, setTab] = useState<TabKey>("tasks");
  const tasks = useTasks();
  const reminders = useReminders();
  const energy = useEnergy();
  const colors = useTheme();
  const todayPlan = useTodayPlan();
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    if (!energy || energy.date !== today) {
      setOpenEnergy(true);
    }
  }, [energy]);
  const activeTasks = tasks.filter((t) => t.percentComplete < 100);
  const completedTasks = tasks
    .filter((t) => t.percentComplete >= 100)
    .sort(
      (a, b) =>
        new Date(b.completedAt ?? "").getTime() -
        new Date(a.completedAt ?? "").getTime(),
    );
  return (
    <PhoneShell>
      <TopBar onEnergyPress={() => setOpenEnergy(true)} />

      <TabSwitch value={tab} onChange={setTab} />

      {tab === "tasks" && (
        <ScrollView
          style={{ flex: 1, marginTop: 20 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 120,
          }}
        >
          <Pressable
            onPress={() => router.push("/analyzing")}
            style={[
              styles.syncCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              🔄 Sync Workspace
            </Text>

            <Text
              style={{
                color: colors.secondary,
                marginTop: 4,
              }}
            >
              Import tasks from Gmail, Calendar, Classroom and Google Tasks.
            </Text>
          </Pressable>

          <View style={{ marginBottom: 18 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: colors.text,
              }}
            >
              🧠 Today's AI Plan
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 14,
                color: colors.secondary,
                lineHeight: 20,
              }}
            >
              Personalized recommendations based on your deadlines, energy and
              workload.
            </Text>
          </View>
          {todayPlan.length === 0 ? (
            <View
              style={[
                styles.emptyCard,
                {
                  backgroundColor: colors.card,
                },
              ]}
            >
              <Text style={{ color: colors.text }}>
                No AI recommendations yet
              </Text>
            </View>
          ) : (
            <>
              {todayPlan.map((task) => (
                <TaskCard
                  key={`plan-${task.task_id}`}
                  task={{
                    id: String(task.task_id),
                    title: task.title,
                    estimatedMinutes: task.duration,
                    completedMinutes: 0,
                    percentComplete: 0,
                    priority: task.priority?.toLowerCase(),
                    createdAt: new Date().toISOString(),
                  }}
                />
              ))}

              <View
                style={{
                  marginTop: 30,
                  marginBottom: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: colors.text,
                  }}
                >
                  📋 All Tasks
                </Text>

                <View
                  style={{
                    backgroundColor: colors.card,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 999,
                  }}
                >
                  <Text
                    style={{
                      color: colors.secondary,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {activeTasks.length} Tasks
                  </Text>
                </View>
              </View>
              {activeTasks.map((task) => (
                <TaskCard key={`task-${task.id}`} task={task} />
              ))}
            </>
          )}
        </ScrollView>
      )}

      {tab === "completed" && (
        <ScrollView
          style={{ flex: 1, marginTop: 20 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 120,
          }}
        >
          <Text style={[styles.heading, { color: colors.text }]}>
            Completed
          </Text>

          {completedTasks.length === 0 ? (
            <View
              style={[
                styles.emptyCard,

                {
                  backgroundColor: colors.card,
                },
              ]}
            >
              <Text style={{ color: colors.text }}>No completed tasks</Text>
            </View>
          ) : (
            completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </ScrollView>
      )}

      {tab === "reminders" && (
        <ScrollView
          style={{ flex: 1, marginTop: 20 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 120,
          }}
        >
          <Text style={[styles.heading, { color: colors.text }]}>
            Reminders
          </Text>

          {reminders.length === 0 ? (
            <View
              style={[
                styles.emptyCard,

                {
                  backgroundColor: colors.card,
                },
              ]}
            >
              <Text style={{ color: colors.text }}>No reminders yet</Text>
            </View>
          ) : (
            reminders.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))
          )}
        </ScrollView>
      )}

      {tab === "tasks" && (
        <>
          <Pressable style={styles.fab} onPress={() => setOpenSheet(true)}>
            <Text style={styles.fabText}>+</Text>
          </Pressable>

          <CreateTaskSheet
            open={openSheet}
            onClose={() => setOpenSheet(false)}
          />
        </>
      )}

      {tab === "reminders" && (
        <>
          <Pressable
            style={styles.fab}
            onPress={() => setOpenReminderSheet(true)}
          >
            <Text style={styles.fabText}>+</Text>
          </Pressable>

          <CreateReminderSheet
            open={openReminderSheet}
            onClose={() => setOpenReminderSheet(false)}
          />
        </>
      )}
      <EnergySheet open={openEnergy} onClose={() => setOpenEnergy(false)} />
      <StreakOverlay />
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 24,
    bottom: 28,

    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: "#6366F1",

    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
  },

  fabText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "300",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  emptyCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  syncCard: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 24,
  },
});
