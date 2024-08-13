<?php

namespace App\Http\Controllers;

use App\Models\Apprenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

//use App\Models\Horaire;
//use Illuminate\Http\Request;

class ApiController extends Controller
{
    /*public function getApprenants()
    {
        try {
            $apprenants = Apprenant::all();
            //echo $apprenants;
            return response()->json($apprenants);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des apprenants : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération des apprenants'], 500);
        }
    }*/
    public function getApprenantData(Request $request)
    {
        try {
            $apprenantId = $request->input('apprenant_id');
            $month = $request->input('month');
            $year = $request->input('year');

            $data = DB::table('info_badgeuses as ib')
                ->join('cartes as c', 'ib.numero', '=', 'c.numero')
                ->join('apprenants as a', 'a.carte_id', '=', 'c.id')
                ->select(
                    DB::raw('DATE(ib.created_at) as jour'),
                    DB::raw('MIN(TIME(ib.created_at)) as heure_arrive'),
                    DB::raw('MAX(TIME(ib.created_at)) as heure_depart')
                )
                ->whereMonth('ib.created_at', $month)
                ->whereYear('ib.created_at', $year)
                ->where('a.id', $apprenantId)
                ->groupBy(DB::raw('DATE(ib.created_at)'))
                ->orderBy(DB::raw('DATE(ib.created_at)'))
                ->get();

            return response()->json($data);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des données : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération des données'], 500);
        }
    }


    public function getDisciplines()
    {
        try {
            $disciplines = DB::table('disciplines')->get();
            return response()->json($disciplines);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des disciplines : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération des disciplines'], 500);
        }
    }

    public function getApprenantsByDiscipline($disciplineId)
    {
        try {
            $apprenants = Apprenant::where('discipline_id', $disciplineId)->get();
            return response()->json($apprenants);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des apprenants : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération des apprenants'], 500);
        }
    }

}