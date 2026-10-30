import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { useAccessibility } from '../contexts/AccessibilityContext';

type Props = {
  compact?: boolean;
};

/**
 * Barra reutilizable. Colocala en un layout/header común para verla en todas
 * las pantallas, o en una pantalla de configuración si preferís menos elementos.
 */
export function AccessibilityToolbar({ compact = false }: Props) {
  const theme = useTheme();
  const {
    themeMode,
    toggleHighContrast,
    fontScale,
    increaseFont,
    decreaseFont,
    resetFont,
  } = useAccessibility();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline },
      ]}
      accessibilityLabel="Opciones de accesibilidad"
    >
      <Button
        mode="outlined"
        icon={themeMode === 'highContrast' ? 'brightness-7' : 'contrast-circle'}
        onPress={toggleHighContrast}
        accessibilityRole="button"
        accessibilityLabel={
          themeMode === 'highContrast'
            ? 'Desactivar alto contraste'
            : 'Activar alto contraste'
        }
        style={styles.themeButton}
        labelStyle={styles.buttonLabel}
      >
        {compact ? (themeMode === 'highContrast' ? 'Contraste normal' : 'Alto contraste') :
          (themeMode === 'highContrast' ? 'Contraste normal' : 'Alto contraste')}
      </Button>

      <View style={styles.fontControls}>
        <IconButton
          icon="format-font-size-decrease"
          size={24}
          onPress={decreaseFont}
          disabled={fontScale <= 0.85}
          accessibilityRole="button"
          accessibilityLabel="Disminuir tamaño del texto"
        />
        <Text
          variant="labelLarge"
          style={{ color: theme.colors.onSurface, minWidth: 42, textAlign: 'center' }}
          accessibilityLabel={`Tamaño del texto ${Math.round(fontScale * 100)} por ciento`}
        >
          {Math.round(fontScale * 100)}%
        </Text>
        <IconButton
          icon="format-font-size-increase"
          size={24}
          onPress={increaseFont}
          disabled={fontScale >= 1.6}
          accessibilityRole="button"
          accessibilityLabel="Aumentar tamaño del texto"
        />
        <IconButton
          icon="restore"
          size={22}
          onPress={resetFont}
          accessibilityRole="button"
          accessibilityLabel="Restablecer tamaño del texto"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 4,
  },
  themeButton: {
    alignSelf: 'flex-start',
    minHeight: 44,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 48,
  },
});
