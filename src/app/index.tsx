import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useAccessibility } from '../contexts/AccessibilityContext';

export default function HomeScreen() {
  const theme = useTheme();
  const { fontScale } = useAccessibility();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentWrap}>
        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.onBackground,
            fontSize: 28 * fontScale,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          MePerdí
        </Text>

        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 16 * fontScale,
            textAlign: 'center',
            lineHeight: 24 * fontScale,
          }}
        >
          Botón de ayuda, al presionarlo se enviará un mensaje a tus contactos de confianza con tu ubicación, ellos te van ayudar a regresar.
        </Text>

        <Button
          mode="contained"
          icon="lifebuoy"
          onPress={() => router.push('/enviarmsj')}
          style={[styles.helpButton, { alignSelf: 'center' }]}
          labelStyle={{ fontSize: 20 * fontScale, fontWeight: '700' }}
          accessibilityLabel="Pedir ayuda"
        >
          Pedir ayuda
        </Button>

        <Button
          mode="outlined"
          icon="information-outline"
          onPress={() => router.push('/explicacion')}
          style={[styles.secondaryButton, { alignSelf: 'center' }]}
          accessibilityLabel="Ir a la pantalla de explicación"
        >
          Ver explicación
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentWrap: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  helpButton: {
    minHeight: 56,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
  },
  secondaryButton: {
    minHeight: 52,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
  },
});