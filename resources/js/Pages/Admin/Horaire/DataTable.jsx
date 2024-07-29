import React from 'react';
import { useTable } from 'react-table';

const columns = [
    { Header: 'Nom', accessor: 'nom_apprenant' }, // Modifié pour correspondre aux données renvoyées
    { Header: 'Prénom', accessor: 'prenom_apprenant' }, // Modifié pour correspondre aux données renvoyées
    { Header: 'Numéro Carte', accessor: 'carte_numero' },
    { Header: 'Jour', accessor: 'jour' },
    { Header: 'Première Utilisation', accessor: 'premiere_utilisation' },
    { Header: 'Dernière Utilisation', accessor: 'derniere_utilisation' },
    { Header: 'Discipline', accessor: 'discipline' },
];

const DataTable = ({ data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
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
    );
};

export default DataTable;
