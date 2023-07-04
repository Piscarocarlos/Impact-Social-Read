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
        Schema::table('partner_contacts', function (Blueprint $table) {
            $table->string('function')->nullable()->change();
            $table->string('title')->nullable()->change();
            $table->string('phone_fixe')->nullable()->change();
            $table->string('profil_linkedin')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('partner_contacts', function (Blueprint $table) {
            //
        });
    }
};
