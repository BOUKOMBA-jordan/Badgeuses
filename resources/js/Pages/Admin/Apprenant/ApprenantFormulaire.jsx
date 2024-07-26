import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { route } from 'ziggy-js';

const ApprenantForm = ({ apprenant, disciplines = [], cartes = [] }) => {
    const [nom, setNom] = useState(apprenant ? apprenant.nom : '');
    const [prenom, setPrenom] = useState(apprenant ? apprenant.prenom : '');
    const [carte_id, setCarteId] = useState(apprenant ? apprenant.carte_id : '');
    const [promotion, setPromotion] = useState(apprenant ? apprenant.promotion : '');
    const [selectedDiscipline, setSelectedDiscipline] = useState(
        apprenant && apprenant.discipline_id ? apprenant.discipline_id : ''
    );
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const formData = {
            nom,
            prenom,
            carte_id,
            promotion,
            discipline_id: selectedDiscipline,
        };

        if (apprenant && apprenant.id) {
            Inertia.put(route('admin.apprenant.update', apprenant.id), formData, {
                onSuccess: () => {
                    setSuccessMessage('Apprenant mis à jour avec succès.');
                    setIsSubmitting(false);
                },
                onError: (errors) => {
                    console.error(errors);
                    setIsSubmitting(false);
                }
            });
        } else {
            Inertia.post(route('admin.apprenant.store'), formData, {
                onSuccess: () => {
                    setSuccessMessage('Apprenant créé avec succès.');
                    setIsSubmitting(false);
                },
                onError: (errors) => {
                    console.error(errors);
                    setIsSubmitting(false);
                }
            });
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">{apprenant ? 'Modifier' : 'Créer'} un Apprenant</h1>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="carte_id" className="form-label">Carte ID</label>
                    <select
                        id="carte_id"
                        className="form-select"
                        value={carte_id}
                        onChange={(e) => setCarteId(e.target.value)}
                    >
                        <option value="">Choisir un numéro de carte</option>
                        {cartes.length > 0 ? (
                            cartes.map(carte => (
                                <option key={carte.id} value={carte.id}>{carte.numero}</option>
                            ))
                        ) : (
                            <option value="">Aucun numéro de carte disponible</option>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="promotion" className="form-label">Promotion</label>
                    <input
                        type="text"
                        className="form-control"
                        id="promotion"
                        value={promotion}
                        onChange={(e) => setPromotion(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="discipline" className="form-label">Discipline</label>
                    <select
                        id="discipline"
                        className="form-select"
                        value={selectedDiscipline}
                        onChange={(e) => setSelectedDiscipline(e.target.value)}
                    >
                        <option value="">Choisir une discipline</option>
                        {disciplines.length > 0 ? (
                            disciplines.map(discipline => (
                                <option key={discipline.id} value={discipline.id}>{discipline.nom}</option>
                            ))
                        ) : (
                            <option value="">Aucune discipline disponible</option>
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {apprenant ? 'Enregistrer' : 'Créer'}
                </button>
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </form>
        </div>
    );
};

export default ApprenantForm;
