<?php

namespace App\Http\Controllers;

use \Log;
use App\Models\Carte;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarteController extends Controller
{
    /**
     * Affiche une liste paginée des cartes avec une option de recherche.
     *
     * @param  Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $cartes = Carte::query()
            ->when($search, function ($query, $search) {
                return $query->where('numero', 'like', "%{$search}%");
            })
            ->paginate(20); // Pagination des cartes

        return Inertia::render('Admin/Carte/Index', [
            'cartes' => $cartes,
            'search' => $search,
        ]);
    }

    /**
     * Affiche le formulaire de création d'une nouvelle carte.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Carte/Create');
    }

    /**
     * Enregistre une nouvelle carte dans la base de données.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $this->validateCarte($request);

        Carte::create($validated);

        return redirect()->route('admin.carte.index')->with('success', 'Carte créée avec succès.');
    }

    /**
     * Affiche les détails d'une carte spécifique.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $carte = Carte::findOrFail($id);

        return Inertia::render('Admin/Carte/Show', ['carte' => $carte]);
    }

    /**
     * Affiche le formulaire d'édition d'une carte existante.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $carte = Carte::findOrFail($id);

        return Inertia::render('Admin/Carte/Edit', ['carte' => $carte]);
    }

    /**
     * Met à jour les informations d'une carte spécifique.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $validated = $this->validateCarte($request, $id);

        $carte = Carte::findOrFail($id);
        $carte->update($validated);

        return redirect()->route('admin.carte.index')->with('success', 'Carte mise à jour avec succès.');
    }

    /**
     * Supprime une carte spécifique de la base de données.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        try {
            $carte = Carte::findOrFail($id); // Trouver la carte ou lancer une exception si elle n'existe pas
            $carte->delete(); // Supprimer la carte
        
            return redirect()->route('admin.carte.index')->with('success', 'Carte supprimée avec succès.');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Carte non trouvée pour la suppression: ' . $e->getMessage()); // Log de l'erreur
            return redirect()->route('admin.carte.index')->with('error', 'Carte non trouvée.');
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression de la carte: ' . $e->getMessage()); // Log de l'erreur
            return redirect()->route('admin.carte.index')->with('error', 'Erreur lors de la suppression de la carte.');
        }
    }

    /**
     * Valide les données de la carte.
     *
     * @param  Request  $request
     * @param  int|null  $id
     * @return array
     */
    private function validateCarte(Request $request, $id = null)
    {
        return $request->validate([
            'numero' => [
                'required',
                'unique:cartes,numero' . ($id ? ',' . $id : ''),
            ],
        ]);
    }
}