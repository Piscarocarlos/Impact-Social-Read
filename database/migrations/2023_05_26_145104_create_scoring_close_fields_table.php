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
        Schema::create('scoring_close_fields', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('field_id')->nullable();
            $table->foreign('field_id')->references('id')->on('champ_scorings')->onDelete('cascade');
            $table->longText('data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scoring_close_fields');
    }
};
