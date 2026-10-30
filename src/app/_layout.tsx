import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibilityToolbar } from '../components/AccessibilityToolbar';
import { AppTheme } from '../components/AppTheme';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';

function RootNavigator() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AccessibilityToolbar />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.onSurface,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: '' }} />
        {/* <Stack.Screen name="index" options={{ title: 'MePerdí' }} /> */}
        <Stack.Screen name="enviarmsj" options={{ title: 'Volver' }} />
        <Stack.Screen name="explicacion" options={{ title: 'Volver' }} />
      </Stack>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <AccessibilityProvider>
      <AppTheme>
        <RootNavigator />
      </AppTheme>
    </AccessibilityProvider>
  );
}