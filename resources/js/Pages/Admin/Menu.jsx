// Importez Ziggy-js directement comme un module nommé
import { Ziggy } from 'ziggy-js';

// Utilisation normale de Ziggy comme auparavant
const Menu = () => {
    const { url } = usePage();

    return (
        <nav className="bg-blue-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-center h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch">
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link 
                                    href={Ziggy.route('admin.apprenant')} // Utilisation de Ziggy.route()
                                    className={`text-white hover:bg-blue-700 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium ${url === Ziggy.route('admin.apprenant') ? 'bg-blue-700' : ''}`}>
                                    Apprenants
                                </Link>
                                <Link 
                                    href={Ziggy.route('admin.discipline')} // Utilisation de Ziggy.route()
                                    className={`text-white hover:bg-blue-700 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium ${url === Ziggy.route('admin.discipline') ? 'bg-blue-700' : ''}`}>
                                    Disciplines
                                </Link>
                                <Link 
                                    href={Ziggy.route('admin.carte')} // Utilisation de Ziggy.route()
                                    className={`text-white hover:bg-blue-700 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium ${url === Ziggy.route('admin.carte') ? 'bg-blue-700' : ''}`}>
                                    Carte
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
