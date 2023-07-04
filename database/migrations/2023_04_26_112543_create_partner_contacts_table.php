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
        Schema::create('partner_contacts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('partenaire_id');
            $table->string('name');
            $table->string('first_name');
            $table->string('function');
            $table->string('title');
            $table->string('civility');
            $table->string('email');
            $table->string('phone_mobile');
            $table->string('phone_fixe');
            $table->string('profil_linkedin');
            $table->foreign('partenaire_id')->references('id')->on('partners')
            ->constrained()
            ->cascadeOnUpdate()
            ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partner_contacts');
    }
};
