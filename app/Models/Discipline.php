<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    use HasFactory;

    protected $fillable = ['nom'];

    public function apprenants()
    {
        return $this->belongsToMany(Apprenant::class);
    }
}