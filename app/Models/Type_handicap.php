<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Type_handicap extends Model
{
    use HasFactory;
    protected $fillable=['type_handicap','created_at','updated_at'];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }
}
