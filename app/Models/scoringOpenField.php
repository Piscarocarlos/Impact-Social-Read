<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class scoringOpenField extends Model
{
    use HasFactory;
    protected $fillable=[
        "field_id",
        "type",
        "data",
       
    ];
}
