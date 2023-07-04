<?php

namespace App\Http\Controllers\Partneraccount;

use Carbon\Carbon;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Partner;
use App\Mail\PartnerMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\PasswordResetToken;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class PartnerAccountController extends Controller
{
    
    public function index(){
        return Inertia::render("Accountpartner/Create",[
            "role"=>Role::all(),
            "success"=>""
        ]);
     }
   
     /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'regex:/^[^\d]*$/','max:50'],
            'email' => ['required','max:50','unique:users','email'],
            'role' => ['required'],
        ],
        [
            '*.required'=>"Ce champ est obligatoire*",
            '*.max'=>"La taille de ce champ est trop longue",
            "*.unique"=>"Cette adresse email existe déjà*",
            "*.email"=>"Format adresse email incorrect*",
        ]
    );
    $generatePassword = Str::random(10);
    $Password="partner".$generatePassword;
    //dd($Password);
    $hashedPassword = Hash::make($Password);
    $account=User::create([
        "name"=>$request->name,
        "email"=>$request->email,
        "password"=>$hashedPassword,
        "user_type"=>strtolower($request->role)
    ]);
    return Inertia::render("Accountpartner/Create",[
        "role"=>Role::all(),
        "success"=>"Le compte pour le partenaire a bien été créé avec succès"
    ]);
       
      
    }
     /**
     * edit
     *
     * @param  mixed $request
     * @return void
     */
    public function edit($id){
        $partenaire=Partner::find($id);
        $token = Str::random(60);
        $user=User::where('id',$partenaire->user_id)->first();
        $passwordResetToken = PasswordResetToken::where('email', $user->email)->first();
        if($passwordResetToken!==null){
            DB::table('password_reset_tokens')->where('email', $user->email)->delete();
        }
        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
        $resetUrl = url('password/reset', $token);
        Mail::to('jador1.call@gmail.com')->send(new PartnerMail($partenaire,$resetUrl));
         return Inertia::render("Partner/Index",[
        "partenaires" => Partner::all(),
        "success"=>"Un email vient d'être envoyé au partenaire avec succès."
    ]);
        
    }
    public function resetPassword($token){
        //return view('test');
        $passwordResetToken = PasswordResetToken::where('token', $token)->first();
        if($passwordResetToken!=null){
            return Inertia::render("Password/Partner",[
                'token'=>$token,
            ]);
        }
        else{
   
            return Inertia::render('Password/Error');
        }
     
    }
}
