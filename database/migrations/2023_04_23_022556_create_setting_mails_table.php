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
        Schema::create('setting_mails', function (Blueprint $table) {
            $table->id();
            $table->string('MAIL_MAILER');
            $table->string('MAIL_HOST');
            $table->string('MAIL_PORT');
            $table->string('MAIL_USERNAME');
            $table->string('MAIL_PASSWORD');
            $table->string('MAIL_ENCRYPTION');
            $table->string('MAIL_FROM_ADDRESS');
            $table->string('MAIL_FROM_NAME');
            $table->string('status')->default('désactivé');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_mails');
    }
};
