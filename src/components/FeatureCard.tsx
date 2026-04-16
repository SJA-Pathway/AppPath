import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../constants/theme";
import { useTheme } from "../contexts/ThemeContext";
import { FeatureItem } from "../constants/features";

type FeatureCardProps = {
  feature: FeatureItem;
};

export default function FeatureCard({ feature }: FeatureCardProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    if (feature.status === "ready") {
      router.push(feature.route as any);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={feature.status === "ready" ? 0.7 : 1}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: feature.color + "20" }]}>
        <Ionicons name={feature.icon} size={28} color={feature.color} />
      </View>
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
        {feature.title}
      </Text>
      <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
        {feature.description}
      </Text>
      {feature.status === "coming-soon" && (
        <View style={[styles.badge, { backgroundColor: colors.warning + "20" }]}>
          <Text style={[styles.badgeText, { color: colors.warning }]}>Coming Soon</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.md,
    width: "47%",
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZE.xs,
    lineHeight: 16,
  },
  badge: {
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
});
