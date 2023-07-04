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
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->longText("dataForm")->nullable();
            $table->string('status')->default("En cours");
            $table->boolean('etat')->default(false);
            $table->string("massarCode")->nullable();
            $table->string("emailAddress")->nullable();
            $table->string("gsm")->nullable();
            $table->string("numberCin")->nullable();
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
