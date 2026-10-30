import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DESTINO = '+5492215117448';
const MENSAJE = 'Hola, soy pepe me perdí.';

export default function SendSmsScreen() {
    const sendSMS = async () => {
        const encodedBody = encodeURIComponent(MENSAJE);
        const separator = Platform.OS === 'ios' ? '&' : '?';
        const smsUrl = `sms:${DESTINO}${separator}body=${encodedBody}`;

        try {
            const supported = await Linking.canOpenURL(smsUrl);

            if (!supported) {
                Alert.alert('Error', 'No se puede abrir la app de mensajes en este dispositivo.');
                return;
            }

            await Linking.openURL(smsUrl);
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un problema al intentar enviar el mensaje.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Ionicons name="chatbubble-ellipses" size={64} color="#ca96ce" />
            <Text style={styles.title}>Enviar SMS</Text>
            <Text style={styles.subtitle}>Número configurado:</Text>
            <Text style={styles.phone}>{DESTINO}</Text>

            <TouchableOpacity style={styles.button} onPress={sendSMS}>
                <Ionicons name="send" size={20} color="#fff" />
                <Text style={styles.buttonText}>Enviar mensaje</Text>
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
    phone: {
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
        backgroundColor: '#ca96ce',
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
