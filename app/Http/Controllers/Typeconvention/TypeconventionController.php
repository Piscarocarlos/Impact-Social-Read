<?php

namespace App\Http\Controllers\Typeconvention;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Type_convention;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class TypeconventionController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page type de convention";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\TypeconventionController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typeconvention/Index",[
            "conventions" => Type_convention::all()
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
        $activity->description = "Création de type de convention";
        $activity->subject_type = 'Création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\TypeconventionController';
        $activity->event = 'Création';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typeconvention/Create");
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
            'type_convention'=>['required','unique:type_conventions'],
            //'type_convention' => ['required', 'regex:/^[^\d]*$/','max:50','unique:type_conventions'],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.max"=>"La taille ne doit pas depasser 50 caractères*",
            "*.regex"=>"Le format est incorrect*",
            "*.unique"=>"Ce type de convention existe déjà dans la base de données*"
        ]
    );
    $type_convention=$request->type_convention["value"];

    if($type_convention!=="Autres"){
        $convention=Type_convention::create(['type_convention'=> $type_convention]);
        return Inertia::render("Typeconvention/Index",[
            "conventions" => Type_convention::all(),
            "success"=>"Le type de conventiona été créé avec succès."
        ]);

    }
    else{
        $request->validate([
            'type_convention1'=>['required'],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.max"=>"La taille ne doit pas depasser 50 caractères*",
            "*.regex"=>"Le format est incorrect*",
            "*.unique"=>"Ce type de convention existe déjà dans la base de données*"
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Création type de convention";
        $activity->subject_type = 'sauvegarde effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\DurationController';
        $activity->event = 'Sauvegarde effectuée avec succès';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        $convention=Type_convention::create(['type_convention'=>$request->type_convention1]);
        return Inertia::render("Typeconvention/Index",[
            "conventions" => Type_convention::all(),
            "success"=>"Le type de conventiona été créé avec succès."
        ]);
    }
        
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $convention=Type_convention::find($id);
        if($convention->status==true){
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Modification statut de type de convention";
            $activity->subject_type = 'Modification statut de type de convention';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Duration\TypeconventionController';
            $activity->event = 'Lecture des données';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('type_conventions')->where('id',$id)->update([
                "status"=>false
              ]); 
                      return Inertia::render("Typeconvention/Index",[
            "conventions" => Type_convention::all(),
            "success"=>"Le statut a bien été modifiéé avec succès"
        ]);
        }
        else{
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Modification statut de type de convention";
            $activity->subject_type = 'Modification statut de type de convention';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Duration\TypeconventionController';
            $activity->event = 'Lecture des données';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('type_conventions')->where('id',$id)->update([
                "status"=>true
              ]); 
                      return Inertia::render("Typeconvention/Index",[
            "conventions" => Type_convention::all(),
            "success"=>"Le statut a bien été modifiéé avec succès"
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
            $activity->description = "Modification de type de convention";
            $activity->subject_type = 'Modification de type de convention';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Duration\TypeconventionController';
            $activity->event = 'Lecture des données';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
        return Inertia::render("Typeconvention/Update",[
            "conventions"=>Type_convention::find($id)
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
            'type_convention' => ['required', 'regex:/^[^\d]*$/','max:50'],
           
        ],
        [
            "type_convention.required"=>"Ce champ est obligatoire*",
            "type_convention.max"=>"La taille ne doit pas depasser 50 caractères*",
            "type_convention.regex"=>"Le format est incorrect*",
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification de type de convention";
        $activity->subject_type = 'Modification de type de convention';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\TypeconventionController';
        $activity->event = 'Modification effectuée avec succès';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        DB::table('type_conventions')->where('id',$id)->update([
           'type_convention'=>$request->type_convention
        ]);
        return Inertia::render("Typeconvention/Index",[
            "conventions" => Type_convention::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
    }
}
