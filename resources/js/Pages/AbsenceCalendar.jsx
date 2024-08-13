import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import frLocale from '@fullcalendar/core/locales/fr'; // Importer la locale française
import axios from 'axios';

const AbsenceCalendar = ({ apprenantId, month, year }) => {
    const [events, setEvents] = useState([]);
    const [allDays, setAllDays] = useState([]);
    
    useEffect(() => {
        if (apprenantId && month && year) {
            // Calculer les jours du mois
            const getDaysInMonth = (month, year) => {
                const days = [];
                const date = new Date(year, month - 1, 1);
                while (date.getMonth() === month - 1) {
                    days.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }
                return days;
            };
            
            const daysInMonth = getDaysInMonth(month, year);
            setAllDays(daysInMonth.map(date => ({
                title: 'Présence',
                start: date.toISOString().split('T')[0], // Format 'YYYY-MM-DD'
                end: date.toISOString().split('T')[0],
                backgroundColor: 'green',
                borderColor: 'green',
                textColor: 'white'
            })));
            
            axios.get(`/api/apprenants/${apprenantId}/absences/${month}/${year}`)
                .then(response => {
                    const absenceDays = response.data.map(day => day);
                    const absenceEvents = absenceDays.map(date => ({
                        title: 'Absence',
                        start: date,
                        end: date,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        textColor: 'white'
                    }));
                    setEvents(absenceEvents);
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des absences:', error);
                });
        }
    }, [apprenantId, month, year]);

    // Filtrer les jours d'absence
    const filteredDays = allDays.filter(day => 
        !events.some(event => event.start === day.start)
    );

    // Ajouter les jours non-absents comme événements
    const finalEvents = [...events, ...filteredDays];

    return (
        <div>
            <div className="mb-4">
                <h2 className="font-semibold text-lg">Légende</h2>
                <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-red-500 border border-red-700 rounded mr-2"></div>
                    <span>Absence</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 border border-green-700 rounded mr-2"></div>
                    <span>Présence</span>
                </div>
            </div>

            <FullCalendar
                schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin]}
                initialView="dayGridMonth"
                events={finalEvents}
                locale={frLocale} // Configurer la locale française
                eventContent={(eventInfo) => (
                    <div style={{ color: eventInfo.event.extendedProps.textColor }}>
                        {eventInfo.event.title}
                    </div>
                )}
            />
        </div>
    );
};

export default AbsenceCalendar;
