<?php

namespace App\Http\Controllers\Typebeneficaire;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Type_beneficiare;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class TypebeneficiaireController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page type bénéficiare";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\TypebeneficiaireController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typebeneficiaire/Index",[
            "beneficiares" => Type_beneficiare::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create(Request $request) : Response
    {
        return Inertia::render("Typebeneficiaire/Create");
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
            'type_beneficiary' => ['required', 'regex:/^[^\d]*$/','max:50','unique:type_beneficiares'],
        ],
        [
            "type_beneficiary.required"=>"Ce champ est obligatoire*",
            "type_beneficiary.regex"=>"Le format est incorrect*",
            "type_beneficiary.max"=>"La taille ne doit pas depasser 50 caractères*",
            "type_beneficiary.unique"=>"Le type de bénéficiaire existe déjà*"
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Ouverture page création de service";
    $activity->subject_type = 'Création';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Duration\DurationController';
    $activity->event = 'Création des données';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        $beneficiaire=Type_beneficiare::create(['type_beneficiary'=>$request->type_beneficiary]);
        return Inertia::render("Typebeneficiaire/Index",[
            "beneficiares" => Type_beneficiare::all(),
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
        $operator=Type_beneficiare::find($id);
        if($operator->status==true){
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Modification statut type bénéficiare";
            $activity->subject_type = 'Lecture des données';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Duration\TypebeneficiareController';
            $activity->event = 'Lecture des données';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('type_beneficiares')->where('id',$id)->update([
                "status"=>false
              ]); 
                      return Inertia::render("Typebeneficiaire/Index",[
            "beneficiares" => Type_beneficiare::all(),
            "success"=>"Le statut  a été changé avec succès."
        ]);
        }
        else{
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Modification statut type bénéficiare";
            $activity->subject_type = 'Lecture des données';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Duration\TypebeneficiareController';
            $activity->event = 'Lecture des données';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('type_beneficiares')->where('id',$id)->update([
                "status"=>true
              ]); 
                      return Inertia::render("Typebeneficiaire/Index",[
            "beneficiares" => Type_beneficiare::all(),
            "success"=>"Le statut  a été changé avec succès."
        ]);
        }
    }
     /**
     * show
     *
     * @return Response
     */
    public function show(Request $request,$id){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification statut type bénéficiare";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\TypebeneficiareController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Typebeneficiaire/Update",[
            "beneficiaires"=>Type_beneficiare::find($id)
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
            'type_beneficiary' => ['required', 'regex:/^[^\d]*$/','max:50'],
        ],
        [
            "type_beneficiary.required"=>"Ce champ est obligatoire*",
            "type_beneficiary.regex"=>"Le format est incorrect*",
            "type_beneficiary.max"=>"La taille ne doit pas depasser 50 caractères*",
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification statut type bénéficiare";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\TypebeneficiareController';
        $activity->event = 'Modification effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        DB::table('type_beneficiares')->where('id',$id)->update([
           'type_beneficiary'=>$request->type_beneficiary
        ]);
        return Inertia::render("Typebeneficiaire/Index",[
            "success"=>"L'élément a été modifié avec succès.",
            "beneficiares" => Type_beneficiare::all(),
        ]);
    }
}
