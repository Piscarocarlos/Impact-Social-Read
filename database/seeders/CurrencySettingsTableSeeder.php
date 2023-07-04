<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CurrencySettingsTableSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        DB::table('currency_settings')->insert([
            'id' => 1,
            'defaultCurrency' => 'MAD',
            'format' => '[Nombre] [Symbole]',
            'separator' => ',',
            'decimalPlaces' => 2,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }
}

