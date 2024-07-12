<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apprenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'carte_id',
        'promotion',
    ];

    public function carte()
    {
        return $this->belongsTo(Carte::class);
    }
}