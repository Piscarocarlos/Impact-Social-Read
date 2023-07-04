<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\PasswordResetToken as Authenticatable;

class PasswordResetToken extends Model
{
    use HasFactory;
    protected $table = 'password_reset_tokens';
    protected $fillable=[
        'token',
        'email'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
