import React, { useState, useEffect } from 'react';
import { ApiService } from '../service/Apiservice';
import AlbumsTable from './AlbumsTable';

function AlbumsPage() {
  const [artists, setArtists] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    titulo: '',
    descripcion: '',
    imagen: null,
  });
  const [editingAlbumId, setEditingAlbumId] = useState(null);

  // Cargar los artistas
  useEffect(() => {
    ApiService.getArtistsByGenre(1)
      .then((response) => setArtists(response))
      .catch((error) => console.error('Error fetching artists:', error));
  }, []);

  // Cargar álbumes cuando se selecciona un artista
  useEffect(() => {
    if (selectedArtistId) {
      setLoading(true);
      ApiService.getAlbumsByArtist(selectedArtistId)
        .then((response) => {
          setAlbums(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching albums:', error);
          setLoading(false);
        });
    } else {
      setAlbums([]);
    }
  }, [selectedArtistId]);

  // Manejar cambio en el input de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlbum({ ...newAlbum, [name]: value });
  };

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    setNewAlbum({ ...newAlbum, imagen: e.target.files[0] });
  };

  // Manejar cambio de selección de artista
  const handleArtistChange = (e) => {
    const artistId = parseInt(e.target.value, 10);
    if (artistId !== selectedArtistId) {
      setSelectedArtistId(artistId);
      setEditingAlbumId(null);
      setNewAlbum({ titulo: '', descripcion: '', imagen: null });
    }
  };

  // Crear o actualizar un álbum
  const handleCreateOrUpdateAlbum = async () => {
    const formData = new FormData();
    formData.append('titulo', newAlbum.titulo);
    formData.append('descripcion', newAlbum.descripcion);
    if (newAlbum.imagen) formData.append('imagen', newAlbum.imagen);
  
    console.log('Data enviada al backend:', Array.from(formData.entries()));
  
    try {
      if (editingAlbumId) {
        const updatedAlbum = await ApiService.updateAlbum(editingAlbumId, formData);
        setAlbums((prevAlbums) =>
          prevAlbums.map((album) =>
            album.id === editingAlbumId ? updatedAlbum : album
          )
        );
        setEditingAlbumId(null);
      } else {
        const createdAlbum = await ApiService.createAlbum(formData);
        setAlbums((prevAlbums) => [...prevAlbums, createdAlbum]);
      }
      setNewAlbum({ titulo: '', descripcion: '', imagen: null });
    } catch (error) {
      console.error('Error creando/actualizando álbum:', error);
    }
  };

  // Editar un álbum
  const handleEditAlbum = (album) => {
    setNewAlbum({
      titulo: album.titulo,
      descripcion: album.descripcion,
      imagen: null,
    });
    setEditingAlbumId(album.id);
  };

  // Eliminar un álbum
  const handleDeleteAlbum = async (albumId) => {
    try {
      await ApiService.deleteAlbum(albumId);
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== albumId));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Albums by Artist</h2>

      {/* Selección de Artista */}
      <div className="mb-4">
        <label htmlFor="artistSelect" className="form-label">Select Artist</label>
        <select
          id="artistSelect"
          className="form-select"
          onChange={handleArtistChange}
          value={selectedArtistId || ''}
        >
          <option value="">-- Select an Artist --</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Formulario para Nuevo Álbum */}
      <div className="mb-4">
        <input
          type="text"
          name="titulo"
          placeholder="Album Title"
          value={newAlbum.titulo}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <textarea
          name="descripcion"
          placeholder="Album Description"
          value={newAlbum.descripcion}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="form-control mb-2"
        />
        <button onClick={handleCreateOrUpdateAlbum} className="btn btn-primary">
          {editingAlbumId ? 'Update Album' : 'Create Album'}
        </button>
      </div>

      {/* Cargando... */}
      {loading ? (
        <p>Loading albums...</p>
      ) : (
        <AlbumsTable albums={albums} onEdit={handleEditAlbum} onDelete={handleDeleteAlbum} />
      )}
    </div>
  );
}

export default AlbumsPage;


