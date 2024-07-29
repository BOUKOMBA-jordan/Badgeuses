import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Menu from '@/Pages/Admin/Menu.jsx';
import axios from 'axios';
import DataTable from './Admin/Horaire/DataTable.jsx';  // Importer le composant DataTable
import UsageChart from './Admin/Horaire/UsageChart.jsx';
import ApprenantsSelect from './Admin/Horaire/ApprenantsSelect.jsx';  // Importer le nouveau composant

const Dashboard = ({ auth }) => {
    const [horaireData, setHoraireData] = useState([]);
    const [loadingHoraire, setLoadingHoraire] = useState(true);
    const [errorHoraire, setErrorHoraire] = useState(null);

    useEffect(() => {
        // Charger les données d'horaire
        axios.get('/horaire')
            .then(response => {
                setHoraireData(response.data);
                setLoadingHoraire(false);
            })
            .catch(error => {
                console.error('Il y a eu une erreur lors du chargement des horaires!', error);
                setErrorHoraire('Erreur lors du chargement des horaires');
                setLoadingHoraire(false);
            });
    }, []);

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
            <Head title="Dashboard" />
            <Menu />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Vous êtes connecté !
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Liste des horaires</h2>
                        {loadingHoraire ? (
                            <p>Chargement des données...</p>
                        ) : errorHoraire ? (
                            <p className="text-red-500">{errorHoraire}</p>
                        ) : (
                            <DataTable data={horaireData} />
                        )}
                    </div>
                </div>
            </div>

            {/* Section Liste des apprenants sur le côté */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ApprenantsSelect />
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <UsageChart data={horaireData} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
