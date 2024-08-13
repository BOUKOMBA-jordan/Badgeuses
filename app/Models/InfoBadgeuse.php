<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoBadgeuse extends Model
{
    use HasFactory;

    protected $fillable = ['numero', 'month', 'value'];

    // Assurez-vous d'avoir la relation correcte avec le modèle Apprenant
    public function apprenant()
    {
        return $this->belongsTo(Apprenant::class);
    }
}