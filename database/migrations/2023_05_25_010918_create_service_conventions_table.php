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
        Schema::create('service_conventions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("service_id");
            $table->unsignedBigInteger("convention_id");
            $table->float('cout');
            $table->string("partner");
            $table->integer("objectif");
            $table->float('cout_service');
            $table->string('type_operator');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade')->oonUpdat('cascade');
            $table->foreign('convention_id')->references('id')->on('conventions')->onDelete('cascade')->oonUpdat('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_conventions');
    }
};
