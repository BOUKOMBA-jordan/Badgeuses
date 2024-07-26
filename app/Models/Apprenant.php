<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apprenant extends Model
{
    protected $fillable = ['nom', 'prenom', 'carte_id', 'promotion', 'discipline_id'];

    // Relation avec le modèle Discipline
    public function discipline()
    {
        return $this->belongsTo(Discipline::class, 'discipline_id');
    }

    public function horaires()
    {
        return $this->hasMany(Horaire::class);
    }
}