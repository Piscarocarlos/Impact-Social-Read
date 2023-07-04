<?php

namespace App\Http\Controllers\Profilusercandidate;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Image;


use Illuminate\Support\Facades\Storage;

class ProfiluserController extends Controller
{
    public function profilCandidate(){
        $id=Auth::user()->id;
        $user=User::find($id);
        return Inertia::render('Profilcandidate/Index',[
            "candidate"=>$user
        ]);
    }
    public function profilCandidateUpdate(Request $request, $id){


        $request->validate([
            'name' => ['required', 'regex:/^[^\d]*$/','max:50'],
            'email' => 'required|email|max:50',
            'firstName' => ['required', 'regex:/^[^\d]*$/','max:50'],
            "phoneNumber"=>['required', 'regex:/^0[1-9]\d{8}$/'],
        ],[
            '*.required'=>"Ce champ est obligatoire",
            "email.email"=>"Format email incorrect",
            "firstName.regex"=>"Format incorrect",
            "phoneNumber.regex"=>"Format incorrect",
            '*.max'=>"La taille est trop longue"
        ]);
        if($request->file('image')==""){
            DB::table('users')->where('id',$id)->update([
                'name'=>$request->name,
                'email'=>$request->email,
                "firstName"=>$request->firstName,
                "phoneNumber"=>$request->phoneNumber,
            ]);
            return redirect()->route('dashboard.profil.candidate')->with('success', "Votre profil à bien été modifiéé avec succès");
        }
        else{
            $request->validate([
                'image' => 'mimes:png,jpg,jpeg|max:2048'
              ],[
                'image.required'=>"Seul les formats png,jpg,jpeg sont autorisés"
              ]);
              $avatar=Storage::disk('public')->put('avatar_file',$request->file('image'));
              


              DB::table('users')->where('id',$id)->update([
                'name'=>$request->name,
                'email'=>$request->email,
                "firstName"=>$request->firstName,
                "phoneNumber"=>$request->phoneNumber,
                "avatar"=>$avatar
            ]);
            return redirect()->route('dashboard.profil.candidate')->with('success', "Votre profil à bien été modifiéé avec succès");
        }
      
           
       
        
    }
}
