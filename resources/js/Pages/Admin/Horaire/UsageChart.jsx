// components/Charts/UsageChart.jsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UsageChart = ({ data }) => {
    // Formater les données pour le graphique
    const formattedData = data.map(item => ({
        jour: new Date(item.jour).toLocaleDateString(),
        premiere_utilisation: new Date(item.premiere_utilisation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        derniere_utilisation: new Date(item.derniere_utilisation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        discipline: item.discipline,
    }));

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Variation des taux horaires</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="jour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="premiere_utilisation" stroke="#8884d8" dot={false} />
                    <Line type="monotone" dataKey="derniere_utilisation" stroke="#82ca9d" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsageChart;
