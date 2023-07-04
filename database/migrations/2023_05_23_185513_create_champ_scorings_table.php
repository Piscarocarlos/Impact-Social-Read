<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('champ_scorings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('value');
            $table->boolean('type');
            $table->boolean('status');
            $table->integer('coef');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('champ_scorings');
    }
};
