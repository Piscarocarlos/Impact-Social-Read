<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;
    protected $fillable =[
    "name_service",
    "description",
    "cible",
    "cout_unitaire",
    "devise",
    "operator_service",
    'status',
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    /**
     * @return string
     */
    /*public function getCoutUnitaireAttribute($value){
        return format_price($value, $this->devise, false);
    }*/
}
