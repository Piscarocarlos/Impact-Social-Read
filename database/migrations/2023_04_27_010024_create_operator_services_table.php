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
        Schema::create('operator_services', function (Blueprint $table) {
            $table->id();
            $table->string('name_operator');
            $table->string('type_operator');
            $table->string('phone');
            $table->string('email');
            $table->string('adresse');
            $table->string('ville');
            $table->string('rib');
            $table->string('ice');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operator_services');
    }
};
