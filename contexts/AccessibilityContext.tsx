import React, { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

export type AppThemeMode = 'light' | 'highContrast';

type AccessibilityContextValue = {
  themeMode: AppThemeMode;
  toggleHighContrast: () => void;
  fontScale: number;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

const MIN_FONT_SCALE = 0.85;
const MAX_FONT_SCALE = 1.6;
const FONT_STEP = 0.15;

export function AccessibilityProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState<AppThemeMode>('light');
  const [fontScale, setFontScale] = useState(1);

  const value = useMemo<AccessibilityContextValue>(() => ({
    themeMode,
    toggleHighContrast: () => setThemeMode((current) =>
      current === 'highContrast' ? 'light' : 'highContrast'
    ),
    fontScale,
    increaseFont: () => setFontScale((current) =>
      Math.min(MAX_FONT_SCALE, Number((current + FONT_STEP).toFixed(2)))
    ),
    decreaseFont: () => setFontScale((current) =>
      Math.max(MIN_FONT_SCALE, Number((current - FONT_STEP).toFixed(2)))
    ),
    resetFont: () => setFontScale(1),
  }), [themeMode, fontScale]);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe usarse dentro de AccessibilityProvider');
  }
  return context;
}
