import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme";

interface Props {
  children: React.ReactNode;
}

export default function PhoneShell({ children }: Props) {
  const colors = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  container: {
    flex: 1,
  },
});
