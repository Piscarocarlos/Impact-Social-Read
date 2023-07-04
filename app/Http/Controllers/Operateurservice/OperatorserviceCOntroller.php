<?php

namespace App\Http\Controllers\Operateurservice;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Operator_service;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Type_operator_service;
use Spatie\Activitylog\Models\Activity;

class OperatorserviceCOntroller extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page opérateur de service";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Operateur_service\Operateur_serviceController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Operatorservice/Index",[
            "operator" => Operator_service::all(),
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
        $activity->description = "Ouverture page création opérateur de service";
        $activity->subject_type = 'Page création de service';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Operateur_service\Operateur_serviceController';
        $activity->event = 'Page création de service';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Operatorservice/Create",[
            "operator"=>Type_operator_service::all()
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
            'name_operator'=>['required', 'regex:/^[^\d]*$/','max:50'],
            'type_operator'=>['required'],
            'phone'=>['required', 'regex:/^0[1-9]\d{8}$/'],
            'email'=>['required','email','max:50'],
            'adresse'=>['required','max:100'],
            'ville'=>['required', 'regex:/^[^\d]*$/','max:50'],
            'rib'=> ['required',"regex:/^[A-Za-z0-9]+$/","max:27"],
            'ice'=>['required','regex:/^\d+$/','max:15','min:15']
        ],
        [
            "*required"=>"Ce champ est obligatoire*",
            "*reqquired"=>"Format incorrect*",
            "email.email"=>"Format email incorrect*",
            "*max"=>"La taille de ce champ est trop longue"
        ]
    );
        $operateur=Operator_service::create([
            'name_operator'=>$request->name_operator,
            'type_operator'=>$request->type_operator,
            'phone'=>$request->phone,
            'email'=>$request->email,
            'adresse'=>$request->adresse,
            'ville'=>$request->ville,
            'rib'=>$request->rib,
            'ice'=>$request->ice
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création opérateur de service";
        $activity->subject_type = 'Sauvegarde effectuée avec succès';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Operateur_service\Operateur_serviceController';
        $activity->event = 'Sauvegarde effectuée avec succès';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Operatorservice/Index",[
            "operator" => Operator_service::all(),
            "success"=>"Le type d'opérateur a été créé avec succès"
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
        $activity->description = "Ouverture page modification opérateur de service";
        $activity->subject_type = 'Page modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Operateur_service\Operateur_serviceController';
        $activity->event = 'Page modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Operatorservice/Update",[
            "operator_service"=>Operator_service::find($id),
            "operator" => Operator_service::all(),
        ]);  
    }
      /**
     * update
     *
     * @return Response
     */
    public function update(Request $request,$id)
    {
        $request->validate([
            'name_operator'=>['required', 'regex:/^[^\d]*$/','max:50',"unique:operator_services"],
            'type_operator'=>['required'],
            'phone'=>['required', 'regex:/^0[1-9]\d{8}$/'],
            'email'=>['required','email','max:50'],
            'adresse'=>['required','max:100'],
            'ville'=>['required', 'regex:/^[^\d]*$/','max:50'],
            'rib'=> ['required',"regex:/^[A-Za-z0-9]+$/","max:27"],
            'ice'=>['required','regex:/^\d+$/','max:15','min:15']
        ],
        [
            "*required"=>"Ce champ est obligatoire*",
            "*reqquired"=>"Format incorrect*",
            "email.email"=>"Format email incorrect*",
            "*max"=>"La taille de ce champ est trop longue",
            "*.unique"=>"Le nom existe déjà dans la base de données"
        ]
    );
        DB::table('operator_services')->where('id',$id)->update([
            'name_operator'=>$request->name_operator,
            'type_operator'=>$request->type_operator,
            'phone'=>$request->phone,
            'email'=>$request->email,
            'adresse'=>$request->adresse,
            'ville'=>$request->ville,
            'rib'=>$request->rib,
            'ice'=>$request->ice
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification opérateur de service";
        $activity->subject_type = 'Modification effectuée ab=vec succès';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Operateur_service\Operateur_serviceController';
        $activity->event = 'Modification effectuée ab=vec succès';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Operatorservice/Index",[
            "operator" => Operator_service::all(),
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
        DB::table('operator_services')->where('id',$id)->delete();
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Supression opérateur de service";
        $activity->subject_type = 'Suppréssion opérateur de service';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Operateur_service\Operateur_serviceController';
        $activity->event = 'Suppréssion opérateur de service';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Operatorservice/Index",[
            "operator" => Operator_service::all(),
            "success"=>"L'élément a été suppriméé avec succès."
        ]);
    }
}
