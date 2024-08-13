<?php

namespace App\Http\Controllers;

use App\Models\Apprenant;
use App\Models\Carte;
use App\Models\InfoBadgeuse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class InfoBadgeuseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Peut-être nécessaire pour une vue web
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Peut-être nécessaire pour une vue web
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des données de la requête
        $request->validate([
            'numero' => 'required|string',
        ]);

        try {
            // Récupérer la carte liée au numéro
            $carte = Carte::where('numero', $request->numero)->first();

            if (!$carte) {
                return response()->json(['message' => 'Carte non trouvée'], 404);
            }

            // Debugging
            Log::info('Carte trouvée: ', ['carte' => $carte]);

            // Créer un nouvel enregistrement InfoBadgeuse
            $infoBadgeuse = new InfoBadgeuse([
                'numero' => $request->numero,
            ]);

            $infoBadgeuse->save();

            return response()->json(['message' => 'Enregistrement d\'InfoBadgeuse réussi', 'infoBadgeuse' => $infoBadgeuse]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'enregistrement de l\'InfoBadgeuse: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur interne du serveur'], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Peut-être nécessaire pour une vue web
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Peut-être nécessaire pour une vue web
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Peut-être nécessaire pour une vue web
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Peut-être nécessaire pour une vue web
    }

    /**
     * Get the badge use details.
     */
    public function analytics(Request $request)
    {
        $query = DB::table('info_badgeuses as ib')
            ->join('cartes as c', 'ib.numero', '=', 'c.numero')
            ->join('apprenants as a', 'a.carte_id', '=', 'c.id')
            ->join('disciplines as d', 'a.discipline_id', '=', 'd.id')
            ->select(
                'ib.numero',
                DB::raw('DATE(ib.created_at) as jour'),
                DB::raw('TIME(MIN(ib.created_at)) as heure_arrive'),
                DB::raw('TIME(MAX(ib.created_at)) as heure_depart'),
                'a.nom as nom_apprenant',
                'a.prenom as prenom_apprenant',
                'd.nom as discipline',
                'a.promotion'
            )
            ->groupBy('ib.numero', DB::raw('DATE(ib.created_at)'), 'a.nom', 'a.prenom', 'd.nom', 'a.promotion')
            ->orderBy('ib.numero')
            ->orderBy(DB::raw('DATE(ib.created_at)'))
            ->get();



        return $query;

    }

    public function getBadgeUseDetails(Request $request, $apprenant_id, $month, $year)
    {
        // Récupérer les détails d'utilisation de badge pour un apprenant spécifique sur un mois et une année donnés
        $results = DB::table('info_badgeuses as ib')
            ->join('cartes as c', 'ib.numero', '=', 'c.numero')
            ->join('apprenants as a', 'a.carte_id', '=', 'c.id')
            ->join('disciplines as d', 'a.discipline_id', '=', 'd.id')
            ->select(
                'a.id AS apprenant_id',
                'a.nom AS nom_apprenant',
                'a.prenom AS prenom_apprenant',
                'd.nom AS discipline',
                DB::raw('DATE(ib.created_at) AS jour'),
                DB::raw('TIME(MIN(ib.created_at)) AS heure_arrive'),
                DB::raw('TIME(MAX(ib.created_at)) AS heure_depart'),
                DB::raw('TIMESTAMPDIFF(HOUR, MIN(ib.created_at), MAX(ib.created_at)) AS temps_passe_heures')
            )
            ->whereMonth('ib.created_at', $month) // Mois souhaité
            ->whereYear('ib.created_at', $year) // Année souhaitée
            ->where('a.id', $apprenant_id) // ID de l'apprenant
            ->groupBy('a.id', 'a.nom', 'a.prenom', 'd.nom', DB::raw('DATE(ib.created_at)'))
            ->orderBy(DB::raw('DATE(ib.created_at)'))
            ->orderBy('a.id')
            ->get();

        // Retourner les résultats sous forme de réponse JSON
        return response()->json($results);
    }


    public function getDaysWithoutBadge(Request $request, $apprenant_id, $month, $year)
    {
        // Générer les jours du mois
        $days = [];
        $date = new \DateTime("$year-$month-01");
        $lastDay = $date->format('t'); // Nombre de jours dans le mois

        for ($day = 1; $day <= $lastDay; $day++) {
            $days[] = $date->format('Y-m-d');
            $date->modify('+1 day');
        }

        // Récupérer les jours où l'apprenant a badgé
        $badgeDays = DB::table('info_badgeuses AS ib')
            ->join('cartes AS c', 'ib.numero', '=', 'c.numero')
            ->join('apprenants AS a', 'a.carte_id', '=', 'c.id')
            ->select(DB::raw('DATE(ib.created_at) AS jour'))
            ->where('a.id', $apprenant_id)
            ->whereMonth('ib.created_at', $month)
            ->whereYear('ib.created_at', $year)
            ->groupBy(DB::raw('DATE(ib.created_at)'))
            ->pluck('jour');

        // Stocker les jours où l'apprenant a badgé dans un tableau
        $badgeDaysArray = $badgeDays->toArray();

        // Filtrer les jours sans badge
        $daysWithoutBadge = array_diff($days, $badgeDaysArray);

        // Formater les jours sans badge dans un tableau de dates uniquement
        $daysWithoutBadgeArray = array_values($daysWithoutBadge);

        return response()->json($daysWithoutBadgeArray);
    }













    /* public function getGlobalBadgeStats(Request $request, $month, $year)
     {
         // Récupérer les statistiques globales pour un mois et une année donnés
         $results = DB::table('info_badgeuses as ib')
             ->join('cartes as c', 'ib.numero', '=', 'c.numero')
             ->join('apprenants as a', 'a.carte_id', '=', 'c.id')
             ->join('disciplines as d', 'a.discipline_id', '=', 'd.id')
             ->select(
                 DB::raw('DATE(ib.created_at) AS jour'),
                 DB::raw('MIN(ib.created_at) AS heure_arrive'),
                 DB::raw('MAX(ib.updated_at) AS heure_depart'),
                 DB::raw('TIMESTAMPDIFF(HOUR, MIN(ib.created_at), MAX(ib.updated_at)) AS temps_passe_heures')
             )
             ->whereMonth('ib.created_at', $month) // Mois souhaité
             ->whereYear('ib.created_at', $year) // Année souhaitée
             ->groupBy(DB::raw('DATE(ib.created_at)'))
             ->orderBy(DB::raw('DATE(ib.created_at)'))
             ->get();
     
         // Retourner les résultats sous forme de réponse JSON
         return response()->json($results);
     }*/

}