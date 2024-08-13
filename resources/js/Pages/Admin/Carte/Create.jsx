import React from 'react';
import { useForm } from '@inertiajs/react';

const Create = () => {
    const { data, setData, post, errors } = useForm({
        numero: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.carte.store'), {
            onSuccess: () => {
                alert('Carte créée avec succès.');
            },
            onError: () => {
                alert('Erreur lors de la création de la carte.');
            }
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Créer une Nouvelle Carte</h1>
            <div className="card p-4 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="numero" className="form-label">Numéro</label>
                        <input
                            id="numero"
                            type="text"
                            className={`form-control ${errors.numero ? 'is-invalid' : ''}`}
                            value={data.numero}
                            onChange={e => setData('numero', e.target.value)}
                        />
                        {errors.numero && <div className="invalid-feedback">{errors.numero}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default Create;