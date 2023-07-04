<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Partner extends Model
{
    use HasFactory;
    protected $fillable =[
        'name_partner',
        'categorie_partner',
        'adresse_partner',
        'region_partner',
        'ville_partner',
        'pays_partner',
        'web_site_partner',
        'tel_standard_partner',
        'likedin_partner',
        'source_partner',
        "contact_partner_id",
        "user_id",
        "account_status"
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
