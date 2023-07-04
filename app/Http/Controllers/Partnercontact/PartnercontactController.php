<?php

namespace App\Http\Controllers\Partnercontact;

use index;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Partner;
use App\Models\Civility;
use Illuminate\Http\Request;
use App\Models\Partner_contact;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class PartnercontactController extends Controller
{
    public function index(Request $request)
    {
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page contact";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Contact\ContactController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partnercontact/Index", [
            "partner_contact" => Partner_contact::all(),
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create(Request $request): Response
    {
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création contact";
        $activity->subject_type = 'Création contact';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Contact\ContactController';
        $activity->event = 'Création contact';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partnercontact/Create", [
            "partner" => Partner::all(),
            "civilite" => Civility::all(),
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
        $request->validate(
            [
                "name" => ['required', 'regex:/^[^\d]*$/', 'max:100'],
                "first_name" => ['required', 'regex:/^[^\d]*$/', 'max:100'],
                "civility" => ['required'],
                "email" => ['required', 'email', 'max:100'],
                "phone_mobile" => ['required', 'regex:/^0[1-9]\d{8}$/'],
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.regex" => "Format incorrect*",
                "*.max" => "La taille de cet élément est trop longue*"
            ]
        );
        if($request->function!=""){
            $request->validate([
                "function" => ['regex:/^[^\d]*$/', 'max:100'],
            ],
            [
                "*.regex"=>"Format incorrect"
            ]
        );
    }

        if($request->title!=""){
            $request->validate([
                "title" => ['regex:/^[^\d]*$/', 'max:100'],
            ],
            [
                "*.regex"=>"Format incorrect"
            ]
        );
    }
        if($request->phone_fixe!=""){
            $request->validate([
                "phone_fixe" => ['regex:/^0[1-9]\d{8}$/'],
            ],
            [
                "*.regex"=>"Format incorrect"
            ]
        );
        }
        if($request->profil_linkedin!=""){
            $request->validate([
                "profil_linkedin" => ['required' /*'regex:/(https?:\/\/(?:www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?)/'*/, 'max:200'],
            ],
            [
                "*.regex"=>"Format incorrect"
            ]
        );
        }
       //dd('ok');
        $contact_partner = Partner_contact::create([
            'name' => $request->name,
            'first_name' => $request->first_name,
            'function' => $request->function,
            'title' => $request->title,
            'civility' => $request->civility,
            'email' => $request->email,
            'phone_mobile' => $request->phone_mobile,
            'phone_fixe' => $request->phone_fixe,
            'profil_linkedin' => $request->profil_linkedin
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création contact";
        $activity->subject_type = 'Création contact effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Contact\ContactController';
        $activity->event = 'Création contact effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partnercontact/Index", [
            "partner_contact" => Partner_contact::all(),
            "success"=>"Le contact a été créé avec succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification contact";
        $activity->subject_type = 'Modification contact';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Contact\ContactController';
        $activity->event = 'Modification contact';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partnercontact/Update", [
            "partner" => Partner::all(),
            "civilite" => Civility::all(),
            "contact_partner" => Partner_contact::find($id)
        ]);
    }
    /**
     * update
     *
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $request->validate(
            [
                "name" => ['required', 'regex:/^[^\d]*$/', 'max:100'],
                "first_name" => ['required', 'regex:/^[^\d]*$/', 'max:100'],
                "civility" => ['required'],
                "email" => ['required', 'email', 'max:100'],
                "phone_mobile" => ['required', 'regex:/^0[1-9]\d{8}$/'],
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.regex" => "Format incorrect*",
                "*.max" => "La taille de cet élément est trop longue*"
            ]
        );
        if($request->function!=""){
            $request->validate([
                "function" => ['regex:/^[^\d]*$/', 'max:100'],
            ],
            [
                "*.regex"=>"Format incorrect"
            ]
        );
    }

        if($request->title!=""){
            $request->validate([
                "title" => ['regex:/^[^\d]*$/', 'max:100'],
            ],
            [
                "*.regex"=>"Format incorrect"
            ]
        );
    }
        if($request->phone_fixe!=""){
            $request->validate([
                "phone_fixe" => ['regex:/^[^\d]*$/', 'max:100'],
            ],
            [
                "*.regex"=>"Format incorrect"
            ]
        );
        }
        if($request->profil_linkedin!=""){
            $request->validate([
                "profil_linkedin" => ['required' /*'regex:/(https?:\/\/(?:www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?)/'*/, 'max:200'],
            ],
            [
                "*.regex"=>"Format incorrect"
            ]
        );
        }
        DB::table("partner_contacts")->where('id', $id)->update([
            'name' => $request->name,
            'first_name' => $request->first_name,
            'function' => $request->function,
            'title' => $request->title,
            'civility' => $request->civility,
            'email' => $request->email,
            'phone_mobile' => $request->phone_mobile,
            'phone_fixe' => $request->phone_fixe,
            'profil_linkedin' => $request->profil_linkedin
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification contact";
        $activity->subject_type = 'Modification contact effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Contact\ContactController';
        $activity->event = 'Modification contact effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partnercontact/Index", [
            "partner_contact" => Partner_contact::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show(Request $request,$id)
    {
        DB::table('partner_contacts')->where('id', $id)->delete();
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification contact";
        $activity->subject_type = 'Supression contact';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Contact\ContactController';
        $activity->event = 'Supression contact';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partnercontact/Index", [
            "partner_contact" => Partner_contact::all(),
            "success"=>"Le contact a été suppriméé avec succès."
        ]);
    }
}
