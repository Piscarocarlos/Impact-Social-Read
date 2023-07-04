<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Partner_contact extends Model
{
    use HasFactory;
    protected $fillable = [
        'partenaire_id',
        'name',
        'first_name',
        'function',
        'title',
        'civility',
        'email',
        'phone_mobile',
        'phone_fixe',
        'profil_linkedin',
        
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
