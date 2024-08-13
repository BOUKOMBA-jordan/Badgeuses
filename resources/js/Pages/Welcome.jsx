import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Bienvenue">
                <link rel="icon" type="image/x-icon" href="/favfablab.png" />
            </Head>
            <div className="bg-gradient-to-r from-blue-900 via-gray-900 to-gray-800 text-white">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-yellow-400 selection:text-gray-900">
                    <div className="relative w-full max-w-4xl px-6 lg:max-w-7xl">
                        <header className="flex flex-col items-center py-8">
                            <h1 className="text-5xl font-extrabold text-yellow-400 mb-8">Badgeuse App</h1>
                        </header>

                        <main className="mt-20 text-center">
                            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                                Simplifiez la gestion des présences
                            </h2>
                            <p className="mt-4 text-lg lg:text-xl text-gray-300">
                                Réalisée par les apprenants du Fablab Moanda.
                            </p>

                            <div className="mt-10 flex justify-center space-x-6">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition"
                                    >
                                        Tableau de bord
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition"
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition"
                                        >
                                            Inscription
                                        </Link>
                                    </>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
