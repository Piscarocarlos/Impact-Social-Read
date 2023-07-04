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
        Schema::create('section_two_home_candidate_ars', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->longText('description');
            $table->unsignedBigInteger("section_two_id");
            $table->foreign('section_two_id')->references('id')->on('section_two_home_candidates')->onDelete('cascade')->oonUpdat('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_two_home_candidate_ars');
    }
};
