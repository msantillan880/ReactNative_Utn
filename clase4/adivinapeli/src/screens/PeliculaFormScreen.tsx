import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, TextInput } from 'react-native-paper';
import { agregarPelicula, actualizarPelicula } from '../storage/peliculaStorage';
import { sharedStyles } from '../styles/sharedStyles';
import type { Pelicula } from '../types/pelicula';
import type { PeliculasStackParamList } from '../types/navigation';

type PeliculaFormScreenProps = {
    route: RouteProp<PeliculasStackParamList, 'PeliculaForm'>;
    navigation: NativeStackNavigationProp<PeliculasStackParamList, 'PeliculaForm'>;
};

export default function PeliculaFormScreen({
    route,
    navigation
}: PeliculaFormScreenProps) {
    const pelicula = route.params?.pelicula;

    const [titulo, setTitulo] = useState(pelicula?.titulo ?? '');
    const [anio, setAnio] = useState(pelicula?.anio ?? '');
    const [genero, setGenero] = useState(pelicula?.genero ?? '');
    const [pista, setPista] = useState(pelicula?.pista ?? '');

    async function guardar() {
        if (!titulo.trim()) {
            return;
        }

        const datos: Pelicula = {
            id: pelicula?.id ?? Date.now().toString(),
            titulo: titulo.trim(),
            anio: anio.trim(),
            genero: genero.trim(),
            pista: pista.trim()
        };

        if (pelicula) {
            await actualizarPelicula(datos);
        } else {
            await agregarPelicula(datos);
        }

        navigation.goBack();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                label="Título"
                value={titulo}
                onChangeText={setTitulo}
                mode="outlined"
                style={styles.input}
            />

            <TextInput
                label="Año"
                value={anio}
                onChangeText={setAnio}
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                label="Género"
                value={genero}
                onChangeText={setGenero}
                mode="outlined"
                style={styles.input}
            />

            <TextInput
                label="Pista para el juego"
                value={pista}
                onChangeText={setPista}
                mode="outlined"
                multiline
                style={styles.input}
            />

            <Button mode="contained" onPress={() => void guardar()} disabled={!titulo.trim()}>
                Guardar película
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...sharedStyles.screen
    },
    input: {
        marginBottom: 16
    }
});
