import React from 'react';
import { useForm } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarteForm = ({ carte }) => {
    const { data, setData, put, post, errors, processing } = useForm({
        numero: carte ? carte.numero : '',
        // Autres champs de la carte à modifier
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = carte ? put : post;
        const routeName = carte ? 'carte.update' : 'carte.store';
        method(route(routeName, carte ? carte.id : undefined), {
            onSuccess: () => {
                // Gérer la réussite de la mise à jour ou de la création
                alert(carte ? 'Carte mise à jour avec succès.' : 'Carte créée avec succès.');
            },
            onError: () => {
                // Gérer les erreurs de mise à jour ou de création
                alert('Erreur lors de la mise à jour ou de la création de la carte.');
            },
            data,
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{carte ? 'Modifier la Carte' : 'Créer une Nouvelle Carte'}</h1>
            <div className="card p-4 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="numero" className="form-label">Numéro de Carte</label>
                        <input
                            id="numero"
                            type="text"
                            className={`form-control ${errors.numero ? 'is-invalid' : ''}`}
                            value={data.numero}
                            onChange={(e) => setData('numero', e.target.value)}
                        />
                        {errors.numero && <div className="invalid-feedback">{errors.numero}</div>}
                    </div>

                    {/* Ajouter d'autres champs de la carte ici */}

                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CarteForm;