import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { route } from 'ziggy-js';

const Index = ({ apprenants, disciplines, flash = {} }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Code pour déclencher le chargement des données si nécessaire
        setLoading(!apprenants);
    }, [apprenants]);

    if (loading) {
        return (
            <div className="container mt-5">
                <h1 className="mb-4">Liste des Apprenants</h1>
                <p>Chargement...</p>
            </div>
        );
    }

    // Fonction pour mettre à jour les détails d'un apprenant
    const handleInputChange = (id, field, value) => {
        Inertia.put(route('admin.apprenant.update', id), { [field]: value }, {
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    // Fonction pour supprimer un apprenant
    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet apprenant ?')) {
            Inertia.delete(route('admin.apprenant.destroy', id), {
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: () => alert('Apprenant supprimé avec succès.'),
                onError: () => alert('Erreur lors de la suppression de l\'apprenant.'),
            });
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Liste des Apprenants</h1>

            {flash.success && (
                <div className="alert alert-success">
                    {flash.success}
                </div>
            )}

            <Link href={route('admin.apprenant.create')} className="btn btn-primary mb-3">
                Ajouter un Apprenant
            </Link>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Discipline</th>
                            <th>Numéro de Carte</th>
                            <th>Promotion</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apprenants.map(apprenant => (
                            <tr key={apprenant.id}>
                                <td>{apprenant.nom}</td>
                                <td>{apprenant.prenom}</td>
                                <td>
                                    <select
                                        value={apprenant.discipline_id || ''}
                                        onChange={(e) => handleInputChange(apprenant.id, 'discipline_id', e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">Choisir une discipline</option>
                                        {disciplines.map(discipline => (
                                            <option key={discipline.id} value={discipline.id}>{discipline.nom}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={apprenant.carte_id || ''}
                                        onChange={(e) => handleInputChange(apprenant.id, 'carte_id', e.target.value)}
                                        className="form-control"
                                    />
                                </td>
                                <td>{apprenant.promotion}</td>
                                <td>
                                    <Link href={route('admin.apprenant.edit', apprenant.id)} className="btn btn-sm btn-warning me-2">
                                        Éditer
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(apprenant.id)} 
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
