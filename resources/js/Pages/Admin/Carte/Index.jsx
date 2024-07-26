import React, { useState } from "react";
import { Link, Inertia } from "@inertiajs/inertia-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { route } from 'ziggy-js';
import Pagination from './Pagination'; // Importation du composant Pagination

const Index = ({ cartes, search }) => {
    const { data = [], current_page = 1, last_page = 1 } = cartes || {};
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
            Inertia.delete(route('admin.carte.destroy', id), {
                onSuccess: () => {
                    alert('Carte supprimée avec succès.');
                },
                onError: () => {
                    alert('Erreur lors de la suppression de la carte.');
                }
            });
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= last_page) {
            const url = route('admin.carte.index', { page, search: searchTerm });
            console.log('Visiting URL:', url); // Vérifiez que l'URL est correcte
            Inertia.visit(url, {
                only: ['cartes'],
                preserveState: true,
            });
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const url = route('admin.carte.index', { search: value, page: 1 });
        console.log('Visiting URL:', url); // Vérifiez que l'URL est correcte
        Inertia.visit(url, {
            only: ['cartes'],
            preserveState: true,
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Liste des Cartes</h1>

            <div className="mb-3 d-flex justify-content-between align-items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                    placeholder="Rechercher par numéro"
                />
                <Link href={route('admin.carte.create')} className="btn btn-primary ms-3">
                    Ajouter une Carte
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Numéro</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(carte => (
                            <tr key={carte.id}>
                                <td>{carte.numero}</td>
                                <td>
                                    <Link href={route('admin.carte.edit', carte.id)} className="btn btn-sm btn-warning me-2">
                                        Editer
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(carte.id)}
                                        className="btn btn-sm btn-danger">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                current_page={current_page}
                last_page={last_page}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Index;
