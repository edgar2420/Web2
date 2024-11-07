// src/pages/GeneroDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../service/Apiservice";
import "./GeneroDetail.css"; // Asegúrate de crear este archivo para estilos

function GeneroDetail() {
  const { generoId } = useParams(); // Obtener el ID del género desde los parámetros de la URL
  const [artists, setArtists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        // Obtener el nombre del género
        const genreData = await ApiService.getGenreById(generoId);
        setGenre(genreData);

        // Obtener artistas del género
        const artistsData = await ApiService.getArtistsByGenre(generoId);
        setArtists(artistsData);
      } catch (error) {
        console.error("Error fetching genre details:", error);
      }
    };

    fetchGenreDetails();
  }, [generoId]);

  return (
    <div className="genero-detail">
      <header className="genero-header">
        <h1>{genre ? genre.nombre : "Género"}</h1>
        <p>{genre ? genre.descripcion : "Descripción del género"}</p>
      </header>

      <div className="artist-list">
        {artists.length > 0 ? (
          artists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <div className="artist-image-container">
                <img
                  src={`http://localhost:3000/uploads/${artist.imagen}`}
                  alt={artist.nombre}
                  className="artist-image"
                />
              </div>
              <div className="artist-info">
                <h2>{artist.nombre}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>No hay artistas disponibles para este género.</p>
        )}
      </div>
    </div>
  );
}

export default GeneroDetail;
