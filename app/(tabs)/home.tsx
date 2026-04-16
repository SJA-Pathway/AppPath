import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../src/contexts/AuthContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { FEATURES } from "../../src/constants/features";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../../src/constants/theme";
import Card from "../../src/components/Card";
import FeatureCard from "../../src/components/FeatureCard";

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors, toggleTheme, mode } = useTheme();

  const readyFeatures = FEATURES.filter((f) => f.status === "ready");
  const comingSoonFeatures = FEATURES.filter((f) => f.status === "coming-soon");

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    >
      {/* Greeting */}
      <View style={styles.greetingRow}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Good day,</Text>
          <Text style={[styles.name, { color: colors.text }]}>
            {user?.displayName || "Explorer"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeBtn, { backgroundColor: colors.surface }]}
        >
          <Ionicons
            name={mode === "dark" ? "sunny" : "moon"}
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <Card style={styles.statsCard}>
        <Text style={[styles.statsTitle, { color: colors.text }]}>Your Overview</Text>
        <View style={styles.statsRow}>
          <StatItem label="Notes" value="0" icon="document-text" color={colors.primary} />
          <StatItem label="Tasks" value="0" icon="checkmark-circle" color={colors.success} />
          <StatItem label="Chats" value="0" icon="chatbubbles" color={colors.info} />
        </View>
      </Card>

      {/* Active Features */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
      <View style={styles.featureGrid}>
        {readyFeatures.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </View>

      {/* Coming Soon */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Coming Soon</Text>
      <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
        Interns, pick one and build it!
      </Text>
      <View style={styles.featureGrid}>
        {comingSoonFeatures.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </View>

      <View style={{ height: SPACING.xxl }} />
    </ScrollView>
  );
}

function StatItem({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
    paddingTop: SPACING.xxl + SPACING.lg,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT_SIZE.md,
  },
  name: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: "800",
  },
  themeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  statsCard: {
    marginBottom: SPACING.lg,
  },
  statsTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "800",
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "800",
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.md,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
  },
});
