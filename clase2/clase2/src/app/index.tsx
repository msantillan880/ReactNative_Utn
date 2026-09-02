import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Tarjeta } from "../components/Tarjeta";
import { PeliculaMock, peliculas } from "../data/mock";

export default function Index() {
  // --------------------------------------------------
  // Película actual
  // --------------------------------------------------

  const [peliculaActual, setPeliculaActual] = useState<PeliculaMock | null>(
    null,
  );

  // --------------------------------------------------
  // Pista que se está mostrando
  // 0 = difícil
  // 1 = intermedia
  // 2 = fácil
  // --------------------------------------------------

  const [pistaActual, setPistaActual] = useState(0);

  // --------------------------------------------------
  // Respuesta escrita por el usuario
  // --------------------------------------------------

  const [respuesta, setRespuesta] = useState("");

  // --------------------------------------------------
  // Indica si el usuario acertó
  // --------------------------------------------------

  const [respondida, setRespondida] = useState(false);

  // --------------------------------------------------
  // Películas que ya fueron utilizadas
  // --------------------------------------------------

  const [peliculasUsadas, setPeliculasUsadas] = useState<number[]>([]);

  // --------------------------------------------------
  // Normalizar texto para comparar respuestas
  // --------------------------------------------------

  const normalizarTexto = (texto: string) => {
    return texto
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // --------------------------------------------------
  // Elegir una película al azar
  // --------------------------------------------------

  const elegirPelicula = () => {
    if (peliculas.length === 0) {
      return;
    }

    let disponibles = peliculas.filter(
      (pelicula) => !peliculasUsadas.includes(pelicula.id),
    );

    // Si ya se utilizaron todas, comenzamos nuevamente
    if (disponibles.length === 0) {
      setPeliculasUsadas([]);
      disponibles = peliculas;
    }

    const indiceAleatorio = Math.floor(Math.random() * disponibles.length);

    const nuevaPelicula = disponibles[indiceAleatorio];

    setPeliculaActual(nuevaPelicula);

    setPeliculasUsadas((anteriores) => [...anteriores, nuevaPelicula.id]);

    setPistaActual(0);
    setRespuesta("");
    setRespondida(false);
  };

  // --------------------------------------------------
  // Comprobar respuesta
  // --------------------------------------------------

  const comprobarRespuesta = () => {
    if (!peliculaActual) {
      elegirPelicula();
      return;
    }

    const respuestaUsuario = normalizarTexto(respuesta);
    const tituloCorrecto = normalizarTexto(peliculaActual.titulo);

    // -----------------------------------------------
    // RESPUESTA CORRECTA
    // -----------------------------------------------

    if (respuestaUsuario === tituloCorrecto) {
      setRespondida(true);

      Alert.alert("¡Felicitaciones!", `¡Es ${peliculaActual.titulo}!`);

      return;
    }

    // -----------------------------------------------
    // RESPUESTA INCORRECTA
    // -----------------------------------------------

    if (pistaActual < 2) {
      // Todavía quedan pistas
      setPistaActual(pistaActual + 1);

      setRespuesta("");

      return;
    }

    // -----------------------------------------------
    // FALLÓ LAS TRES PISTAS
    // -----------------------------------------------

    Alert.alert(
      "No es correcto",
      `La película era "${peliculaActual.titulo}".`,
      [
        {
          text: "Siguiente película",
          onPress: elegirPelicula,
        },
      ],
    );
  };

  // --------------------------------------------------
  // Iniciar juego
  // --------------------------------------------------

  const comenzarJuego = () => {
    elegirPelicula();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* ----------------------------------------- */}
          {/* TÍTULO */}
          {/* ----------------------------------------- */}

          <Text style={styles.tituloPrincipal}>Adivine la película</Text>

          {/* ----------------------------------------- */}
          {/* Si todavía no comenzó el juego */}
          {/* ----------------------------------------- */}

          {!peliculaActual && (
            <View style={styles.inicio}>
              <Text style={styles.instrucciones}>
                Se mostrará una pista por vez.
                {"\n\n"}
                Cuantas menos pistas necesites, ¡mejor!
              </Text>

              <TouchableOpacity style={styles.boton} onPress={comenzarJuego}>
                <Text style={styles.botonTexto}>Comenzar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ----------------------------------------- */}
          {/* Juego */}
          {/* ----------------------------------------- */}

          {peliculaActual && (
            <>
              <Tarjeta
                tarjeta={peliculaActual}
                pistaActual={pistaActual}
                respondida={respondida}
              />

              {/* ------------------------------------- */}
              {/* Campo de respuesta */}
              {/* ------------------------------------- */}

              {!respondida && (
                <View style={styles.respuestaContainer}>
                  <Text style={styles.label}>¿Cuál es la película?</Text>

                  <TextInput
                    value={respuesta}
                    onChangeText={setRespuesta}
                    placeholder="Escriba el nombre de la película"
                    style={styles.input}
                    autoCapitalize="none"
                    onSubmitEditing={comprobarRespuesta}
                  />

                  <TouchableOpacity
                    style={styles.boton}
                    onPress={comprobarRespuesta}
                  >
                    <Text style={styles.botonTexto}>Comprobar respuesta</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* ------------------------------------- */}
              {/* Película acertada */}
              {/* ------------------------------------- */}

              {respondida && (
                <TouchableOpacity style={styles.boton} onPress={elegirPelicula}>
                  <Text style={styles.botonTexto}>Siguiente película</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#5092de",
  },

  container: {
    flex: 1,
    padding: 35,
  },

  tituloPrincipal: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },

  inicio: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },

  instrucciones: {
    fontSize: 14,
    lineHeight: 26,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },

  respuestaContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },

  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
    color: "#333",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 10,
  },

  boton: {
    backgroundColor: "#1900ff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
  },

  botonTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});
