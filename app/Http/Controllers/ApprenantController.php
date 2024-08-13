<?php

namespace App\Http\Controllers;

use App\Models\Apprenant;
use App\Models\Carte;
use App\Models\Discipline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApprenantController extends Controller
{
    public function index()
    {
        $apprenants = Apprenant::with('discipline')->get();
        $disciplines = Discipline::all();

        return Inertia::render('Admin/Apprenant/Index', [
            'apprenants' => $apprenants,
            'disciplines' => $disciplines,
        ]);
    }

    public function apprenantSelect()
    {
        $apprenants = Apprenant::all();
        return response()->json($apprenants);
    }

    public function create()
    {
        $disciplines = Discipline::all();
        $cartes = Carte::all();

        return Inertia::render('Admin/Apprenant/Create', [
            'disciplines' => $disciplines,
            'cartes' => $cartes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'carte_id' => 'nullable|exists:cartes,id',
            'promotion' => 'nullable|string|max:255',
            'discipline_id' => 'required|exists:disciplines,id',
        ]);

        Apprenant::create($validated);

        return redirect()->route('admin.apprenant.index')->with('success', 'Apprenant créé avec succès.');
    }

    public function show(Apprenant $apprenant)
    {
        return Inertia::render('Admin/Apprenant/Show', [
            'apprenant' => $apprenant,
        ]);
    }

    public function edit(Apprenant $apprenant)
    {
        $disciplines = Discipline::all();
        $cartes = Carte::all();

        return Inertia::render('Admin/Apprenant/Edit', [
            'apprenant' => $apprenant,
            'disciplines' => $disciplines,
            'cartes' => $cartes,
        ]);
    }

    public function update(Request $request, Apprenant $apprenant)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'carte_id' => 'nullable|exists:cartes,id',
            'promotion' => 'nullable|string|max:255',
            'discipline_id' => 'required|exists:disciplines,id',
        ]);

        $apprenant->update($validated);

        return redirect()->route('admin.apprenant.index')->with('success', 'Apprenant mis à jour avec succès.');
    }

    public function destroy(Apprenant $apprenant)
    {
        $apprenant->delete();

        return redirect()->route('admin.apprenant.index')->with('success', 'Apprenant supprimé avec succès.');
    }
}