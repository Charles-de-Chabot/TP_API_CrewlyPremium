import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    // Données simulées pour reproduire la boucle Twig (en attendant l'API)
    const featuredBoats = [
        { id: 1, name: "Spirit of the Sea", type: "Voilier", maxUser: 8 },
        { id: 2, name: "Ocean Runner", type: "Catamaran", maxUser: 12 },
        { id: 3, name: "Blue Horizon", type: "Yacht", maxUser: 6 },
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">
            
            {/* Hero Section */}
            <div className="relative w-full py-24 lg:py-32 overflow-hidden">
                {/* Arrière-plan avec dégradés cohérents avec le thème Login/Register */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#020617] z-0"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent z-0"></div>
                
                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center animate-slideup">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 drop-shadow-2xl">
                        L'aventure commence ici
                    </h1>
                    <p className="mt-4 max-w-2xl text-xl text-slate-400 mb-10">
                        Louez le bateau de vos rêves et partez à la découverte des plus beaux horizons. Simple, rapide et sécurisé.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/boats" 
                            className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1"
                        >
                            Réserver maintenant
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-slate-900/50 relative border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">Pourquoi choisir Crewly ?</h2>
                        <p className="mt-4 text-lg text-slate-400">Nous rendons la location de bateaux accessible à tous.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="text-center p-6 rounded-3xl bg-slate-800/20 border border-white/5 backdrop-blur-sm hover:bg-slate-800/40 transition-colors duration-300">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500/10 text-teal-400 mb-6 mx-auto">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Réservation Facile</h3>
                            <p className="text-slate-400">Quelques clics suffisent pour bloquer vos dates et partir naviguer.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="text-center p-6 rounded-3xl bg-slate-800/20 border border-white/5 backdrop-blur-sm hover:bg-slate-800/40 transition-colors duration-300">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500/10 text-teal-400 mb-6 mx-auto">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Flexibilité</h3>
                            <p className="text-slate-400">Annulation gratuite jusqu'à 48h avant le départ sur la plupart des bateaux.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="text-center p-6 rounded-3xl bg-slate-800/20 border border-white/5 backdrop-blur-sm hover:bg-slate-800/40 transition-colors duration-300">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500/10 text-teal-400 mb-6 mx-auto">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Paiement Sécurisé</h3>
                            <p className="text-slate-400">Transactions cryptées et garanties pour votre tranquillité d'esprit.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Nouveautés */}
            <div className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Nos derniers ajouts</h2>
                            <p className="mt-2 text-slate-400">Embarquez sur nos nouveautés.</p>
                        </div>
                        <Link to="/boats" className="text-teal-400 font-semibold hover:text-teal-300 flex items-center transition-colors duration-200">
                            Tout voir <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredBoats.map((boat) => (
                            <div key={boat.id} className="group bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-teal-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50">
                                <Link to={`/boats/${boat.id}`} className="block relative h-56 overflow-hidden">
                                    {/* Placeholder Image (à remplacer par <img src={...} /> quand l'API sera prête) */}
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                        <span className="text-slate-600 font-medium">Image de {boat.name}</span>
                                    </div>
                                    
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-slate-950/80 backdrop-blur-md text-teal-400 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/20 shadow-lg">
                                            {boat.type}
                                        </span>
                                    </div>
                                </Link>
                                <div className="p-6 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        <Link to={`/boats/${boat.id}`} className="hover:text-teal-400 transition-colors duration-200">{boat.name}</Link>
                                    </h3>
                                    <div className="mt-4 flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-white/5">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                            {boat.maxUser} pers.
                                        </span>
                                        <Link to={`/boats/${boat.id}`} className="font-semibold text-teal-400 hover:text-teal-300 transition-colors">
                                            Voir détails
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
