<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Section_one_home_candidates_ar extends Model
{
    use HasFactory;
    protected $fillable=[
        "msg_no_candidature",
        "msg_candidature_cours",
        "msg_candidature_attente",
        "msg_info_candidature",
        "section_one_id",
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
