<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Horaire;
use App\Models\Apprenant;
use App\Models\Carte;
use App\Models\Discipline;
use Illuminate\Support\Facades\DB;

class HoraireController extends Controller
{
    // Affiche une liste des horaires
    public function index(Request $request)
    {
        $jour = $request->input('jour', '2024-07-01');  // Vous pouvez obtenir la date depuis la requête ou utiliser une valeur par défaut

        $resultats = Horaire::with(['carte.apprenant.discipline'])
            ->where('jour', $jour)
            ->get()
            ->map(function ($horaire) {
                return [
                    'nom_apprenant' => $horaire->carte->apprenant->nom,
                    'prenom_apprenant' => $horaire->carte->apprenant->prenom,
                    'carte_numero' => $horaire->carte->numero,
                    'discipline' => $horaire->carte->apprenant->discipline->nom,
                    'premiere_utilisation' => $horaire->premiere_utilisation,
                    'derniere_utilisation' => $horaire->derniere_utilisation,
                    'jour' => $horaire->jour,
                ];
            });

        return view('horaire.index', compact('resultats'));
    }

    // Affiche le formulaire de création (si nécessaire pour une vue web)
    public function create()
    {
        // Peut-être nécessaire pour une vue web
    }

    // Enregistre un nouvel horaire
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'carte_numero' => 'required|string',
            'jour' => 'required|date',
            'premiere_utilisation' => 'required|date_format:Y-m-d H:i:s',
            'derniere_utilisation' => 'required|date_format:Y-m-d H:i:s',
            'discipline' => 'required|string',
        ]);

        $apprenant = Apprenant::where('nom', $request->nom)
            ->where('prenom', $request->prenom)
            ->first();

        if (!$apprenant) {
            return response()->json(['message' => 'Apprenant non trouvé'], 404);
        }

        $horaire = new Horaire([
            'carte_numero' => $request->carte_numero,
            'jour' => $request->jour,
            'premiere_utilisation' => $request->premiere_utilisation,
            'derniere_utilisation' => $request->derniere_utilisation,
            'discipline' => $request->discipline,
            'apprenant_id' => $apprenant->id,
        ]);

        $horaire->save();

        return response()->json(['message' => 'Horaire enregistré avec succès', 'horaire' => $horaire]);
    }

    // Affiche un horaire spécifique
    public function show($id)
    {
        $horaire = Horaire::with('carte.apprenant.discipline')->find($id);

        if (!$horaire) {
            return response()->json(['message' => 'Horaire non trouvé'], 404);
        }

        return response()->json($horaire);
    }

    // Affiche le formulaire de modification (si nécessaire pour une vue web)
    public function edit($id)
    {
        // Peut-être nécessaire pour une vue web
    }

    // Met à jour un horaire spécifique
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'carte_numero' => 'required|string',
            'jour' => 'required|date',
            'premiere_utilisation' => 'required|date_format:Y-m-d H:i:s',
            'derniere_utilisation' => 'required|date_format:Y-m-d H:i:s',
            'discipline' => 'required|string',
        ]);

        $horaire = Horaire::find($id);

        if (!$horaire) {
            return response()->json(['message' => 'Horaire non trouvé'], 404);
        }

        $apprenant = Apprenant::where('nom', $request->nom)
            ->where('prenom', $request->prenom)
            ->first();

        if (!$apprenant) {
            return response()->json(['message' => 'Apprenant non trouvé'], 404);
        }

        $horaire->update([
            'carte_numero' => $request->carte_numero,
            'jour' => $request->jour,
            'premiere_utilisation' => $request->premiere_utilisation,
            'derniere_utilisation' => $request->derniere_utilisation,
            'discipline' => $request->discipline,
            'apprenant_id' => $apprenant->id,
        ]);

        return response()->json(['message' => 'Horaire mis à jour avec succès', 'horaire' => $horaire]);
    }

    // Supprime un horaire spécifique
    public function destroy($id)
    {
        $horaire = Horaire::find($id);

        if (!$horaire) {
            return response()->json(['message' => 'Horaire non trouvé'], 404);
        }

        $horaire->delete();

        return response()->json(['message' => 'Horaire supprimé avec succès']);
    }

    // Méthode pour obtenir les horaires avec les informations demandées
    public function horaireDetail()
    {
        $horaires = DB::table('horaires as h')
            ->join('apprenants as a', 'h.apprenant_id', '=', 'a.id')
            ->join('disciplines as d', 'a.discipline_id', '=', 'd.id')
            ->select(
                'h.apprenant_id',
                'h.carte_numero',
                DB::raw('DATE(h.jour) as jour'),
                DB::raw('MIN(h.premiere_utilisation) as premiere_utilisation'),
                DB::raw('MAX(h.derniere_utilisation) as derniere_utilisation'),
                'a.nom',
                'a.prenom',
                'd.nom as discipline'
            )
            ->groupBy(
                'h.apprenant_id',
                'h.carte_numero',
                DB::raw('DATE(h.jour)'),
                'a.nom',
                'a.prenom',
                'd.nom'
            )
            ->orderBy('h.apprenant_id')
            ->orderBy('jour')
            ->get();
    
        return response()->json($horaires);
    }
    
}