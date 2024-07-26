import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Horaire = () => {
  const [horaires, setHoraires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/horaire/index')  // Assurez-vous d'utiliser le bon endpoint
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
            <th>Numéro Carte</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Discipline</th>
            <th>Dernière Utilisation</th>
            <th>Heures</th>
          </tr>
        </thead>
        <tbody>
          {horaires.length > 0 ? horaires.map((horaire) => (
            <tr key={horaire.id}>  {/* Utiliser un identifiant unique ici si disponible */}
              <td>{horaire.carte_numero}</td>
              <td>{horaire.nom}</td>
              <td>{horaire.prenom}</td>
              <td>{horaire.discipline}</td>
              <td>{new Date(horaire.dernier_utilisation).toLocaleDateString()} {new Date(horaire.dernier_utilisation).toLocaleTimeString()}</td>
              <td>
                {horaire.heures && horaire.heures.length > 0 ? horaire.heures.map((heure, heureIndex) => (
                  <div key={heureIndex}>{new Date(heure).toLocaleDateString()} {new Date(heure).toLocaleTimeString()}</div>
                )) : 'Aucune heure enregistrée'}
              </td>
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
