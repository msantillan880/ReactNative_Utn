import type { ImageSourcePropType } from "react-native";

interface PeliculaMock {
  id: number;
  pistas: string[];
  titulo: string;
  imagen: ImageSourcePropType;
  enlace: string;
}

const peliculas: PeliculaMock[] = [
  {
    id: 1,

    pistas: [
      "El protagonista intenta recuperar algo que perdió hace mucho tiempo.",
      "La historia transcurre en gran parte durante un viaje que cambiará la vida de sus protagonistas.",
      "Una joven de una familia adinerada se enamora de un joven de una clase social mucho más humilde.",
    ],

    titulo: "Titanic",

    imagen: require("../../../assets/images/mobile/titanic.webp"),

    enlace: "https://es.wikipedia.org/wiki/Titanic_(pel%C3%ADcula_de_1997)",
  },

  {
    id: 2,

    pistas: [
      "El protagonista lleva una vida aparentemente normal, pero algo no encaja.",
      "Una serie de situaciones extrañas hace que comience a cuestionar la realidad que lo rodea.",
      "Un hombre descubre que toda su vida está siendo transmitida como un programa de televisión.",
    ],

    titulo: "The Truman Show",

    imagen: require("../../../assets/images/mobile/TrumanShow.webp"),

    enlace: "https://es.wikipedia.org/wiki/The_Truman_Show",
  },

  {
    id: 3,

    pistas: [
      "Un hombre intenta resolver un misterio relacionado con su propia memoria.",
      "El protagonista tiene dificultades para recordar acontecimientos recientes.",
      "La película cuenta la historia de un hombre que busca al asesino de su esposa mientras su memoria se deteriora.",
    ],

    titulo: "Memento",

    imagen: require("../../../assets/images/mobile/memento.jpeg"),

    enlace: "https://es.wikipedia.org/wiki/Memento",
  },
];

export { peliculas };
export type { PeliculaMock };

