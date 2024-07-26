// components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Menu from '@/Pages/Admin/Menu.jsx';
import { useTable } from 'react-table';
import axios from 'axios';
import UsageChart from './Admin/Horaire/UsageChart.jsx';

// Définir les colonnes pour react-table
const columns = [
    { Header: 'Nom', accessor: 'nom' },
    { Header: 'Prénom', accessor: 'prenom' },
    { Header: 'Numéro Carte', accessor: 'carte_numero' },
    { Header: 'Jour', accessor: 'jour' },
    { Header: 'Première Utilisation', accessor: 'premiere_utilisation' },
    { Header: 'Dernière Utilisation', accessor: 'derniere_utilisation' },
    { Header: 'Discipline', accessor: 'discipline' },
];

const Dashboard = ({ auth }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/horaire/detail')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Il y a eu une erreur!', error);
                setError('Erreur lors du chargement des données');
                setLoading(false);
            });

    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

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
                        {loading ? (
                            <p>Chargement des données...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                                            {headerGroup.headers.map(column => (
                                                <th {...column.getHeaderProps()} className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                    {column.render('Header')}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map(row => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()} className="hover:bg-gray-50 transition-colors duration-150">
                                                {row.cells.map(cell => (
                                                    <td {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <UsageChart data={data} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
