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
            $table->dropForeign(['partenaire_id']);
            $table->dropColumn('partenaire_id');
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
