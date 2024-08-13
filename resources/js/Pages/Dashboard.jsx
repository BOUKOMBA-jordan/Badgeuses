import React, { useEffect, useState, useCallback } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Menu from '@/Pages/Admin/Menu.jsx';
import axios from 'axios';
import Text from '../Pages/Text';
//import AbsenceCalendar from '../Pages/AbsenceCalendar'; // Assurez-vous que le chemin est correct

const Dashboard = ({ auth }) => {
    const [horaireData, setHoraireData] = useState([]);
    const [loadingHoraire, setLoadingHoraire] = useState(true);
    const [errorHoraire, setErrorHoraire] = useState(null);

    // Etats pour le calendrier d'absences
    const [apprenantId, setApprenantId] = useState('');
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [daysWithoutBadge, setDaysWithoutBadge] = useState([]);

    const fetchHoraireData = useCallback(async () => {
        try {
            const response = await axios.get('/api/horaire');
            setHoraireData(response.data);
        } catch (error) {
            console.error('Il y a eu une erreur lors du chargement des horaires!', error);
            setErrorHoraire('Erreur lors du chargement des horaires');
        } finally {
            setLoadingHoraire(false);
        }
    }, []);

    const fetchDaysWithoutBadge = async (apprenantId, month, year) => {
        if (!apprenantId) return;
        try {
            const response = await axios.get(`/apprenants/${apprenantId}/absences/${month}/${year}`);
            setDaysWithoutBadge(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des jours sans badge:', error);
            setDaysWithoutBadge([]);
        }
    };

    useEffect(() => {
        fetchHoraireData(); // Chargement des horaires seulement
    }, [fetchHoraireData]);

    useEffect(() => {
        fetchDaysWithoutBadge(apprenantId, month, year); // Chargement des jours d'absence lorsque l'apprenant ou la période change
    }, [apprenantId, month, year]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            nav={
                <nav className="space-y-2">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="block rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="block rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="block rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            }
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="FablabMoanda" />

            <Menu />
            <Text />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
