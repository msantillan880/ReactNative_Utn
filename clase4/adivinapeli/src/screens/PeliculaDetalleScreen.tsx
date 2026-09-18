import { StyleSheet, View } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Text } from 'react-native-paper';
import { sharedStyles } from '../styles/sharedStyles';
import type { PeliculasStackParamList } from '../types/navigation';

type PeliculaDetalleScreenProps = {
    route: RouteProp<PeliculasStackParamList, 'PeliculaDetalle'>;
    navigation: NativeStackNavigationProp<PeliculasStackParamList, 'PeliculaDetalle'>;
};

export default function PeliculaDetalleScreen({
    route,
    navigation
}: PeliculaDetalleScreenProps) {
    const { pelicula } = route.params;

    return (
        <View style={styles.container}>
            <Card style={sharedStyles.card}>
                <Card.Content>
                    <Text variant="headlineSmall">{pelicula.titulo}</Text>
                    <Text variant="bodyLarge">Año: {pelicula.anio}</Text>
                    <Text variant="bodyLarge">Género: {pelicula.genero}</Text>
                    <Text variant="bodyMedium" style={styles.pista}>
                        Pista: {pelicula.pista}
                    </Text>
                </Card.Content>

                <Card.Actions>
                    <Button onPress={() => navigation.navigate('PeliculaForm', { pelicula })}>
                        Editar
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...sharedStyles.screen
    },
    pista: {
        marginTop: 16
    }
});
