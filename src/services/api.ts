const API_URL = "https://jsonplaceholder.typicode.com";

// Datos que vamos a enviar a la API.
export interface SolicitudAyuda {
  aplicacion: string;
  tipo: string;
  latitud: number;
  longitud: number;
  precisionMetros: number | null;
  fecha: string;
  mapaUrl: string;
}

// Respuesta que devuelve JSONPlaceholder.
export interface RespuestaSolicitud {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Registrar una solicitud de ayuda mediante una petición POST.
export async function registrarSolicitudAyuda(
  solicitud: SolicitudAyuda,
): Promise<RespuestaSolicitud> {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title: solicitud.tipo,
      body: JSON.stringify(solicitud),
      userId: 1,
    }),
  });

  // Comprobar si la petición tuvo éxito.
  if (!response.ok) {
    throw new Error(`Error al registrar la solicitud: ${response.status}`);
  }

  // Convertir la respuesta JSON en un objeto TypeScript.
  const data: RespuestaSolicitud = await response.json();

  return data;
}
