<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service_convention extends Model
{
    use HasFactory;
    protected $fillable=[
        "service_id",
        "convention_id",
        'cout',
        "partner",
        "objectif",
        'cout_service',
        'type_operator',
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
    /*public function getCoutAttribute($value){
        return format_price($value, $this->devise, false);
    }*/
     /**
     * @return string
     */
   /* public function getCoutserviceAttribute($value){
        return format_price($value, $this->devise, false);
    }*/
}
