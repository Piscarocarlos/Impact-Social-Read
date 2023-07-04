<?php

namespace App\Http\Controllers\Reporting;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Reporting;
use Illuminate\Http\Request;
use App\Models\Intitule_acte;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;


class ReportingController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page reporting";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\ControllerReporting\ReportingController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Reporting/Index",[
            "reporting" => Reporting::all()
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
        $activity->description = "Ouverture page création reporting";
        $activity->subject_type = 'Création reportinf';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\ControllerReporting\ReportingController';
        $activity->event = 'Création reportinf';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Reporting/Index",[
            "reporting" => Reporting::all()
        ]);
        return Inertia::render("Reporting/Create");
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
            'type' => ['required', 'regex:/^[^\d]*$/','max:255','unique:reportings'],
        ],
        [
            "type.required"=>"Ce champ est obligatoire*",
            "type.max"=>"La taille est trop longue*",
            "type.regex"=>"Format incorrect*",
            "type.unique"=>"Elément existe déjà dans la base données, impossible de l'ajouter de nouveau*"
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Ouverture création page reporting";
    $activity->subject_type = 'Création reporting effectuée';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\ControllerReporting\ReportingController';
    $activity->event = 'Création reporting effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
    return Inertia::render("Reporting/Index",[
        "reporting" => Reporting::all()
    ]);
        $acte=Reporting::create(['type'=>$request->type]);
        return Inertia::render("Reporting/Index",[
            "reporting" => Reporting::all(),
            "success"=>"Le modèle de reporting a été créé avec succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $source=Reporting::find($id);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification statut reporting";
        $activity->subject_type = 'Modification statut effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\ControllerReporting\ReportingController';
        $activity->event = 'Modification statut effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Reporting/Index",[
            "reporting" => Reporting::all()
        ]);
        if($source->status==true){
            DB::table('reportings')->where('id',$id)->update([
                "status"=>false
              ]); 
                      return Inertia::render("Reporting/Index",[
            "reporting" => Reporting::all(),
            "success"=>"Le statut a été créé avec succès."
        ]);
        }
        else{
            DB::table('reportings')->where('id',$id)->update([
                "status"=>true
              ]); 
                      return Inertia::render("Reporting/Index",[
            "reporting" => Reporting::all(),
            "success"=>"Le statut a été créé avec succès."
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
        $activity->description = "Modification page reporting";
        $activity->subject_type = 'Modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\ControllerReporting\ReportingController';
        $activity->event = 'Modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Reporting/Update",[
            "reporting"=>Reporting::find($id)
        ]);
    }
    //SAVE A NEW FORM UPDATE
     /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request,$id){
        $request->validate([
            'type' => ['required', 'regex:/^[^\d]*$/','max:255'],
        ],
        [
            "type.required"=>"Ce champ est obligatoire*",
            "type.max"=>"La taille est trop longue*",
            "type.regex"=>"Format incorrect*",
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Modification page reporting";
    $activity->subject_type = 'Modification effectuée';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\ControllerReporting\ReportingController';
    $activity->event = 'Modification effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
       DB::table("reportings")->where('id',$id)->update(['type'=>$request->type]);
       return Inertia::render("Reporting/Index",[
        "reporting" => Reporting::all(),
        "success"=>"L'élément a été modifiéé succès."
    ]);
    }
}
