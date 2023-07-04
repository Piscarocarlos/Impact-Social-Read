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
        Schema::create('type_categorie_partners', function (Blueprint $table) {
            $table->id();
            $table->string('name_categorie');
            $table->unsignedBigInteger('type_partner_id');
            $table->boolean('status')->default(false);
            $table->foreign('type_partner_id')->references('id')->on('type_partners')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('type_categorie_partners');
    }
};
