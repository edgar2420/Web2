import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ApiService } from '../service/Apiservice';

function GenresPage({ onSelectGenre }) {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({ nombre: '', descripcion: '' });
  const [editingGenre, setEditingGenre] = useState(null); // Nuevo estado para editar un género

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      const genres = await ApiService.getGenres();
      setGenres(genres);
    } catch (error) {
      console.error("Failed to load genres", error);
      alert("Error loading genres. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGenre({ ...newGenre, [name]: value });
  };

  const handleCreateGenre = async () => {
    try {
      await ApiService.createGenre(newGenre);
      setNewGenre({ nombre: '', descripcion: '' });
      loadGenres(); // Refresh the genres list
    } catch (error) {
      console.error("Failed to create genre", error);
      alert("Error creating genre. Please try again.");
    }
  };

  const handleEditClick = (genre) => {
    setEditingGenre(genre); // Establecer el género en modo de edición
    setNewGenre({ nombre: genre.nombre, descripcion: genre.descripcion });
  };

  const handleUpdateGenre = async () => {
    if (editingGenre) {
      try {
        await ApiService.updateGenre(editingGenre.id, newGenre);
        setNewGenre({ nombre: '', descripcion: '' });
        setEditingGenre(null);
        loadGenres();
      } catch (error) {
        console.error("Failed to update genre", error);
        alert("Error updating genre. Please try again.");
      }
    }
  };

  const handleDeleteGenre = async (id) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      try {
        await ApiService.deleteGenre(id);
        loadGenres();
      } catch (error) {
        console.error("Failed to delete genre", error);
        alert("Error deleting genre. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Genres</h2>
      <div className="mb-4">
        <input
          type="text"
          name="nombre"
          placeholder="Genre Name"
          value={newGenre.nombre}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Description"
          value={newGenre.descripcion}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <button
          onClick={editingGenre ? handleUpdateGenre : handleCreateGenre}
          className="btn btn-primary"
        >
          {editingGenre ? 'Update Genre' : 'Create Genre'}
        </button>
        {editingGenre && (
          <button
            onClick={() => {
              setEditingGenre(null);
              setNewGenre({ nombre: '', descripcion: '' });
            }}
            className="btn btn-secondary ms-2"
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="list-group">
        {genres.map((genre) => (
          <li
            key={genre.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {genre.nombre}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEditClick(genre)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => handleDeleteGenre(genre.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

GenresPage.propTypes = {
  onSelectGenre: PropTypes.func.isRequired, // Declara que se espera una función
};

export default GenresPage;
