<?php

namespace App\Http\Controllers\Googleauth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect(){
        return Socialite::driver('google')->redirect();
    }
    public function callbackGoogle(){
        
        $googleUser = Socialite::driver('google')->user();
 
        $user = User::where('email', $googleUser->email)->first();
            if ($user) {
                $user->update([
                    'email_verified_at'=>now(),
                ]);
            } 
            else {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    //'google_token' => $googleUser->token,
                    'email_verified_at'=>now(),
                    'user_type'=>"candidate",
                    "last_seen"=>NULL,
                    "avatar"=>NULL,
                    'password' => bcrypt("12345678") 
                ]);
            }
            Auth::login($user);
            return redirect('http://127.0.0.1:8000');
    
    }
}
