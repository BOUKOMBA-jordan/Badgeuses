import React from 'react';
import { useForm } from '@inertiajs/react';

const Edit = ({ carte }) => {
    const { data, setData, put, errors } = useForm({
        code: carte.code,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.carte.update', carte.id));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Code</label>
                <input type="text" className="form-control" value={data.code} onChange={e => setData('code', e.target.value)} />
                {errors.code && <div className="text-danger">{errors.code}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default Edit;
