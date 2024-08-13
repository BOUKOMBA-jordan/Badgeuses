import React, { useEffect } from 'react';

// Assurez-vous que le CDN CanvasJS est chargé dans votre fichier HTML principal
const BarChartComponent = ({ data }) => {
    useEffect(() => {
        if (window.CanvasJS) {
            const chart = new window.CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Tableau de Bord"
                },
                axisX: {
                    title: "Jours",
                    reversed: false
                },
                axisY: {
                    title: "Heures",
                    labelFormatter: addHoursFormatter
                },
                data: [
                    {
                        type: "column", // Utiliser "column" pour un graphique à barres verticales
                        name: "Heure d'Arrivée",
                        showInLegend: true,
                        dataPoints: data.map(item => ({
                            label: item.jour, // Le jour est sur l'axe des X
                            y: parseFloat(item.heure_arrive) // Heure d'arrivée en ordonnée
                        }))
                    },
                    {
                        type: "column", // Utiliser "column" pour un graphique à barres verticales
                        name: "Heure de Départ",
                        showInLegend: true,
                        dataPoints: data.map(item => ({
                            label: item.jour, // Le jour est sur l'axe des X
                            y: parseFloat(item.heure_depart) // Heure de départ en ordonnée
                        }))
                    }
                ]
            });

            chart.render();

            function addHoursFormatter(e) {
                // Formatter les heures en format 'HH:MM'
                const hours = Math.floor(e.value);
                const minutes = Math.round((e.value - hours) * 60);
                return `${hours}h ${minutes}m`;
            }
        }
    }, [data]);

    return (
        <main className='main-container'>
            <div className='main-title mt-5'>
                <h3>Les heures d'arrivée et de départ de l'apprenant</h3>
            </div>

            <div className='charts mt-5'>
                <div id="chartContainer" style={{ height: 300, width: "100%" }}></div>
            </div>
        </main>
    );
};

export default BarChartComponent;
