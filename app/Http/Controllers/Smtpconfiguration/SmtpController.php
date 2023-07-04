<?php

namespace App\Http\Controllers\Smtpconfiguration;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Filiere_bac;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Setting_mail;

class SmtpController extends Controller
{
    public function index(){
        return Inertia::render("Smtpconfiguration/Index",[
            "smtp" => Setting_mail::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Smtpconfiguration/Create");
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
            "mail_transport" =>  ['required', 'alpha_dash','max:10'],
            "mail_host" =>  ['required','max:50'],
            "email_port" =>  ['required', 'regex:/^[0-9]{1,5}$/'],
            "mail_username" =>  ['required', 'email','unique:setting_mails','max:50'],
            "mail_password" =>  ['required', 'max:50'],
            "mail_encryption" =>  ['required', 'alpha','max:50'],
            "mail_from" =>  ['required',  'email','max:50'],
            "mail_name" =>  ['required', 'max:50'],
        ]);
        //dd($request->mail_host);
        $mail_host=$request->mail_host;
        $smtp=Setting_mail::create([
            'MAIL_MAILER'=> $request->mail_transport,
            'MAIL_HOST'=> $mail_host,
            'MAIL_PORT'=> $request->email_port,
            'MAIL_USERNAME'=>$request->mail_username,
            'MAIL_PASSWORD'=> $request->mail_password,
            'MAIL_ENCRYPTION'=>$request->mail_encryption,
            'MAIL_FROM_ADDRESS'=> $request->mail_from,
            'MAIL_FROM_NAME'=> $request->mail_name,
        ]);
        return redirect()->route('dashboard.smtp-configuration.index')->with('success', "Le paramètre smtp a été créé avec succès");
    }
      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $smtp=Setting_mail::find($id);
        if($smtp->status==true){
            DB::table('setting_mails')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.smtp-configuration.index')->with('success', "Le statut du smtp a été modifiée avec succès");
        }
        else{
            DB::table('setting_mails')->where('id',$id)->update([
                "status"=>true
              ]); 
              DB::table('setting_mails')->where('id','!=',$id)->update([
                "status"=>"désactivé"
              ]); 
              return redirect()->route('dashboard.smtp-configuration.index')->with('success', "Le statut du smtp a été modifiée avec succès");
        }
    }
     /**
     * show
     *
     * @return Response
     */
    public function show($id){
        $setting_mail=Setting_mail::find($id);
        if($setting_mail->status=="désactivé"){
            DB::table('setting_mails')->where('id',$id)->delete();
            return redirect()->route('dashboard.smtp-configuration.index')->with('success', "Le smtp a été supprimé avec succès");
        }
        else{
            return redirect()->route('dashboard.smtp-configuration.index')->with('success', "Impossible de supprimer ce smtp en raison de son statut");
        }
    }
    
      /**
     * destroy
     *
     * @return Response
     */
    public function destroy(Request $request,$id)
    {
        dd('ok');
        //return Inertia::render("Smtpconfiguration/Update");
    }

}
