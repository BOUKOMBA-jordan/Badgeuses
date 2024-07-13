import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = ({ cartes }) => {
    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr(e) de vouloir supprimer cette carte ?')) {
            Inertia.delete(route('admin.carte.destroy', id), {
                onSuccess: () => {
                    // Mettre à jour les données après la suppression
                    Inertia.reload();
                },
            });
        }
    };

    // Vérification si cartes est null ou undefined
    if (!cartes) {
        return (
            <div className="container mt-5">
                <h1 className="mb-4">Liste des Cartes</h1>
                <p>Chargement en cours...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Liste des Cartes</h1>
            <Link href={route('admin.carte.create')} className="btn btn-primary mb-3">
                Ajouter une Carte
            </Link>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Numéro</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartes.map(carte => (
                            <tr key={carte.id}>
                                <td>{carte.numero}</td>
                                <td>
                                    <Link href={route('admin.carte.edit', carte.id)} className="btn btn-sm btn-warning me-2">
                                        Modifier
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
        </div>
    );
};

export default Index;
