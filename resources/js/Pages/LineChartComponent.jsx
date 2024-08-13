import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const LineChartComponent = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                    dataKey="jour" 
                    tickFormatter={(tick) => new Date(tick).toLocaleDateString('fr-FR', { day: '2-digit' })}
                    style={{ fontSize: '12px' }}
                />
                <YAxis 
                    label={{ value: 'Temps passé (heures)', angle: -90, position: 'insideLeft', style: { fontSize: '14px' } }} 
                    style={{ fontSize: '12px' }}
                />
                <Tooltip formatter={(value) => `${value} heures`} />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="tempsPasse" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ stroke: '#8884d8', strokeWidth: 2 }}
                    activeDot={{ r: 8 }} 
                    name="Temps Passé"
                >
                    <LabelList 
                        dataKey="tempsPasse" 
                        formatter={(value) => value > 0 ? `${value} heures` : ''} 
                        position="top" 
                        offset={10}
                        style={{ fontSize: '12px', fill: '#8884d8' }}
                    />
                </Line>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;
