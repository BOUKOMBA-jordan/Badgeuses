<?php

namespace App\Http\Controllers;

use App\Models\Apprenant;
use App\Models\Discipline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApprenantController extends Controller
{
    public function index()
    {
        $apprenants = Apprenant::with('disciplines')->get();
        return Inertia::render('Admin/Apprenant/Index', [
            'apprenants' => $apprenants,
        ]);
    }

    public function create()
    {
        $disciplines = Discipline::all();
        return Inertia::render('Admin/Apprenant/Create', [
            'disciplines' => $disciplines,
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

        $apprenant = Apprenant::create($validated);

        $apprenant->disciplines()->attach($validated['discipline_id']);

        return redirect()->route('admin.apprenant.index');
    }

    public function show(Apprenant $apprenant)
    {
        return Inertia::render('Admin/Apprenant/Show', [
            'apprenant' => $apprenant
        ]);
    }

    public function edit(Apprenant $apprenant)
    {
        return Inertia::render('Admin/Apprenant/Edit', [
            'apprenant' => $apprenant
        ]);
    }

    public function update(Request $request, Apprenant $apprenant)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'carte_id' => 'nullable|exists:cartes,id',
            'promotion' => 'nullable|string|max:255',
        ]);

        $apprenant->update($validated);

        return redirect()->route('admin.apprenant.index');
    }

    public function destroy(Apprenant $apprenant)
    {
        $apprenant->delete();

        return redirect()->route('admin.apprenant.index');
    }
}