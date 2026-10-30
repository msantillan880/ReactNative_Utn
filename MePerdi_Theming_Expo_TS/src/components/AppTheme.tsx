import React from 'react';
import type { PropsWithChildren } from 'react';
import { PaperProvider } from 'react-native-paper';
import { brandHighContrastTheme, brandLightTheme } from '../theme/themes';
import { useAccessibility } from '../contexts/AccessibilityContext';

export function AppTheme({ children }: PropsWithChildren) {
  const { themeMode } = useAccessibility();
  const theme = themeMode === 'highContrast' ? brandHighContrastTheme : brandLightTheme;

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
