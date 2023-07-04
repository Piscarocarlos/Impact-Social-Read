<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrenciesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('currencies')->insert([
            [
                'id' => 1,
                'name' => 'Moroccan Dirham',
                'code' => 'MAD',
                'symbol' => 'DH',
                'exchange_rate' => 1
            ],
        ]);
    }
}


