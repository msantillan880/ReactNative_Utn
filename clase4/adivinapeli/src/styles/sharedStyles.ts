import { StyleSheet } from 'react-native';

export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32
} as const;

export const sharedStyles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.sm,
    backgroundColor: '#F7F9FC'
  },
  card: {
    borderRadius: 16
  },
  section: {
    marginTop: spacing.sm
  },
  centered: {
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    right: spacing.sm,
    bottom: spacing.sm
  }
});
