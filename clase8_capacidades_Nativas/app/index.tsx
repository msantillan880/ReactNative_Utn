import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Cada "id" coincide con el nombre de un archivo dentro de /app
// (camera.tsx -> /camera). Agregar una tarjeta nueva = agregar un objeto acá.
const capabilities = [
  {
    id: "camera",
    title: "Cámara",
    icon: "camera",
    color: "#FF6B6B",
    description: "Tomar fotos",
  },
  {
    id: "sensors",
    title: "Sensores",
    icon: "phone-portrait",
    color: "#45B7D1",
    description: "Acelerómetro y giroscopio",
  },
  {
    id: "location",
    title: "Ubicación",
    icon: "location",
    color: "#96CEB4",
    description: "GPS del dispositivo",
  },
  {
    id: "urlopen",
    title: "Browser",
    icon: "logo-chrome",
    color: "#96b0ce",
    description: "Abrir URLs en el navegador",
  },
  {
    id: "enviarmsj",
    title: "Enviar Mensaje",
    icon: "mail",
    color: "#ca96ce",
    description: "Enviar un mensaje de texto",
  }
];

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Capacidades nativas</Text>
        <Text style={styles.subtitle}>Seleccioná una capacidad para probarla</Text>
      </View>

      <View style={styles.grid}>
        {capabilities.map((capability) => (
          <TouchableOpacity
            key={capability.id}
            style={[styles.card, { borderLeftColor: capability.color }]}
            onPress={() => router.push(`/${capability.id}` as any)}
          >
            <Ionicons name={capability.icon as any} size={32} color={capability.color} />
            <Text style={styles.cardTitle}>{capability.title}</Text>
            <View style={styles.cardDescriptionWrap}>
              <Text numberOfLines={3} ellipsizeMode="tail" style={styles.cardDescription}>
                {capability.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  grid: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  cardDescriptionWrap: {
    width: 92,
    alignItems: "flex-end",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    lineHeight: 16,
  },
});
