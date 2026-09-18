import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FAB, Text } from 'react-native-paper';
import PeliculaCard from '../components/PeliculaCard';
import { eliminarPelicula, obtenerPeliculas } from '../storage/peliculaStorage';
import { sharedStyles } from '../styles/sharedStyles';
import type { Pelicula } from '../types/pelicula';
import type { PeliculasStackParamList } from '../types/navigation';

type PeliculasScreenProps = {
    navigation: NativeStackNavigationProp<PeliculasStackParamList, 'PeliculasLista'>;
};

export default function PeliculasScreen({ navigation }: PeliculasScreenProps) {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);

    const cargarPeliculas = useCallback(async () => {
        const datos = await obtenerPeliculas();
        setPeliculas(datos);
    }, []);

    useFocusEffect(
        useCallback(() => {
            void cargarPeliculas();
        }, [cargarPeliculas])
    );

    async function borrar(id: string) {
        const nuevas = await eliminarPelicula(id);
        setPeliculas(nuevas);
    }

    return (
        <View style={styles.container}>
            {peliculas.length === 0 ? (
                <Text>No hay películas cargadas.</Text>
            ) : (
                <FlatList
                    data={peliculas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PeliculaCard
                            pelicula={item}
                            onPress={() => navigation.navigate('PeliculaDetalle', { pelicula: item })}
                            onEdit={() => navigation.navigate('PeliculaForm', { pelicula: item })}
                            onDelete={() => {
                                void borrar(item.id);
                            }}
                        />
                    )}
                />
            )}

            <FAB
                icon="plus"
                label="Nueva"
                style={styles.fab}
                onPress={() => navigation.navigate('PeliculaForm')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...sharedStyles.screen
    },
    fab: {
        ...sharedStyles.fab
    }
});
