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
        Schema::create('section_one_home_candidates_ars', function (Blueprint $table) {
            $table->id();
            $table->longText("msg_no_candidature");
            $table->longText("msg_candidature_cours");
            $table->longText("msg_candidature_attente");
            $table->longText("msg_info_candidature");
            $table->unsignedBigInteger("section_one_id");
            $table->timestamps();
            $table->foreign('section_one_id')->references('id')->on('section_one_home_candidates')->onDelete('cascade')->oonUpdat('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_one_home_candidates_ars');
    }
};
