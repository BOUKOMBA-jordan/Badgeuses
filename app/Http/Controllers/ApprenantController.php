<?php

namespace App\Http\Controllers;

use App\Models\Apprenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApprenantController extends Controller
{
    /**
     * Afficher la liste des apprenants.
     */
    public function index()
    {
        $apprenants = Apprenant::with('carte')->get();
        return Inertia::render('Admin/Apprenant/Index', ['apprenants' => $apprenants]);
    }

    /**
     * Afficher le formulaire de création d'un nouvel apprenant.
     */
    public function create()
    {
        return Inertia::render('Admin/Apprenant/Create');
    }

    /**
     * Stocker un nouvel apprenant dans la base de données.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'carte_id' => 'required|exists:cartes,id',
            'promotion' => 'required',
        ]);

        Apprenant::create($request->all());

        return redirect()->route('admin.apprenant.index')->with('success', 'Apprenant créé avec succès.');
    }

    /**
     * Afficher les détails d'un apprenant spécifique.
     */
    public function show($id)
    {
        $apprenant = Apprenant::with('carte')->findOrFail($id);
        return Inertia::render('Admin/Apprenant/Show', ['apprenant' => $apprenant]);
    }

    /**
     * Afficher le formulaire d'édition d'un apprenant spécifique.
     */
    public function edit($id)
    {
        $apprenant = Apprenant::with('carte')->findOrFail($id);
        return Inertia::render('Admin/Apprenant/Edit', ['apprenant' => $apprenant]);
    }

    /**
     * Mettre à jour les informations d'un apprenant spécifique dans la base de données.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'carte_id' => 'required|exists:cartes,id',
            'promotion' => 'required',
        ]);

        $apprenant = Apprenant::findOrFail($id);
        $apprenant->update($request->all());

        return redirect()->route('admin.apprenant.index')->with('success', 'Apprenant mis à jour avec succès.');
    }

    /**
     * Supprimer un apprenant spécifique de la base de données.
     */
    public function destroy($id)
    {
        $apprenant = Apprenant::findOrFail($id);
        $apprenant->delete();

        return redirect()->route('admin.apprenant.index')->with('success', 'Apprenant supprimé avec succès.');
    }
}