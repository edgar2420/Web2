import React, { useState, useEffect } from 'react';
import { ApiService } from '../service/Apiservice';
import 'bootstrap/dist/css/bootstrap.min.css';

function ArtistsPage() {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({ nombre: '', imagen: null });
  const [editingArtistId, setEditingArtistId] = useState(null);

  useEffect(() => {
    ApiService.getGenres()
      .then((response) => {
        setGenres(response);
      })
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  const handleGenreChange = async (genreId) => {
    setSelectedGenreId(genreId);
    try {
      const artists = await ApiService.getArtistsByGenre(genreId);
      setArtists(artists);
    } catch (error) {
      console.error('Error fetching artists by genre:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtist({ ...newArtist, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewArtist({ ...newArtist, imagen: e.target.files[0] });
  };

  const handleCreateOrUpdateArtist = async () => {
    if (selectedGenreId) {
      const formData = new FormData();
      formData.append('nombre', newArtist.nombre);
      formData.append('imagen', newArtist.imagen);
      formData.append('generoId', selectedGenreId);

      try {
        if (editingArtistId) {
          await ApiService.updateArtist(editingArtistId, formData);
          setEditingArtistId(null);
        } else {
          await ApiService.createArtist(formData);
        }
        // Recargar los artistas de este género
        const updatedArtists = await ApiService.getArtistsByGenre(selectedGenreId);
        setArtists(updatedArtists);
        setNewArtist({ nombre: '', imagen: null });
      } catch (error) {
        console.error('Error creating/updating artist:', error);
      }
    }
  };

  const handleEditArtist = (artist) => {
    setNewArtist({
      nombre: artist.nombre,
      imagen: null,
    });
    setEditingArtistId(artist.id);
  };

  const handleDeleteArtist = async (artistId) => {
    try {
      await ApiService.deleteArtist(artistId);
      setArtists((prevArtists) => prevArtists.filter((artist) => artist.id !== artistId));
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Artists Management</h2>

      <div className="mb-4">
        <label htmlFor="genreSelect" className="form-label">Select Genre</label>
        <select
          id="genreSelect"
          className="form-select"
          onChange={(e) => handleGenreChange(parseInt(e.target.value))}
          value={selectedGenreId || ''}
        >
          <option value="">-- Select a Genre --</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="nombre"
          placeholder="Artist Name"
          value={newArtist.nombre}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="form-control mb-2"
        />
        <button onClick={handleCreateOrUpdateArtist} className="btn btn-primary">
          {editingArtistId ? 'Update Artist' : 'Create Artist'}
        </button>
      </div>

      {selectedGenreId && (
        <ul className="list-group">
          {artists.length > 0 ? (
            artists.map((artist) => (
              <li key={artist.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={`http://localhost:3000/uploads/${artist.imagen}`}
                    alt={artist.nombre}
                    className="img-thumbnail me-3"
                    style={{ width: '50px', height: '50px' }}
                  />
                  {artist.nombre}
                </div>
                <div>
                  <button onClick={() => handleEditArtist(artist)} className="btn btn-sm btn-warning me-2">Edit</button>
                  <button onClick={() => handleDeleteArtist(artist.id)} className="btn btn-sm btn-danger">Delete</button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">No artists found for this genre.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default ArtistsPage;
