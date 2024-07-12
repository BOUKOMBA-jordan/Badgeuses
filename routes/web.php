<?php

// routes/web.php

use App\Http\Controllers\ApprenantController;
use App\Http\Controllers\DisciplineController;
use App\Http\Controllers\CarteController; // Ajoutez ce use si vous avez un CarteController
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::resource('apprenant', ApprenantController::class);
    Route::resource('discipline', DisciplineController::class);

    // Ajoutez la route pour les cartes si nécessaire
    Route::resource('carte', CarteController::class);
});

require __DIR__.'/auth.php';