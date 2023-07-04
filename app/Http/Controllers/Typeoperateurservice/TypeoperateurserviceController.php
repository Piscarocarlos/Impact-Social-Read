<?php

namespace App\Http\Controllers\Typeoperateurservice;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Information__pluse;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Type_operator_service;
use Spatie\Activitylog\Models\Activity;

class TypeoperateurserviceController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page home opérateur de service";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\Typeoperateurservice';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typeoperateurservice/Index",[
            "operateurs" => Type_operator_service::all()
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
        $activity->subject_type = 'Création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\Typeoperateurservice';
        $activity->event = 'Création de données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typeoperateurservice/Create");
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
            'type_operator' => ['required', 'regex:/^[^\d]*$/','max:50','unique:type_operator_services'],
        ],
        [
            "type_operator.required"=>"Ce champ est obligatoire*",
            "type_operator.regex"=>"Format incorrect",
            "type_operator.max"=>"La taille ne doit pas depasser 50 caractères",
            "type_operator.unique"=>"Le type d'opérateur existe déjà dans la base de données"
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Ouverture page home opérateur de service";
    $activity->subject_type = 'Sauvegarde de données';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Duration\Typeoperateurservice';
    $activity->event = 'Sauvegarde effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        $operator=Type_operator_service::create(['type_operator'=>$request->type_operator]);
        return Inertia::render("Typeoperateurservice/Index",[
            "operateurs" => Type_operator_service::all(),
            "success"=>"L'élément a été créé avec succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $operator=Type_operator_service::find($id);
        if($operator->status==true){
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Changement statut type opérateur de service";
            $activity->subject_type = 'Changement statut';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Duration\Typeoperateurservice';
            $activity->event = 'Lecture des données';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('type_operator_services')->where('id',$id)->update([
                "status"=>false
              ]); 
             return Inertia::render("Typeoperateurservice/Index",[
            "operateurs" => Type_operator_service::all(),
            "success"=>"Le statut  a été changé avec succès."
        ]);
        }
        else{
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Changement statut type opérateur de service";
            $activity->subject_type = 'Changement statut';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Duration\Typeoperateurservice';
            $activity->event = 'Lecture des données';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('type_operator_services')->where('id',$id)->update([
                "status"=>true
              ]); 
             return Inertia::render("Typeoperateurservice/Index",[
            "operateurs" => Type_operator_service::all(),
            "success"=>"Le statut  a été changé avec succès."
        ]);
        }
    }
     /**
     * show
     *
     * @return Response
     */
    public function show(Request $request ,$id){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification des données";
        $activity->subject_type = 'Modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\Typeoperateurservice';
        $activity->event = 'Modification des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typeoperateurservice/Update",[
            "operator"=>Type_operator_service::find($id)
        ]);
    }
    //SAVE A NEW FORM UPDATE
     /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request){
        $id=$request->id;
        $request->validate([
            'type_operator' => ['required', 'regex:/^[^\d]*$/','max:50'],
        ]
        ,
        [
            "type_operator.required"=>"Ce champ est obligatoire*",
            "type_operator.regex"=>"Format incorrect",
            "type_operator.max"=>"La taille ne doit pas depasser 50 caractères",
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Ouverture page modification des données";
    $activity->subject_type = 'Modification';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Duration\Typeoperateurservice';
    $activity->event = 'Modification des données effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        DB::table('type_operator_services')->where('id',$id)->update([
           'type_operator'=>$request->type_operator
        ]);
        return Inertia::render("Typeoperateurservice/Index",[
            "operateurs" => Type_operator_service::all(),
            "success"=>"L'élément a été modifié avec succès."
        ]);
    }
    
}
