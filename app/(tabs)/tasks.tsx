import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/contexts/ThemeContext";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../../src/constants/theme";
import { Task } from "../../src/types";
import EmptyState from "../../src/components/EmptyState";
import Button from "../../src/components/Button";

const PRIORITIES = ["low", "medium", "high"] as const;
const PRIORITY_COLORS = { low: "#4ade80", medium: "#fbbf24", high: "#ef4444" };
const CATEGORIES = ["Personal", "Work", "Health", "Learning", "Other"];

export default function TasksScreen() {
  const { colors } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<Task["priority"]>("medium");
  const [newCategory, setNewCategory] = useState("Personal");

  const addTask = () => {
    if (!newTitle.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTitle,
      completed: false,
      priority: newPriority,
      category: newCategory,
      createdAt: new Date().toISOString(),
      userId: "demo",
    };
    setTasks([task, ...tasks]);
    setNewTitle("");
    setNewPriority("medium");
    setNewCategory("Personal");
    setModalVisible(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Progress bar */}
      {tasks.length > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              {completedCount}/{tasks.length} completed
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.success,
                  width: `${(completedCount / tasks.length) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Filters */}
      {tasks.length > 0 && (
        <View style={styles.filterRow}>
          {(["all", "active", "done"] as const).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterBtn,
                {
                  backgroundColor: filter === f ? colors.primary : colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: filter === f ? "#fff" : colors.textSecondary,
                  fontWeight: "600",
                  fontSize: FONT_SIZE.sm,
                  textTransform: "capitalize",
                }}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {filtered.length === 0 && tasks.length === 0 ? (
        <EmptyState
          icon="checkmark-circle"
          title="No Tasks Yet"
          message="Add your first task and stay productive"
          actionLabel="Add Task"
          onAction={() => setModalVisible(true)}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleTask(item.id)}
              style={[styles.taskItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? colors.success : colors.textMuted}
              />
              <View style={styles.taskContent}>
                <Text
                  style={[
                    styles.taskTitle,
                    { color: colors.text },
                    item.completed && styles.taskDone,
                  ]}
                >
                  {item.title}
                </Text>
                <View style={styles.taskMeta}>
                  <View
                    style={[
                      styles.priorityDot,
                      { backgroundColor: PRIORITY_COLORS[item.priority] },
                    ]}
                  />
                  <Text style={[styles.taskCategory, { color: colors.textMuted }]}>
                    {item.category}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Ionicons name="close-circle-outline" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Add Task Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>New Task</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder="What needs to be done?"
              placeholderTextColor={colors.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={[styles.label, { color: colors.textSecondary }]}>Priority</Text>
            <View style={styles.optionRow}>
              {PRIORITIES.map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setNewPriority(p)}
                  style={[
                    styles.optionBtn,
                    {
                      backgroundColor:
                        newPriority === p ? PRIORITY_COLORS[p] + "30" : colors.surfaceLight,
                      borderColor: newPriority === p ? PRIORITY_COLORS[p] : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: newPriority === p ? PRIORITY_COLORS[p] : colors.textSecondary,
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
            <View style={styles.optionRow}>
              {CATEGORIES.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setNewCategory(c)}
                  style={[
                    styles.optionBtn,
                    {
                      backgroundColor:
                        newCategory === c ? colors.primary + "20" : colors.surfaceLight,
                      borderColor: newCategory === c ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: newCategory === c ? colors.primary : colors.textSecondary,
                      fontWeight: "600",
                      fontSize: FONT_SIZE.sm,
                    }}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Button title="Cancel" variant="ghost" onPress={() => setModalVisible(false)} />
              <Button title="Add Task" onPress={addTask} disabled={!newTitle.trim()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  progressContainer: { padding: SPACING.md, paddingBottom: 0 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progressText: { fontSize: FONT_SIZE.sm },
  progressBar: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  filterRow: { flexDirection: "row", padding: SPACING.md, gap: 8 },
  filterBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  list: { padding: SPACING.md, paddingTop: 0 },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
    gap: 12,
  },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: FONT_SIZE.md, fontWeight: "600" },
  taskDone: { textDecorationLine: "line-through", opacity: 0.5 },
  taskMeta: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 6 },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
  taskCategory: { fontSize: FONT_SIZE.xs },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: {
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  modalTitle: { fontSize: FONT_SIZE.xl, fontWeight: "800", marginBottom: SPACING.md },
  input: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.md,
  },
  label: { fontSize: FONT_SIZE.sm, fontWeight: "600", marginBottom: SPACING.sm },
  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: SPACING.md },
  optionBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
  },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: SPACING.sm },
});
