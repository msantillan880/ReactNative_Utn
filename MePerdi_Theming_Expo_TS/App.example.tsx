import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, useTheme } from 'react-native-paper';
import { AccessibilityProvider, useAccessibility } from './src/contexts/AccessibilityContext';
import { AppTheme } from './src/components/AppTheme';
import { AccessibilityToolbar } from './src/components/AccessibilityToolbar';

function ExampleScreen() {
  const theme = useTheme();
  const { fontScale } = useAccessibility();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        <AccessibilityToolbar />
        <View style={styles.card}>
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.onBackground, fontSize: 26 * fontScale, fontWeight: 'bold' }}
          >
            MePerdí
          </Text>
          <Text
            style={{ color: theme.colors.onBackground, fontSize: 18 * fontScale, lineHeight: 28 * fontScale }}
          >
            Un botón de ayuda para avisar a tus personas de confianza.
          </Text>
          <Button
            mode="contained"
            icon="lifebuoy"
            onPress={() => {}}
            accessibilityLabel="Pedir ayuda"
            style={styles.helpButton}
            labelStyle={{ fontSize: 20 * fontScale, fontWeight: 'bold' }}
          >
            Pedir ayuda
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function AppExample() {
  return (
    <AccessibilityProvider>
      <AppTheme>
        <ExampleScreen />
      </AppTheme>
    </AccessibilityProvider>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, padding: 16, gap: 16 },
  card: { padding: 20, gap: 20 },
  helpButton: { minHeight: 60, justifyContent: 'center' },
});
