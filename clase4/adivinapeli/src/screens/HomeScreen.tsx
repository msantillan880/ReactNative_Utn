import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { sharedStyles } from '../styles/sharedStyles';
import type { TabParamList } from '../types/navigation';

type HomeScreenProps = {
  navigation: BottomTabNavigationProp<TabParamList, 'InicioTab'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Card style={[sharedStyles.card, styles.card]}>
        <Card.Content>
          <Text variant="headlineMedium">🎬 Adivina la Película</Text>
          <Text variant="bodyLarge" style={styles.text}>
            Juego de películas con almacenamiento local y CRUD.
          </Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={() => navigation.navigate('JuegoTab')}
          >
            Jugar
          </Button>

          <Button
            mode="outlined"
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={() => navigation.navigate('PeliculasTab')}
          >
            Admin
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...sharedStyles.screen,
    justifyContent: 'flex-start',
    paddingTop: 40
  },
  card: {
    marginTop: 8
  },
  text: {
    marginTop: 12,
    marginBottom: 12
  },
  actions: {
    paddingHorizontal: 12,
    paddingBottom: 12
  },
  button: {
    flex: 1,
    marginHorizontal: 4
  },
  buttonContent: {
    minHeight: 44
  },
  buttonLabel: {
    fontSize: 14,
    lineHeight: 20
  }
});
