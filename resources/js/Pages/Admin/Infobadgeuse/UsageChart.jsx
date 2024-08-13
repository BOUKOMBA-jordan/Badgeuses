import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Fonction pour convertir le temps en minutes
const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Fonction pour calculer la différence en minutes entre deux temps
const calculateTimeDifference = (start, end) => {
    const startMinutes = convertToMinutes(start);
    const endMinutes = convertToMinutes(end);
    return endMinutes - startMinutes;
};

const UsageChart = ({ data }) => {
    // Formater les données pour le graphique
    const formattedData = data.map(item => {
        const premiereUtilisationTime = new Date(item.premiere_utilisation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const derniereUtilisationTime = new Date(item.derniere_utilisation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
            apprenant: `${item.nom_apprenant} ${item.prenom_apprenant}`, // Inclure le nom complet de l'apprenant
            jour: new Date(item.jour).toLocaleDateString(),
            taux_horaire: calculateTimeDifference(premiereUtilisationTime, derniereUtilisationTime), // Calcul du taux horaire
            discipline: item.discipline,
        };
    });

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Variation des taux horaires</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={formattedData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="apprenant" tick={{ angle: -45, textAnchor: 'end' }} />
                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => `${value} minutes`} />
                    <Legend />
                    <Bar dataKey="taux_horaire" fill="#8884d8" name="Taux Horaire" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsageChart;
