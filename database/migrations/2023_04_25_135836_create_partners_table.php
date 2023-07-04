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
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name_partner');
            $table->string('categorie_partner');
            $table->string('adresse_partner');
            $table->string('region_partner');
            $table->string('ville_partner');
            $table->string('pays_partner');
            $table->string('web_site_partner');
            $table->string('tel_standard_partner');
            $table->string('likedin_partner');
            $table->string('source_partner');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};
