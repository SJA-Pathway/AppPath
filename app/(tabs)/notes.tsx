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
import { Note } from "../../src/types";
import Card from "../../src/components/Card";
import EmptyState from "../../src/components/EmptyState";
import Button from "../../src/components/Button";

const NOTE_COLORS = ["#e94560", "#4ade80", "#38bdf8", "#fbbf24", "#a78bfa", "#f472b6"];

export default function NotesScreen() {
  const { colors } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);

  const addNote = () => {
    if (!newTitle.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      color: selectedColor,
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "demo",
    };
    setNotes([note, ...notes]);
    setNewTitle("");
    setNewContent("");
    setSelectedColor(NOTE_COLORS[0]);
    setModalVisible(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const togglePin = (id: string) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
  };

  const sortedNotes = [...notes].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {notes.length === 0 ? (
        <EmptyState
          icon="document-text"
          title="No Notes Yet"
          message="Create your first note to get started"
          actionLabel="Create Note"
          onAction={() => setModalVisible(true)}
        />
      ) : (
        <FlatList
          data={sortedNotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card style={[styles.noteCard, { borderLeftColor: item.color, borderLeftWidth: 4 }]}>
              <View style={styles.noteHeader}>
                <Text style={[styles.noteTitle, { color: colors.text }]} numberOfLines={1}>
                  {item.pinned && "📌 "}
                  {item.title}
                </Text>
                <View style={styles.noteActions}>
                  <TouchableOpacity onPress={() => togglePin(item.id)}>
                    <Ionicons
                      name={item.pinned ? "pin" : "pin-outline"}
                      size={18}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteNote(item.id)} style={{ marginLeft: 12 }}>
                    <Ionicons name="trash-outline" size={18} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
              {item.content ? (
                <Text
                  style={[styles.noteContent, { color: colors.textSecondary }]}
                  numberOfLines={3}
                >
                  {item.content}
                </Text>
              ) : null}
            </Card>
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

      {/* Create Note Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>New Note</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder="Title"
              placeholderTextColor={colors.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                { color: colors.text, borderColor: colors.border },
              ]}
              placeholder="Write your note..."
              placeholderTextColor={colors.textMuted}
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <View style={styles.colorRow}>
              {NOTE_COLORS.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setSelectedColor(c)}
                  style={[
                    styles.colorDot,
                    { backgroundColor: c },
                    selectedColor === c && styles.colorDotSelected,
                  ]}
                />
              ))}
            </View>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="ghost"
                onPress={() => setModalVisible(false)}
              />
              <Button title="Save" onPress={addNote} disabled={!newTitle.trim()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: SPACING.md },
  noteCard: { marginBottom: SPACING.sm },
  noteHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  noteTitle: { fontSize: FONT_SIZE.lg, fontWeight: "700", flex: 1 },
  noteActions: { flexDirection: "row", alignItems: "center" },
  noteContent: { fontSize: FONT_SIZE.sm, marginTop: SPACING.xs, lineHeight: 20 },
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
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
  textArea: { height: 120 },
  colorRow: { flexDirection: "row", gap: 12, marginBottom: SPACING.lg },
  colorDot: { width: 32, height: 32, borderRadius: 16 },
  colorDotSelected: { borderWidth: 3, borderColor: "#fff" },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
});
