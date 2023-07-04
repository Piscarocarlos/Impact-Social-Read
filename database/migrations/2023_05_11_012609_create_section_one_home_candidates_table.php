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
        Schema::create('section_one_home_candidates', function (Blueprint $table) {
            $table->id();
            $table->longText("msg_no_candidature");
            $table->longText("msg_candidature_cours");
            $table->longText("msg_candidature_attente");
            $table->longText("msg_info_candidature");
            $table->boolean("status")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_one_home_candidates');
    }
};
