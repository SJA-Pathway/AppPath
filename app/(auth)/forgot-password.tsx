import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/contexts/ThemeContext";
import { FONT_SIZE, SPACING } from "../../src/constants/theme";
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    // TODO: Implement with Firebase Auth
    // import { sendPasswordResetEmail } from "firebase/auth";
    // await sendPasswordResetEmail(auth, email);
    setSent(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Ionicons name="key" size={56} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>

        {sent ? (
          <>
            <Ionicons
              name="checkmark-circle"
              size={64}
              color={colors.success}
              style={{ marginVertical: SPACING.lg }}
            />
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              If an account exists for {email}, you'll receive a password reset link shortly.
            </Text>
            <Button title="Back to Login" onPress={() => router.back()} style={styles.button} />
          </>
        ) : (
          <>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            <Input
              label="Email"
              icon="mail"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Button
              title="Send Reset Link"
              onPress={handleReset}
              disabled={!email}
              size="lg"
              style={styles.button}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  backButton: {
    marginTop: SPACING.xxl,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: "800",
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  message: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  button: {
    width: "100%",
    marginTop: SPACING.sm,
  },
});
