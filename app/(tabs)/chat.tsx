import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../src/contexts/AuthContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../../src/constants/theme";
import { ChatMessage } from "../../src/types";

export default function ChatScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Welcome to AppPath Chat! This is a demo. Connect Firebase Firestore to enable real-time messaging.",
      senderId: "system",
      senderName: "AppPath Bot",
      createdAt: new Date().toISOString(),
      roomId: "general",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      senderId: user?.uid || "demo",
      senderName: user?.displayName || "You",
      createdAt: new Date().toISOString(),
      roomId: "general",
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    // TODO: Save to Firestore for real-time sync
    // import { addDoc, collection, serverTimestamp } from "firebase/firestore";
    // await addDoc(collection(db, "rooms", roomId, "messages"), { ...msg, createdAt: serverTimestamp() });
  };

  const isOwnMessage = (msg: ChatMessage) => msg.senderId === (user?.uid || "demo");

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => {
          const own = isOwnMessage(item);
          return (
            <View style={[styles.msgRow, own && styles.msgRowOwn]}>
              {!own && (
                <View style={[styles.avatar, { backgroundColor: colors.primary + "30" }]}>
                  <Text style={{ color: colors.primary, fontWeight: "700" }}>
                    {item.senderName[0]}
                  </Text>
                </View>
              )}
              <View
                style={[
                  styles.bubble,
                  own
                    ? { backgroundColor: colors.primary }
                    : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
                ]}
              >
                {!own && (
                  <Text style={[styles.senderName, { color: colors.primary }]}>
                    {item.senderName}
                  </Text>
                )}
                <Text style={{ color: own ? "#fff" : colors.text, fontSize: FONT_SIZE.md }}>
                  {item.text}
                </Text>
                <Text
                  style={[
                    styles.timestamp,
                    { color: own ? "rgba(255,255,255,0.6)" : colors.textMuted },
                  ]}
                >
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <View style={[styles.inputBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TextInput
          style={[styles.textInput, { color: colors.text }]}
          placeholder="Type a message..."
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.sendBtn, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  messageList: { padding: SPACING.md, paddingBottom: SPACING.sm },
  msgRow: { flexDirection: "row", marginBottom: SPACING.sm, alignItems: "flex-end" },
  msgRowOwn: { justifyContent: "flex-end" },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  bubble: {
    maxWidth: "75%",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  senderName: { fontSize: FONT_SIZE.xs, fontWeight: "700", marginBottom: 2 },
  timestamp: { fontSize: 10, marginTop: 4, alignSelf: "flex-end" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.sm,
    borderTopWidth: 1,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
});
