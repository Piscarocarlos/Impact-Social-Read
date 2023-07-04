<?php

namespace App\Http\Controllers\Verify;

use App\Models\Team;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class VerifyUserController extends Controller
{
    /**
     *  @return Response
     */

     public function verifyAction($id)
     {
        $user= User::findOrFail(decrypt($id));
        return Inertia::render('VerifyEmailAfterRegister/VerifyLogin',[
            'email'=>$user->email,
        ]);
     }
     /**
      *
      *  @return Response
      */


     public function changepassword(Request $request,$id){

        $request->validate([
            'email' =>'required',
            'password' =>'required'
        ],[
            'email.required'=>"Ce Champ est obligatoire",
            'password.required' =>"Ce Champ est obligatoire"
        ]);

        $user= User::findOrFail(decrypt($id));


        if($request->email==$user->email) {
            if($request->password>7 && strlen($request->email)==strlen($user->email) ){
                $user->password = Hash::make($request->password);
                $user->save();
                Auth::login($user);
                return redirect()->route('dashboard.team_dashboard');
            }else{
                return back()->withErrors([
                    'password'=>"Mot de passe incorrect ou trop court"
                ])->onlyInput('password');
            }
            }else{
                return redirect()->route('login');
            }

     }


     public function team(){
           $user= Auth::user();
           $roles=Team::where('user_id',$user->id)->first();
           $roles->update([
            'status'=>'active',
           ]);
           $roles->save();
            return Inertia::render('TeamUser/TeamUser', [
                'user' => $user,
                'roles'=>$roles->role->name,
                'success'=>"Bienvenue dans votre espace ".$user->name

            ]);
     }
}
