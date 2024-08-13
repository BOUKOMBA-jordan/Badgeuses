<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ApprenantController;

//use App\Http\Controllers\HoraireController;
use App\Http\Controllers\InfoBadgeuseController;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




// Route pour obtenir les détails des horaires
Route::get('/horaire', [InfoBadgeuseController::class, 'analytics']);

//Route::get('/ApprenantsSelect', [ApprenantController::class, 'getApprenantsSelect']);


Route::get('/apprenants', [ApiController::class, 'getApprenants']);

//Route::get('/apprenants/{id}/data', [ApiController::class, 'getApprenantData']);



// Route pour recevoir les données de la badgeuse
Route::post('/horaire', [InfoBadgeuseController::class, 'store']);
Route::get('/disciplines', [ApiController::class, 'getDisciplines']);
Route::get('/apprenants/{disciplineId}', [ApiController::class, 'getApprenantsByDiscipline']);
Route::post('/apprenant-data', [ApiController::class, 'getApprenantData']);

Route::get('/apprenants/{apprenant}/absences/{month}/{year}', [InfoBadgeuseController::class, 'getDaysWithoutBadge']);