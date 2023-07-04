<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recouvrement extends Model
{
    use HasFactory;
    protected $fillable=[
        "convention_id",
        'credit',
        'debit',
        'nature',
        'solde',
        'date_operation',
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
    /*public function getCreditAttribute($value){
        return format_price($value, $this->devise, false);
    }*/
       /**
     * @return string
     */
   /* public function getDebitAttribute($value){
        return format_price($value, $this->devise, false);
    }*/
       /**
     * @return string
     */
    /*public function getSoldeAttribute($value){
        return format_price($value, $this->devise, false);
    }*/
}
