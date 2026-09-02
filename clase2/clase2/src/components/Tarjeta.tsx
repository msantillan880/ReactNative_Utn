import React from "react";
import {
  Image,
  ImageSourcePropType,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TarjetaData {
  id: number;
  pistas: string[];
  titulo: string;
  imagen: ImageSourcePropType;
  enlace: string;
}

interface TarjetaProps {
  tarjeta: TarjetaData;
  pistaActual: number;
  respondida: boolean;
}

const Tarjeta = ({ tarjeta, pistaActual, respondida }: TarjetaProps) => {
  const { pistas, titulo, imagen, enlace } = tarjeta;

  return (
    <View style={styles.card}>
      {/* Imagen */}
      {respondida ? (
        <Image source={imagen} resizeMode="contain" style={styles.cardImage} />
      ) : (
        <View style={styles.pregunta}>
          <Text style={styles.signoPregunta}>?</Text>
        </View>
      )}

      {/* Título */}
      {respondida && <Text style={styles.titulo}>{titulo}</Text>}

      {/* Pista */}
      {!respondida && (
        <View style={styles.pistaContainer}>
          <Text style={styles.pistaLabel}>Pista {pistaActual + 1}</Text>
          <Text style={styles.pista}>{pistas[pistaActual]}</Text>
        </View>
      )}

      {/* Enlace */}
      {respondida && (
        <TouchableOpacity
          style={styles.enlaceBoton}
          onPress={() => Linking.openURL(enlace)}
        >
          <Text style={styles.enlaceTexto}>
            Ver información sobre la película
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    padding: 16,
    marginVertical: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  cardImage: {
    width: "90%",
    height: 220,
    backgroundColor: "#e6e6e6",
  },

  pregunta: {
    width: "100%",
    height: 80,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },

  signoPregunta: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    color: "#222",
  },

  pistaContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },

  pistaLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },

  pista: {
    fontSize: 14,
    lineHeight: 24,
    color: "#333",
  },

  enlaceBoton: {
    marginTop: 20,
    backgroundColor: "#1900ff",
    padding: 12,
    borderRadius: 8,
  },

  enlaceTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export { Tarjeta };
