import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ current_page, last_page, onPageChange }) => {
    return (
        <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(current_page - 1)}
                        disabled={current_page === 1}
                    >
                        Précédent
                    </button>
                </li>
                {Array.from({ length: last_page }, (_, i) => (
                    <li key={i + 1} className={`page-item ${current_page === i + 1 ? 'active' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${current_page === last_page ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(current_page + 1)}
                        disabled={current_page === last_page}
                    >
                        Suivant
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
