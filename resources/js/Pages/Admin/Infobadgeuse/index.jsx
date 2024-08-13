import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';  // Importez format depuis date-fns

const Horaire = () => {
  const [horaires, setHoraires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/horaire/index')  // Assurez-vous d'utiliser le bon endpoint
      .then(response => {
        setHoraires(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Il y a eu une erreur lors de la récupération des horaires !");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-5"><h1>Chargement...</h1></div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Liste des Horaires</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Numéro Carte</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Discipline</th>
            <th scope="col">Première Utilisation</th>
            <th scope="col">Dernière Utilisation</th>
          </tr>
        </thead>
        <tbody>
          {horaires.length > 0 ? horaires.map((horaire) => (
            <tr key={horaire.id}>  {/* Utiliser un identifiant unique ici */}
              <td>{horaire.carte_numero}</td>
              <td>{horaire.nom_apprenant}</td>
              <td>{horaire.prenom_apprenant}</td>
              <td>{horaire.discipline}</td>
              <td>{format(new Date(horaire.premiere_utilisation), 'dd/MM/yyyy HH:mm')}</td>
              <td>{format(new Date(horaire.derniere_utilisation), 'dd/MM/yyyy HH:mm')}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" className="text-center">Aucun horaire disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Horaire;
