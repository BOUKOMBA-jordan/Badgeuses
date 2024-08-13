import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getColor = (value) => {
  if (value < 15) return 'rgba(255,99,132,0.4)'; // Couleur pour trop bas
  if (value < 20) return 'rgba(255,159,64,0.4)'; // Couleur pour bas
  if (value < 25) return 'rgba(255,205,86,0.4)'; // Couleur pour moyen
  return 'rgba(75,192,192,0.4)'; // Couleur pour bon
};

const ApprenantsChart = ({ selectedApprenant }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedApprenant && selectedApprenant.id) {
        try {
          const response = await axios.get(`/api/apprenants/${selectedApprenant.id}/data`);
          console.log('Données reçues :', response.data); // Vérifiez les données reçues
          setData(response.data);
        } catch (error) {
          console.error('Erreur lors du chargement des données du graphique', error.response || error.message);
          setError('Erreur lors du chargement des données');
        } finally {
          setLoading(false);
        }
      } else {
        console.error('ID de l\'apprenant non valide');
      }
    };
  
    fetchData();
  }, [selectedApprenant]);
  

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  // Définir les couleurs des barres en fonction des valeurs
  const backgroundColors = (data.values || []).map(value => getColor(value));

  const chartData = {
    labels: data.labels || [], // Labels des mois
    datasets: [
      {
        label: 'Taux horaire',
        data: data.values || [], // Valeurs des taux horaires pour chaque mois
        backgroundColor: backgroundColors,
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Performance de ${selectedApprenant.nom} ${selectedApprenant.prenom}`,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

ApprenantsChart.propTypes = {
  selectedApprenant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
  }).isRequired,
};

export default ApprenantsChart;
