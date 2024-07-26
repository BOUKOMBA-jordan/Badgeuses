<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HoraireController;

// Route pour obtenir les détails des horaires
Route::get('/horaire/detail', [HoraireController::class, 'horaireDetail']);