<?php

namespace App\Http\Controllers\Updatepassword;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\PasswordResetToken;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\abort;

use function PHPUnit\Framework\isNull;

class UpdatepasswordController extends Controller
{
    public function partnerPassword(Request $request){
        $request->validate([
            'password'=>['required','max:12'],
            'rePassword'=>['required','max:12'],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.max"=>"La taille de ce champ est trop longue*"
        ]
        );
        $token=$request->id;
        $password=$request->password;
        
        $passwordResetToken = PasswordResetToken::where('token', $token)->first();
        if($passwordResetToken!=null){
            $email=$passwordResetToken->email;
            $newPassword=Hash::make($password);
            DB::table('users')->where('email',$email)->update([
                'password'=>$newPassword,
                "remember_token"=>$token,
                "updated_at"=>now()
            ]);
            $user=User::where('email',$email)->first();
            $userId=$user->id;
            DB::table('partners')->where('user_id',$userId)->update([
                'account_status'=>1
            ]);
            DB::table('password_reset_tokens')->where("email",$email)->delete();
            dd('opération réussi avec succès');
        }
        else{
            return Inertia::render('Password/Error');
        }
       
       
  
    }
}
