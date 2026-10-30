import { Ionicons } from '@expo/vector-icons';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CASA_LATITUD = -34.928542;
const CASA_LONGITUD = -57.934167;

async function openGoogleMaps(latitude: number, longitude: number): Promise<void> {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    try {
        const supported = await Linking.canOpenURL(url);

        if (!supported) {
            Alert.alert('Error', 'No se puede abrir Google Maps en este dispositivo.');
            return;
        }

        await Linking.openURL(url);
    } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al intentar abrir el mapa.');
        console.error(error);
    }
}

export default function UrlOpenScreen() {
    const handleOpenMap = () => {
        openGoogleMaps(CASA_LATITUD, CASA_LONGITUD);
    };

    return (
        <View style={styles.container}>
            <Ionicons name="map" size={64} color="#96b0ce" />
            <Text style={styles.title}>Abrir Google Maps</Text>
            <Text style={styles.subtitle}>Coordenadas configuradas:</Text>
            <Text style={styles.coords}>{CASA_LATITUD}, {CASA_LONGITUD}</Text>

            <TouchableOpacity style={styles.button} onPress={handleOpenMap}>
                <Ionicons name="navigate" size={20} color="#fff" />
                <Text style={styles.buttonText}>Ir a la ubicación</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    coords: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'monospace',
        marginTop: 8,
        marginBottom: 24,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#4c78a8',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
