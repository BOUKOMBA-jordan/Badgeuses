import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChartComponent from '../Pages/BarChartComponent';
import LineChartComponent from '../Pages/LineChartComponent';
import AbsenceCalendar from '../Pages/AbsenceCalendar';

const App = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [apprenants, setApprenants] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedApprenant, setSelectedApprenant] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch disciplines when the component mounts
  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await axios.get('/api/disciplines');
        setDisciplines(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des disciplines', error);
      }
    };
    fetchDisciplines();
  }, []);

  // Fetch apprenants when the selected discipline changes
  useEffect(() => {
    if (selectedDiscipline) {
      const fetchApprenants = async () => {
        try {
          const response = await axios.get(`/api/apprenants/${selectedDiscipline}`);
          setApprenants(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des apprenants', error);
        }
      };
      fetchApprenants();
    } else {
      setApprenants([]);
    }
  }, [selectedDiscipline]);

  // Fetch data when the selected apprenant, month, or year changes
  useEffect(() => {
    if (selectedApprenant) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.post('/api/apprenant-data', {
            apprenant_id: selectedApprenant,
            month: selectedMonth,
            year: selectedYear,
          });
          const chartData = response.data;

          // Format the data for bar and line charts
          const formattedData = chartData.map(item => {
            const arrivee = new Date(`1970-01-01T${item.heure_arrive}Z`);
            const depart = new Date(`1970-01-01T${item.heure_depart}Z`);
            const tempsPasse = (depart - arrivee) / (1000 * 60 * 60); // Time spent in hours

            return {
              jour: item.jour,
              tempsPasse: tempsPasse.toFixed(2), // Keep two decimal places
              heure_arrive: item.heure_arrive,
              heure_depart: item.heure_depart,
            };
          });

          setBarChartData(formattedData);
          setLineChartData(formattedData);  // Use the same format for both charts
        } catch (error) {
          console.error('Erreur lors de la récupération des données', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [selectedApprenant, selectedMonth, selectedYear]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Analyse des Badgeuses</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            value={selectedDiscipline}
          >
            <option value="">Sélectionner une discipline</option>
            {disciplines.map(discipline => (
              <option key={discipline.id} value={discipline.id}>{discipline.nom}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            onChange={(e) => setSelectedApprenant(e.target.value)}
            value={selectedApprenant}
            disabled={!selectedDiscipline}
          >
            <option value="">Sélectionner un apprenant</option>
            {apprenants.map(apprenant => (
              <option key={apprenant.id} value={apprenant.id}>{apprenant.nom} {apprenant.prenom}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
          >
            {[...Array(12).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('fr-FR', { month: 'long' })}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
          >
            {[2024, 2023, 2022].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mt-5">
          {loading ? <p>Chargement...</p> : <BarChartComponent data={barChartData} />}
        </div>
        <div className="col-12 mt-5">
          {loading ? <p>Chargement...</p> : <LineChartComponent data={lineChartData} />}
        </div>
        <div className="col-12 mt-5">
          {loading ? <p>Chargement...</p> : <AbsenceCalendar apprenantId={selectedApprenant} month={selectedMonth} year={selectedYear} />}
        </div>
      </div>
    </div>
  );
};

export default App;
