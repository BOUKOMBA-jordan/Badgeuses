<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horaire extends Model
{
    use HasFactory;

    // Définir les champs qui peuvent être assignés en masse
    protected $fillable = [
        'carte_numero', 
        'jour', 
        'premiere_utilisation', 
        'derniere_utilisation', 
        'discipline_id', 
        'apprenant_id'
    ];

    // Définir la relation avec le modèle Carte
    public function carte()
    {
        return $this->belongsTo(Carte::class, 'carte_numero', 'numero'); // Associe 'carte_numero' de Horaire à 'numero' de Carte
    }

    // Définir la relation avec le modèle Apprenant
    public function apprenant()
    {
        return $this->belongsTo(Apprenant::class, 'apprenant_id');
    }

    // Définir la relation avec le modèle Discipline
    public function discipline()
    {
        return $this->belongsTo(Discipline::class, 'discipline_id');
    }
}