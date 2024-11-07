import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3000';

// Función para manejar errores de las llamadas a la API
const handleError = (error) => {
  console.error("API call failed: ", error);
  throw error;
};

// Objeto `ApiService` que contiene métodos para interactuar con la API
export const ApiService = {
  // Método para obtener todos los géneros
  getGenres: async () => {
    try {
      const response = await axios.get(`${API_URL}/genero`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para obtener artistas por género
  getArtistsByGenre: async (genreId) => {
    try {
      const response = await axios.get(`${API_URL}/artista/genero/${genreId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para obtener todos los artistas, incluyendo el género
  getArtists: async () => {
    try {
      const response = await axios.get(`${API_URL}/artista?includeGenre=true`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para obtener las canciones de un artista específico
  getSongsByArtist: async (artistId) => {
    try {
      const response = await axios.get(`${API_URL}/artista/${artistId}/songs`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para obtener álbumes por género
  getAlbumsByGenre: async (genreId) => {
    try {
      const response = await axios.get(`${API_URL}/genero/${genreId}/albums`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener álbumes por género:", error);
      throw error;
    }
  },

  // Método para obtener álbumes de un artista por su ID
  getAlbumsByArtist: async (artistId) => {
    try {
      const response = await axios.get(`${API_URL}/album/artist/${artistId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para obtener un género específico por ID
  getGenreById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/genero/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching genre by ID:", error);
      throw error;
    }
  },

  // Método para obtener un artista específico por su ID
  getArtistById: async (artistId) => {
    try {
      const response = await axios.get(`${API_URL}/artista/${artistId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para obtener canciones por un álbum específico
  getSongsByAlbum: async (albumId) => {
    try {
      const response = await axios.get(`${API_URL}/album/${albumId}/songs`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para crear un nuevo género
  createGenre: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/genero`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para crear un nuevo artista
  createArtist: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/artista`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para crear un nuevo álbum
  createAlbum: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/album`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para obtener todos los álbumes
  getAlbums: async () => {
    try {
      const response = await axios.get(`${API_URL}/album`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para obtener un álbum específico por su ID
  getAlbumById: async (albumId) => {
    try {
      const response = await axios.get(`${API_URL}/album/${albumId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para crear una canción en un álbum específico
  createSong: async (albumId, data) => {
    try {
      const response = await axios.post(`${API_URL}/album/${albumId}/songs`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para actualizar un género existente
  updateGenre: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/genero/${id}`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para actualizar un artista existente
  updateArtist: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/artista/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para actualizar un álbum existente
  updateAlbum: async (id, data) => {
    console.log("Sending update for album with ID:", id);
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`); // Verificar datos en FormData
    }

    try {
      const response = await axios.put(`${API_URL}/album/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para actualizar una canción existente
  updateSong: async (albumId, songId, data) => {
    try {
      const response = await axios.put(`${API_URL}/album/${albumId}/songs/${songId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para eliminar un género
  deleteGenre: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/genero/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para eliminar un artista
  deleteArtist: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/artista/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para eliminar un álbum
  deleteAlbum: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/album/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para eliminar una canción
  deleteSong: async (albumId, songId) => {
    try {
      const response = await axios.delete(`${API_URL}/album/${albumId}/songs/${songId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Método para realizar una búsqueda global
  search: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { q: query },
      });
      console.log("Resultados recibidos en el frontend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en la llamada API de búsqueda:", error);
      throw error;
    }
  },
};
