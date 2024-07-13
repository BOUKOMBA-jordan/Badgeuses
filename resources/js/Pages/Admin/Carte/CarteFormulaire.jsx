import React from 'react';
import { useForm } from '@inertiajs/react';

const CarteForm = ({ carte }) => {
    const { data, setData, put, errors } = useForm({
        numero: carte ? carte.numero : '',
        // Autres champs de la carte à modifier
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('carte.update', carte.id), {
            onSuccess: () => {
                // Gérer la réussite de la mise à jour
            },
            onError: () => {
                // Gérer les erreurs de mise à jour
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Numéro de carte</label>
                <input
                    type="text"
                    className="form-control"
                    value={data.numero}
                    onChange={(e) => setData('numero', e.target.value)}
                />
                {errors.numero && <div className="text-danger">{errors.numero}</div>}
            </div>
            
            {/* Ajouter d'autres champs de la carte ici */}

            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default CarteForm;
