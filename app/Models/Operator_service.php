<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Operator_service extends Model
{
    use HasFactory;
    protected $fillable=[
        'name_operator',
        'type_operator',
        'phone',
        'email',
        'adresse',
        'ville',
        'rib',
        'ice'
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }
}
