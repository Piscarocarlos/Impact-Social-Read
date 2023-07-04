<?php

namespace App\Http\Controllers\Civility;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Civility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class CivilityController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page civilité";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Civility\CivilityController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Civility/Index",[
            "civilities" => Civility::all()
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
        $activity->description = "Ouverture création de civilité";
        $activity->subject_type = 'Création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\CivilityController';
        $activity->event = 'Création de données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Civility/Create");
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
            'type_civility' => ['required', 'regex:/^[^\d]*$/','max:50','unique:civilities'],
        ],
        [
            "type_civility.required"=>"Ce champ est obligatoire",
            "type_civility.max"=>"La taille est trop longue et ne doit pas depasser 50 caractères",
            "type_civility.regex"=>"Le format incorrect*",
            "type_civility.unique"=>"Cet élément existe déjà dans la base données*"
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Ouverture page civilité";
    $activity->subject_type = 'Sauvegarde de données effectuées';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Civility\CivilityController';
    $activity->event = 'Sauvegarde de données';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        $civilite=Civility::create(['type_civility'=>$request->type_civility]);
        return Inertia::render("Civility/Index",[
            "civilities" => Civility::all(),
            "success"=>"La civilité a été créée avec succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $civilite=Civility::find($id);
        if($civilite->status==true){
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Modification statut civilité";
            $activity->subject_type = 'Modification';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Civility\CivilityController';
            $activity->event = 'Modification statut';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('civilities')->where('id',$id)->update([
                "status"=>false
              ]);
                     return Inertia::render("Civility/Index",[
            "civilities" => Civility::all(),
            "success"=>"Le statut a été changéé  avec succès."
        ]);
        }
        else{
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Modification civilité";
            $activity->subject_type = 'Modification statut';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Civility\CivilityController';
            $activity->event = 'Modification statut';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('civilities')->where('id',$id)->update([
                "status"=>true
              ]);
                     return Inertia::render("Civility/Index",[
            "civilities" => Civility::all(),
            "success"=>"Le statut a été changéé  avec succès."
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
            $activity->description = "Modification civilité";
            $activity->subject_type = 'Modification';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Civility\CivilityController';
            $activity->event = 'Modification';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();

        return Inertia::render("Civility/Update",[
            "civilities"=>Civility::find($id)
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
            'type_civility' => ['required', 'regex:/^[^\d]*$/','max:50'],
        ],
        [
            "type_civility.required"=>"Ce champ est obligatoire",
            "type_civility.max"=>"La taille est trop longue et ne doit pas depasser 50 caractères",
            "type_civility.regex"=>"Le format incorrect*",
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Modification civilité";
    $activity->subject_type = 'Modification effectuée';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Civility\CivilityController';
    $activity->event = 'Modification effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        DB::table('civilities')->where('id',$id)->update([
           'type_civility'=>$request->type_civility
        ]);
        return Inertia::render("Civility/Index",[
            "civilities" => Civility::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
    }
}
