import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium leading-5 transition duration-300 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-yellow-500 text-white bg-gray-800 shadow-lg hover:bg-gray-700 focus:border-yellow-600 '
                    : 'border-transparent text-gray-300 hover:text-white hover:border-yellow-400 hover:bg-gray-700 focus:text-white focus:border-yellow-500 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
