<?php

namespace App\Http\Controllers;

use App\Models\Discipline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisciplineController extends Controller
{
    public function index()
    {
        $disciplines = Discipline::all();
        return Inertia::render('Admin/Discipline/Index', ['disciplines' => $disciplines]);
    }

    public function create()
    {
        return Inertia::render('Admin/Discipline/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|unique:disciplines',
           
        ]);

        Discipline::create($request->all());

        return redirect()->route('admin.discipline.index')->with('success', 'Discipline créée avec succès.');
    }

    public function show($id)
    {
        $discipline = Discipline::findOrFail($id);
        return Inertia::render('Admin/Discipline/Show', ['discipline' => $discipline]);
    }

    public function edit($id)
    {
        $discipline = Discipline::findOrFail($id);
        return Inertia::render('Admin/Discipline/Edit', ['discipline' => $discipline]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required|unique:disciplines,nom,'.$id,
            
        ]);

        $discipline = Discipline::findOrFail($id);
        $discipline->update($request->all());

        return redirect()->route('admin.discipline.index')->with('success', 'Discipline mise à jour avec succès.');
    }

    public function destroy($id)
    {
        $discipline = Discipline::findOrFail($id);
        $discipline->delete();

        return redirect()->route('admin.discipline.index')->with('success', 'Discipline supprimée avec succès.');
    }
}