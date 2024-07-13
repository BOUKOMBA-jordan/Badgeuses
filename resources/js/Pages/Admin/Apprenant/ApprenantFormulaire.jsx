import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { route } from 'ziggy-js';

const ApprenantForm = ({ apprenant, disciplines }) => {
    const [nom, setNom] = useState(apprenant ? apprenant.nom : '');
    const [prenom, setPrenom] = useState(apprenant ? apprenant.prenom : '');
    const [carte_id, setCarteId] = useState(apprenant ? apprenant.carte_id : '');
    const [promotion, setPromotion] = useState(apprenant ? apprenant.promotion : '');
    const [selectedDiscipline, setSelectedDiscipline] = useState(
        apprenant && apprenant.disciplines && apprenant.disciplines.length > 0
            ? apprenant.disciplines[0].id
            : ''
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nom,
            prenom,
            carte_id,
            promotion,
            discipline_id: selectedDiscipline,
        };

        if (apprenant && apprenant.id) {
            Inertia.put(route('admin.apprenant.update', { id: apprenant.id }), formData);
        } else {
            Inertia.post(route('admin.apprenant.store'), formData);
        }
    };

    useEffect(() => {
        if (apprenant && apprenant.disciplines && apprenant.disciplines.length > 0) {
            setSelectedDiscipline(apprenant.disciplines[0].id);
        }
    }, [apprenant]);

    // Vérifiez si disciplines est défini avant de le mapper
    if (!disciplines) return null;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{apprenant ? 'Modifier' : 'Créer'} un apprenant</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input type="text" className="form-control" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="carte_id" className="form-label">Carte ID</label>
                    <input type="text" className="form-control" id="carte_id" value={carte_id} onChange={(e) => setCarteId(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="promotion" className="form-label">Promotion</label>
                    <input type="text" className="form-control" id="promotion" value={promotion} onChange={(e) => setPromotion(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="discipline" className="form-label">Discipline</label>
                    <select
                        id="discipline"
                        className="form-control"
                        value={selectedDiscipline}
                        onChange={(e) => setSelectedDiscipline(e.target.value)}
                    >
                        {disciplines.map(discipline => (
                            <option key={discipline.id} value={discipline.id}>{discipline.nom}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">{apprenant ? 'Enregistrer' : 'Créer'}</button>
            </form>
        </div>
    );
};


export default ApprenantForm;
