import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import type { Pelicula } from '../types/pelicula';

type PeliculaCardProps = {
    pelicula: Pelicula;
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

export default function PeliculaCard({
    pelicula,
    onPress,
    onEdit,
    onDelete
}: PeliculaCardProps) {
    return (
        <Card style={styles.card} onPress={onPress}>
            <Card.Content>
                <Text variant="titleLarge">{pelicula.titulo}</Text>
                <Text variant="bodyMedium">
                    {pelicula.anio} · {pelicula.genero}
                </Text>
            </Card.Content>

            <Card.Actions>
                <Button onPress={onEdit}>Editar</Button>
                <Button textColor="#B3261E" onPress={onDelete}>
                    Eliminar
                </Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 12
    }
});
