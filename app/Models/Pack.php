<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pack extends Model
{
    use HasFactory;
    protected $fillable=[
        'name_pack',
        'service_pack',
        'price',
        'status'
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
    /*public function getPriceAttribute($value){
        return format_price($value, '', false);
    }*/
}
