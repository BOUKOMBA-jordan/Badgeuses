<?php

namespace App\Http\Controllers;

use App\Models\Carte;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarteController extends Controller
{
    public function index()
    {
        $cartes = Carte::all();
        return Inertia::render('Admin/Carte/Index', ['cartes' => $cartes]);
    }

    public function create()
    {
        return Inertia::render('Admin/Carte/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:cartes',
        ]);

        Carte::create($request->all());

        return redirect()->route('admin.carte.index')->with('success', 'Carte créée avec succès.');
    }

    public function show($id)
    {
        $carte = Carte::findOrFail($id);
        return Inertia::render('Admin/Carte/Show', ['carte' => $carte]);
    }

    public function edit($id)
    {
        $carte = Carte::findOrFail($id);
        return Inertia::render('Admin/Carte/Edit', ['carte' => $carte]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'code' => 'required|unique:cartes,code,'.$id,
        ]);

        $carte = Carte::findOrFail($id);
        $carte->update($request->all());

        return redirect()->route('admin.carte.index')->with('success', 'Carte mise à jour avec succès.');
    }

    public function destroy($id)
    {
        $carte = Carte::findOrFail($id);
        $carte->delete();

        return redirect()->route('admin.carte.index')->with('success', 'Carte supprimée avec succès.');
    }
}