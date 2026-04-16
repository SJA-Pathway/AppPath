import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../src/contexts/AuthContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../../src/constants/theme";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors, toggleTheme, mode } = useTheme();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const menuItems: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
    color?: string;
  }[] = [
    { icon: "person-outline", label: "Edit Profile", onPress: () => {} },
    { icon: "notifications-outline", label: "Notifications", onPress: () => {} },
    {
      icon: mode === "dark" ? "sunny-outline" : "moon-outline",
      label: `${mode === "dark" ? "Light" : "Dark"} Mode`,
      onPress: toggleTheme,
    },
    { icon: "shield-outline", label: "Privacy", onPress: () => {} },
    { icon: "help-circle-outline", label: "Help & Support", onPress: () => {} },
    { icon: "information-circle-outline", label: "About", onPress: () => {} },
    { icon: "log-out-outline", label: "Logout", onPress: handleLogout, color: colors.error },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    >
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + "20" }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {(user?.displayName || "U")[0].toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>
          {user?.displayName || "User"}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {user?.email || "user@example.com"}
        </Text>
      </View>

      {/* Menu */}
      <View style={[styles.menu, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {menuItems.map((item, i) => (
          <TouchableOpacity
            key={item.label}
            onPress={item.onPress}
            style={[
              styles.menuItem,
              i < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
          >
            <Ionicons name={item.icon} size={22} color={item.color || colors.text} />
            <Text
              style={[
                styles.menuLabel,
                { color: item.color || colors.text },
              ]}
            >
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.version, { color: colors.textMuted }]}>LifeHub v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: SPACING.lg, paddingTop: SPACING.xxl + SPACING.lg },
  avatarSection: { alignItems: "center", marginBottom: SPACING.xl },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  avatarText: { fontSize: FONT_SIZE.hero, fontWeight: "800" },
  name: { fontSize: FONT_SIZE.xl, fontWeight: "800" },
  email: { fontSize: FONT_SIZE.md, marginTop: 2 },
  menu: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    gap: 14,
  },
  menuLabel: { flex: 1, fontSize: FONT_SIZE.md, fontWeight: "500" },
  version: { textAlign: "center", marginTop: SPACING.xl, fontSize: FONT_SIZE.sm },
});
