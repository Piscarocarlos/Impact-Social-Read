<?php

namespace App\Http\Controllers\Convention;

use App\Models\City;
use App\Models\Pack;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Devise;
use App\Models\Region;
use App\Models\Partner;
use App\Models\Service;
use App\Models\Civility;
use App\Models\Logement;
use App\Models\Province;
use App\Models\Annee_bac;
use App\Models\Reporting;
use App\Models\Convention;
use App\Models\Orphelinat;
use App\Models\Filiere_bac;
use Illuminate\Http\Request;
use App\Models\Type_handicap;
use Spatie\FlareClient\Report;
use App\Models\Criter_selected;
use App\Models\Partner_contact;
use App\Models\Type_beneficiare;
use App\Models\Family_convention;
use App\Models\Situation__social;
use App\Models\Statut_convention;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Models\Activity;

class ConventionController extends Controller
{
    public function index(Request $request){
        $data=Convention::all();
        $DataReq=json_decode($data);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/IndexList",[
            "convention" => $DataReq,
            'errors'=>''
        ]);
    }
    public function indexFinalise(Request $request){
        $data=Convention::where("status",true)->get();
        $DataReq=json_decode($data);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention finalisées";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/Index",[
            "convention" => $DataReq
        ]);
    }
    public function indexAttente(Request $request){
        $data=Convention::where("status",false)->get();
        $DataReq=json_decode($data);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention en attente";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/IndexAfter",[
            "convention" => $DataReq
        ]);
    }
     /**
     * index
     *
     * @return Response
     */
    public function create(Request $request) : Response
    {
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention";
        $activity->subject_type = 'Création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Création';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/Create",[
            "famille"=>Family_convention::all(),
            "pack"=>Pack::where("status",true)->get(),
            "partenaire"=>Partner::all(),
            "statut"=>Statut_convention::where("status",true)->get(),
            "devise"=>Devise::where('status',true)->get(),
            "service"=>Service::where('status',true)->get(),
            "contact"=>Partner_contact::all(),
            "beneficiary"=>Type_beneficiare::where("status",true)->get(),
            "critere"=>Criter_selected::where("status",true)->get(),
            "reporting"=>Reporting::where("status",true)->get(),
            "region"=>Region::where("status",true)->get(),
            "province"=>Province::all(),
            "ville"=>City::all(),
            "filiere"=>Filiere_bac::where("status",true)->get(),
            "year"=>Annee_bac::where("status",true)->get(),
            "situation"=>Situation__social::where("status",true)->get(),
            "handicap"=>Type_handicap::all(),
            "logement"=>Logement::all(),
            "orphelin"=>Orphelinat::all(),
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
        //dd($request->file('fileConvention'));
        //dd($request->critereSelected["value"]);
        $request->validate([
            /*bloc1*/
            "newConvention" => ['required'],
            "familleConvention" => ['required'],
            /*bloc 2*/
            "numberPartner" => ['required'],
            "partnerId" => ['required'],
            "statutConvention" => ['required',],
            "dateSignature" =>['required', 'date', 'date_format:Y-m-d', 'before_or_equal:today'],
            "dureeConvention" => ['required'],
            "contactPartner" => ['required',],

           "dateEffet" => ['required',],
           "dateFin" => ['required','date_format:Y-m-d', 'after:dateEffet'],

           "montantGlobal"=>["required","regex:/^\d+(\.\d{1,2})?$/"],
            "devise"=>["required"],
           "contributionPartnaire"=>["required","regex:/^\d+(\.\d{1,2})?$/"],
            "echeancierReglement"=>["required","regex:/^\d+$/"],
            "dateEcheanceReglement"=>["required",'date_format:Y-m-d', 'after:today'],
            "montantReglement"=>["required","regex:/^\d+(\.\d{1,2})?$/"],

            "dateLimiteSelection"=>["required"],
            "numberBeneficiaryNextCohort"=>["required","regex:/^\d+$/"],
            "modePartner"=>["required"],
            "critereSelected"=>["required"],

            "validateBeneficiary"=>["required"],
            "openBook"=>["required"],
            "accountBank"=>["required"],
            "service"=>["required"],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.after"=>"La date de ce champ  doit être supérieure à une date*",   
            "*.before_or_equal"=>"La date de signature ne peut pas être supérieure à la date d'effet*",
            "*.regex"=>"Format incorrect*"
        ]
    );
     /*bloc1*/
    if($request->newConvention["value"]=="Non"){
        $request->validate([
            "reference" => ['required',"max:10","regex:/^[A-Za-z0-9]+$/"],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",  
            "*.max"=>"Ce champ est trop long*",  
            "*.regex"=>"Format incorrect*",  
        ]
    );

    }
 
    if(strtoupper($request->dureeConvention)=="MONO-COHORTE FERME"){
        $request->validate([
            "dureeEnAnnee" => ['required',"regex:/^\d+$/"],
            "numberBeneficiary" => ['required',"regex:/^\d+$/"],
            "periodeAccompagnement" => ['required',"regex:/^\d+$/"],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*", 
            "*.regex"=>"Format incorrect*", 
        ]
    );
    }
    if(strtoupper($request->dureeConvention)=="PLURI-COHORTE"){
        $request->validate([
            "dureeEnAnnee" => ['required',"regex:/^\d+$/"],
            "numberCohorte" => ['required',"regex:/^\d+$/"],
            "dureeAccompagnement" => ['required',"regex:/^\d+$/"],
            "numberBeneficiary" => ['required',"regex:/^\d+$/"],
            "numberBeneficiaryMax" => ['required',"regex:/^\d+$/"],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*", 
            "*.regex"=>"Format incorrect*", 
        ]
    );
    }
    
    if(strtoupper($request->typeConvention)=="ECRITE" || strtoupper($request->typeConvention)=="PACK"){
        $request->validate([
            "fileConvention" => ['required',"file","mimes:pdf,PDF","max:2048"],
            "dateEffetFile" => ['required','date', 'date_format:Y-m-d', 'before_or_equal:today'],
            "dateFinFile" => ['required','date_format:Y-m-d', 'after:dateEffetFile'],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",   
            "*.mimes"=>"Seul le format pdf est autorisé*",   
            "*.max"=>"La taille maximum est de 2048*",   
            "*.before_or_equal"=>"La date de ce champ ne doit pas être supérieure à la date d'aujourd'hui*",   
            "*.after"=>"La date de ce champ  doit être supérieure à la date d'aujourd'hui*",   
        ]
    );
    }
    if(strtoupper($request->dureeConvention)=="ANNUELLE RENOUVELABLE"){
        $request->validate([
            "preavis" => ['required',"regex:/^\d+$/"],
            "echeance" => ['required','date_format:Y-m-d', 'after:today'],
            "numberBeneficiaryMax" => ['required',"regex:/^\d+$/"],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*", 
            "*.regex"=>"Format incorrect*", 
            "*.after"=>"La date de ce champ doit être supérieure à la date d'aujourd'hui*", 
        ]
    );
    }
    if(strtoupper($request->dureeConvention)=="ANNUELLE FERME"){
        $request->validate([
            "echeance" => ['required','date_format:Y-m-d', 'after:today'],
            "numberBeneficiaryMax" => ['required',"regex:/^\d+$/"],
        ]);
    }
    if(strtoupper($request->dureeConvention)=="OUVERTE"){
        $request->validate([
            "echeance" => ['required','date_format:Y-m-d', 'after:today'],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*", 
            "*.after"=>"La date de ce champ doit être supérieure à la date d'aujourd'hui*", 
        ]
    );
    }
    /*if($request->critereSelected["value"]=="Oui"){
        $request->validate([
            "typeBeneficiary" => ['required',],
            "typeCritereBeneficiary" => ['required',],
        ]);
    }*/
    if($request->accountBank["value"]=="Oui"){
        $request->validate([
            "ribConvention" => ['required',"regex:/^[A-Za-z0-9]+$/","max:27"],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.regex"=>"Format incorrect*",
            "*.max"=>"La taille de ce champ est trop long*"
        ]
    );
    }
    if($request->openBook["value"]=="Oui"){
        $request->validate([
            "modelReporting" => ['required',],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
        ]
    );
    }
    $allData=$request->all();

    if($request->hasFile('fileConvention')){
        $allData["fileConvention"] = $request->file('fileConvention')->store('images/conventions');

    }

    $save=Convention::create([
        'data'=>json_encode($allData),
        'status'=>true
    ]);
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Ouverture page convention création";
    $activity->subject_type = 'Création effectuée';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Convention\ConventionController';
    $activity->event = 'Création effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
    return Inertia::render("Convention/IndexList",[
        "success" => "La conventiona été créée avec succès."
    ]);
    //dd(json_encode($allData));
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $data=Convention::find($id);
        $DataReq=json_decode($data);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention modification";
        $activity->subject_type = 'Modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/Update",[
           "convention"=>$DataReq,
           "famille"=>Family_convention::all(),
           "pack"=>Pack::where("status",true)->get(),
           "partenaire"=>Partner::all(),
           "statut"=>Statut_convention::where("status",true)->get(),
           "devise"=>Devise::where('status',true)->get(),
           "service"=>Service::where('status',true)->get(),
           "contact"=>Partner_contact::all(),
           "beneficiary"=>Type_beneficiare::where("status",true)->get(),
           "critere"=>Criter_selected::where("status",true)->get(),
           "reporting"=>Reporting::where("status",true)->get(),
           "region"=>Region::where("status",true)->get(),
           "province"=>Province::all(),
           "ville"=>City::all(),
           "filiere"=>Filiere_bac::where("status",true)->get(),
           "year"=>Annee_bac::where("status",true)->get(),
           "situation"=>Situation__social::where("status",true)->get(),
           "handicap"=>Type_handicap::all(),
           "logement"=>Logement::all(),
           "orphelin"=>Orphelinat::all(),
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
        $data=Convention::find($id);
        $DataReq=json_decode($data);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention spécifique";
        $activity->subject_type = 'Recherche database des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Recherche database des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/View",[
           "convention"=>$DataReq,
           ]
        );
    }
}
