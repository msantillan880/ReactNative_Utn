import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { getCurrentLocation } from '../features/location';
import { getGoogleMapsUrl } from '../features/urlopen';
import { registrarSolicitudAyuda } from '../services/api';

// ==========================================
// CONFIGURACIÓN
// ==========================================

// Número que recibirá el SMS.
const DESTINO = '+5492215117448';
//const DESTINO = '+5491121584572';

// Cambiar a false para ocultar el aviso temporal
// cuando ya no sea necesario demostrar el uso de la API.
const MOSTRAR_AVISO_API = true;

// Duración del aviso en milisegundos.
const DURACION_AVISO = 3000;

export default function SendSmsScreen() {

    const theme = useTheme();
    const [aviso, setAviso] = useState('');

    const [mostrarAviso, setMostrarAviso] = useState(false);

    // ==========================================
    // MOSTRAR AVISO TEMPORAL
    // ==========================================

    const mostrarAvisoTemporal = (mensaje: string) => {
        if (!MOSTRAR_AVISO_API) {
            return;
        }

        setAviso(mensaje);
        setMostrarAviso(true);

        // El aviso desaparece automáticamente después de 3 segundos.
        setTimeout(() => {
            setMostrarAviso(false);
        }, DURACION_AVISO);
    };

    // ==========================================
    // ABRIR APLICACIÓN DE MENSAJES
    // ==========================================

    const abrirSMS = async (smsUrl: string) => {
        try {
            await Linking.openURL(smsUrl);
            setTimeout(() => {
                router.replace('/');
            }, 1200);
        } catch (error) {
            console.error('Error al abrir los SMS:', error);
            router.replace('/');
        }
    };

    // ==========================================
    // PROCESO PRINCIPAL DE AYUDA
    // ==========================================

    const sendSMS = async () => {

        try {
            // 1. Obtener la ubicación GPS.
            const location = await getCurrentLocation();

            // 2. Construir el enlace de Google Maps.
            const mapsUrl = getGoogleMapsUrl(
                location.latitude,
                location.longitude
            );

            // 3. Preparar el mensaje.
            const mensaje =
                'Hola, soy Pepe y necesito ayuda. Me perdí.\n\n' +
                'Mi ubicación actual es:\n' +
                mapsUrl +
                '\n\n' +
                `Precisión GPS aproximada: ${location.accuracy !== null
                    ? `${Math.round(location.accuracy)} metros`
                    : 'no disponible'
                }.`;

            // 4. Preparar la URL del SMS.
            const encodedBody = encodeURIComponent(mensaje);

            const separator =
                Platform.OS === 'ios' ? '&' : '?';

            const smsUrl =
                `sms:${DESTINO}${separator}body=${encodedBody}`;

            // 5. Comprobar si se puede abrir la aplicación de mensajes.
            const supported = await Linking.canOpenURL(smsUrl);

            if (!supported) {
                mostrarAvisoTemporal(
                    'No se pudo abrir la aplicación de mensajes.'
                );
                setTimeout(() => router.replace('/'), 1500);
                return;
            }

            // 6. Registrar la solicitud mediante POST.
            let mensajeAviso = '';

            try {
                const registro = await registrarSolicitudAyuda({
                    aplicacion: 'MePerdi',
                    tipo: 'solicitud_ayuda',
                    latitud: location.latitude,
                    longitud: location.longitude,
                    precisionMetros: location.accuracy,
                    fecha: new Date().toISOString(),
                    mapaUrl: mapsUrl,
                });

                console.log(
                    'Registro de prueba creado:',
                    registro.id
                );

                mensajeAviso =
                    `API utilizada correctamente.\n` +
                    `ID recibido: ${registro.id}\n` +
                    `Registro de prueba en JSONPlaceholder.`;

            } catch (error) {
                console.error(
                    'No se pudo registrar la solicitud en la API:',
                    error
                );

                mensajeAviso =
                    'No se pudo utilizar JSONPlaceholder. ' +
                    'Se continuará con el pedido de ayuda.';
            }

            // 7. Mostrar el aviso durante 3 segundos
            // y después abrir automáticamente la aplicación SMS.
            if (MOSTRAR_AVISO_API) {
                mostrarAvisoTemporal(mensajeAviso);

                setTimeout(() => {
                    void abrirSMS(smsUrl);
                }, DURACION_AVISO);

            } else {
                // Cuando se desactive el aviso, se abre el SMS
                // sin esperar esos 3 segundos.
                void abrirSMS(smsUrl);
            }

        } catch (error) {
            console.error('Error al pedir ayuda:', error);

            mostrarAvisoTemporal(
                'No se pudo obtener la ubicación. ' +
                'Verificá los permisos del dispositivo.'
            );

            setTimeout(() => router.replace('/'), 1800);
        }
    };

    // ==========================================
    // EJECUTAR AL ABRIR LA PANTALLA
    // ==========================================

    useEffect(() => {
        void sendSMS();
    }, []);

    // ==========================================
    // INTERFAZ
    // ==========================================

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            <Ionicons
                name="chatbubble-ellipses"
                size={64}
                color={theme.colors.primary}
            />

            <Text style={[styles.title, { color: theme.colors.onBackground }]}>
                Preparando mensaje de ayuda
            </Text>

            <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
                Estamos obteniendo tu ubicación para incluirla
                en el mensaje.
            </Text>

            {mostrarAviso && (
                <View
                    style={[styles.aviso, { backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.outline }]}
                    accessibilityRole="alert"
                    accessibilityLiveRegion="assertive"
                >
                    <Ionicons
                        name="information-circle"
                        size={28}
                        color={theme.colors.onSurfaceVariant}
                    />

                    <Text style={[styles.textoAviso, { color: theme.colors.onSurfaceVariant }]}>
                        {aviso}
                    </Text>
                </View>
            )}

        </View>
    );
}

// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },

    aviso: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        padding: 18,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },

    textoAviso: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
        lineHeight: 23,
    },

});