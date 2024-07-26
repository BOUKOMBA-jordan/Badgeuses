<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    protected $fillable = ['nom'];

    // Relation avec le modèle Apprenant
    public function apprenants()
    {
        return $this->hasMany(Apprenant::class, 'discipline_id');
    }
}