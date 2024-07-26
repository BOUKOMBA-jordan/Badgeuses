<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorairesTable extends Migration
{
    public function up()
    {
        Schema::create('horaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Correspond à 'nom'
            $table->string('prenom'); // Correspond à 'prenom'
            $table->string('carte_numero'); // Correspond à 'carte_numero'
            $table->date('jour'); // Correspond à 'jour'
            $table->dateTime('premiere_utilisation'); // Correspond à 'premiere_utilisation'
            $table->dateTime('derniere_utilisation'); // Correspond à 'derniere_utilisation'
            $table->string('discipline'); // Correspond à 'discipline'
            $table->timestamps(); // Correspond à 'created_at' et 'updated_at'
        });
    }

    public function down()
    {
        Schema::dropIfExists('horaires');
    }
}