<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{

    
    protected $fillable = ['name', 'code', 'symbol', 'exchange_rate'];

    public $timestamps = false;



    use HasFactory;
}
