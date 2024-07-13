<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('apprenants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom');
            $table->string('prenom');
            $table->unsignedBigInteger('carte_id')->nullable();
            $table->string('promotion')->nullable();
            $table->unsignedBigInteger('discipline_id')->nullable(); // Ajout de la colonne discipline_id
            $table->timestamps();

            // Clé étrangère vers la table disciplines
            $table->foreign('discipline_id')
                ->references('id')
                ->on('disciplines')
                ->onDelete('set null'); // Assurez-vous que cela correspond à votre logique métier
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apprenants');
    }
};