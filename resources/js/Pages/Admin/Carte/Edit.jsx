import React from 'react';
import { useForm } from '@inertiajs/react';

const Edit = ({ carte }) => {
    const { data, setData, put, errors } = useForm({
        numero: carte.numero,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.carte.update', carte.id));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Numero</label>
                <input type="text" className="form-control" value={data.numero} onChange={e => setData('numero', e.target.value)} />
                {errors.numero && <div className="text-danger">{errors.numero}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default Edit;
