import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = ({ disciplines }) => {
    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette discipline ?')) {
            Inertia.delete(route('admin.discipline.destroy', { id }));
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Liste des Disciplines</h1>
            <Link href={route('admin.discipline.create')} className="btn btn-primary mb-3">
                Créer une Nouvelle Discipline
            </Link>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplines.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="text-center">Aucune discipline trouvée</td>
                            </tr>
                        ) : (
                            disciplines.map((discipline) => (
                                <tr key={discipline.id}>
                                    <td>{discipline.nom}</td>
                                    <td>
                                        <Link href={route('admin.discipline.edit', { id: discipline.id })} className="btn btn-sm btn-warning me-2">
                                            Modifier
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(discipline.id)} 
                                            className="btn btn-sm btn-danger">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;