<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('type')->nullable();
            $table->string('value', 4000)->nullable();
            $table->string('lang')->nullable();
            $table->timestamps();
        });

        // Insert the four lines with default values
        $settings = [
            ['id' => 1, 'type' => 'format', 'value' => '[Nombre] [Symbole]'],
            ['id' => 2, 'type' => 'separator', 'value' => ','],
            ['id' => 3, 'type' => 'decimalPlaces', 'value' => '2'],
            ['id' => 4, 'type' => 'defaultCurrency', 'value' => 'MAD'],
        ];

        foreach ($settings as $setting) {
            \App\Models\Setting::create($setting);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
};
