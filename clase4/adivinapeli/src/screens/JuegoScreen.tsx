import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { obtenerPeliculas } from '../storage/peliculaStorage';
import { sharedStyles } from '../styles/sharedStyles';
import type { Pelicula } from '../types/pelicula';

export default function JuegoScreen() {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [pelicula, setPelicula] = useState<Pelicula | null>(null);
    const [respuesta, setRespuesta] = useState('');
    const [mensaje, setMensaje] = useState('');

    const cargar = useCallback(async () => {
        const datos = await obtenerPeliculas();
        setPeliculas(datos);

        if (datos.length > 0) {
            setPelicula(datos[Math.floor(Math.random() * datos.length)]);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            void cargar();
        }, [cargar])
    );

    function nuevaPelicula() {
        if (!peliculas.length) {
            return;
        }

        const nueva = peliculas[Math.floor(Math.random() * peliculas.length)];

        setPelicula(nueva);
        setRespuesta('');
        setMensaje('');
    }

    function comprobar() {
        if (!pelicula) {
            return;
        }

        if (respuesta.trim().toLowerCase() === pelicula.titulo.trim().toLowerCase()) {
            setMensaje('¡Correcto! 🎉');
        } else {
            setMensaje('No es correcto. ¡Intenta nuevamente!');
        }
    }

    if (!pelicula) {
        return (
            <View style={styles.container}>
                <Text>No hay películas disponibles.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Card style={sharedStyles.card}>
                <Card.Content>
                    <Text variant="headlineSmall">¿Qué película es?</Text>

                    <Text variant="bodyLarge" style={styles.pista}>
                        Pista: {pelicula.pista}
                    </Text>

                    <TextInput
                        label="Tu respuesta"
                        value={respuesta}
                        onChangeText={setRespuesta}
                        mode="outlined"
                        style={styles.input}
                    />

                    {mensaje ? <Text variant="titleMedium">{mensaje}</Text> : null}
                </Card.Content>

                <Card.Actions>
                    <Button mode="contained" onPress={comprobar}>
                        Comprobar
                    </Button>
                    <Button onPress={nuevaPelicula}>Otra</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...sharedStyles.screen,
        justifyContent: 'center'
    },
    pista: {
        marginTop: 16,
        marginBottom: 20
    },
    input: {
        marginBottom: 16
    }
});
