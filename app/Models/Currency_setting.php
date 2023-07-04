<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency_setting extends Model
{

    protected $fillable = [
        'defaultCurrency',
        'format',
        'separator',
        'decimalPlaces'
    ];
    public $timestamps = true;
    public static function saveSettings($data)
    {
        self::updateOrCreate([], $data);
    }
    use HasFactory;
}
