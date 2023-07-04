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
        Schema::create('recouvrements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("convention_id");
            $table->float('credit');
            $table->float('debit');
            $table->float('solde');
            $table->string('nature');
            $table->date('date_operation');
            $table->foreign('convention_id')->references('id')->on('conventions')->onDelete('cascade')->oonUpdat('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recouvrements');
    }
};
