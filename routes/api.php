<?php

use App\Http\Controllers\ApprenantController;
use App\Http\Controllers\HoraireController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route pour obtenir les détails des horaires
Route::get('/horaire/detail', [HoraireController::class, 'horaireDetail']);// routes/api.php
Route::get('/ApprenantsSelect', [ApprenantController::class, 'getApprenantsSelect']);