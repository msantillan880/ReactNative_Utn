import type { MD3Theme } from 'react-native-paper';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

/**
 * Paleta de marca personalizada para MePerdí.
 * Alto contraste: fondo casi negro, texto blanco y acento amarillo.
 * Los valores se pueden adaptar a la identidad visual del proyecto.
 */
export const brandLightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#174A7E',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D8E9FA',
    onPrimaryContainer: '#102E4D',
    secondary: '#356859',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#D9F0E8',
    onSecondaryContainer: '#153D32',
    tertiary: '#7A4E00',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFE0A3',
    onTertiaryContainer: '#2A1900',
    background: '#F7F9FC',
    onBackground: '#17212B',
    surface: '#FFFFFF',
    onSurface: '#17212B',
    surfaceVariant: '#E7EDF3',
    onSurfaceVariant: '#394957',
    outline: '#596B79',
    error: '#B3261E',
    onError: '#FFFFFF',
  },
};

export const brandHighContrastTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 12,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FFEB3B',
    onPrimary: '#000000',
    primaryContainer: '#FFF59D',
    onPrimaryContainer: '#000000',
    secondary: '#80DEEA',
    onSecondary: '#000000',
    secondaryContainer: '#B2F5FF',
    onSecondaryContainer: '#000000',
    tertiary: '#FFD180',
    onTertiary: '#000000',
    tertiaryContainer: '#FFE0B2',
    onTertiaryContainer: '#000000',
    background: '#000000',
    onBackground: '#FFFFFF',
    surface: '#000000',
    onSurface: '#FFFFFF',
    surfaceVariant: '#171717',
    onSurfaceVariant: '#FFFFFF',
    outline: '#FFFFFF',
    error: '#FF8A80',
    onError: '#000000',
  },
};
