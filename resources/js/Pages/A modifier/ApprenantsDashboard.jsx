import React, { useState, useEffect } from 'react';
import ApprenantsSelect from '../Admin/Infobadgeuse/ApprenantsSelect'; // Ajustez le chemin si nécessaire
import ApprenantsChart from '../A modifier/ApprenantsChart'; // Ajustez le chemin si nécessaire
import axios from 'axios';

const ApprenantsDashboard = () => { // Renommer le composant pour éviter les conflits
  const [apprenants, setApprenants] = useState([]);
  const [selectedApprenant, setSelectedApprenant] = useState(null);

  useEffect(() => {
    const fetchApprenants = async () => {
      try {
        const response = await axios.get('/api/apprenants');
        
        //console.log(response.data);
        if (Array.isArray(response.data)) {

          setApprenants(response.data);
        } else {
          console.error('La réponse API n\'est pas un tableau:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des apprenants', error);
      }
    };
  
    fetchApprenants();
  }, []);
  
  

  return (
    <div>
      <ApprenantsSelect 
        apprenants={apprenants} 
        onChange={id => setSelectedApprenant(apprenants.find(a => a.id === parseInt(id)))}
        
      />
      {selectedApprenant && <ApprenantsChart selectedApprenant={selectedApprenant} />}
    </div>
  );
};

export default ApprenantsDashboard; // Assurez-vous d'exporter sous le bon nom
