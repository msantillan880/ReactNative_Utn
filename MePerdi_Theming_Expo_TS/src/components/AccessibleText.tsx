import React from 'react';
import { Text as NativeText, type TextProps, type StyleProp, type TextStyle } from 'react-native';
import { useAccessibility } from '../contexts/AccessibilityContext';

type Props = TextProps & {
  baseFontSize?: number;
  style?: StyleProp<TextStyle>;
};

/** Texto nativo que aplica la escala global elegida por la persona. */
export function AccessibleText({ baseFontSize = 16, style, ...props }: Props) {
  const { fontScale } = useAccessibility();

  return (
    <NativeText
      {...props}
      allowFontScaling
      style={[{ fontSize: baseFontSize * fontScale, color: '#17212B' }, style]}
    />
  );
}
