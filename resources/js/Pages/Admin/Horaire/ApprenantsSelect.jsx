import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './DataTable'; // Assurez-vous que DataTable est configuré pour afficher les apprenants

const ApprenantsList = () => {
    const [apprenants, setApprenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Récupérer la liste des apprenants pour le select
        axios.get('/apprenants')
            .then(response => {
                setApprenants(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des apprenants:', error);
                setError('Erreur lors du chargement des apprenants');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Liste des Apprenants</h2>
            {loading ? (
                <p>Chargement des données...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    {/* Afficher la liste des apprenants dans un select */}
                    <div className="mb-4">
                        <label htmlFor="apprenant-select" className="block text-gray-700">Sélectionner un Apprenant</label>
                        <select id="apprenant-select" className="form-select mt-1 block w-full">
                            {apprenants.map(apprenant => (
                                <option key={apprenant.id} value={apprenant.id}>
                                    {apprenant.nom} {apprenant.prenom}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Vous pouvez aussi afficher le tableau des apprenants ici */}
                    <DataTable data={apprenants} />
                </>
            )}
        </div>
    );
};

export default ApprenantsList;
