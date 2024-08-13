<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Horaire;
use App\Models\Apprenant;
use App\Models\Carte;
//use App\Models\Discipline;
use App\Models\InfoBadgeuse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HoraireController extends Controller
{
    // Affiche une liste des horaires
    public function index(Request $request)
    {
        $debut = '2024-07-01';
        $fin = '2024-07-31';

        try {
            $resultats = Horaire::with(['carte.apprenant.discipline'])
                ->whereBetween('jour', [$debut, $fin])
                ->orderBy('jour')
                ->get();

            if ($resultats->isEmpty()) {
                return response()->json(['message' => 'Aucun horaire trouvé'], 404);
            }

            $formattedResults = $resultats->map(function ($horaire) {
                return [
                    'nom_apprenant' => $horaire->carte->apprenant->nom ?? 'N/A',
                    'prenom_apprenant' => $horaire->carte->apprenant->prenom ?? 'N/A',
                    'carte_numero' => $horaire->carte->numero ?? 'N/A',
                    'discipline' => $horaire->carte->apprenant->discipline->nom ?? 'N/A',
                    'premiere_utilisation' => $horaire->premiere_utilisation,
                    'derniere_utilisation' => $horaire->derniere_utilisation,
                    'jour' => $horaire->jour->format('d-m-Y'),
                ];
            });

            return response()->json($formattedResults);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des horaires: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur interne du serveur'], 500);
        }
    }

    // Enregistre un nouvel horaire
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'carte_numero' => 'required|string|exists:cartes,numero',
            'jour' => 'required|date',
            'premiere_utilisation' => 'required|date_format:Y-m-d H:i:s',
            'derniere_utilisation' => 'required|date_format:Y-m-d H:i:s',
            'discipline_id' => 'required|exists:disciplines,id',
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
            'discipline_id' => $request->discipline_id,
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

    // Met à jour un horaire spécifique
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'carte_numero' => 'required|string|exists:cartes,numero',
            'jour' => 'required|date',
            'premiere_utilisation' => 'required|date_format:Y-m-d H:i:s',
            'derniere_utilisation' => 'required|date_format:Y-m-d H:i:s',
            'discipline_id' => 'required|exists:disciplines,id',
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
            'discipline_id' => $request->discipline_id,
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

    // Affiche les détails des horaires
    public function horaireDetail()
    {
        try {
            $horaires = Horaire::with(['apprenant.discipline'])
                ->select(
                    'carte_numero',
                    'jour',
                    DB::raw('MIN(premiere_utilisation) as premiere_utilisation'),
                    DB::raw('MAX(derniere_utilisation) as derniere_utilisation'),
                    'apprenant_id',
                    'discipline_id'
                )
                ->groupBy(
                    'carte_numero',
                    'jour',
                    'apprenant_id',
                    'discipline_id'
                )
                ->orderBy('jour')
                ->get()
                ->map(function ($horaire) {
                    return [
                        'nom_apprenant' => $horaire->apprenant->nom ?? 'N/A',
                        'prenom_apprenant' => $horaire->apprenant->prenom ?? 'N/A',
                        'carte_numero' => $horaire->carte_numero,
                        'discipline' => $horaire->discipline->nom ?? 'N/A',
                        'premiere_utilisation' => $horaire->premiere_utilisation,
                        'derniere_utilisation' => $horaire->derniere_utilisation,
                        'jour' => $horaire->jour,
                    ];
                });

            if ($horaires->isEmpty()) {
                return response()->json(['message' => 'Aucun horaire trouvé'], 404);
            }

            return response()->json($horaires);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des détails des horaires: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur interne du serveur'], 500);
        }
    }

    // Enregistre un nouvel horaire basé sur la carte
    public function enregistrerHoraire(Request $request)
    {
        echo $request;
        
        /*$request->validate([
            'numero' => 'required',
            
            
        ]);
        
        
        try {
            // Récupérer la carte liée au numéro
            $carte = Carte::where('numero', $request->numero)->first();
            echo $carte;
          

            if (!$carte) {
                return response()->json(['message' => 'Carte non trouvée'], 404);
            }

            // Créer un nouvel horaire
            $horaire = new InfoBadgeuse([
                'numero' => $request->carte_numero,
                
                
            ]);

            $horaire->save();

            return response()->json(['message' => 'Horaire enregistré avec succès', 'horaire' => $horaire]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'enregistrement de l\'horaire: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur interne du serveur'], 500);
        }*/
    }
}