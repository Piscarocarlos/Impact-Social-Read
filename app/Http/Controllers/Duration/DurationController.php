<?php

namespace  App\Http\Controllers\Duration;

use Inertia\Inertia;

use Inertia\Response;
use App\Models\Duration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;





class DurationController extends Controller
{
  
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "L'utilisateur à ouvert la page home duration";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Duration\DurationController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return  Inertia::render("Duration/Index",[
            "durations" => Duration::all(),
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
        $activity->description = "Ouverture de la page création de durée";
        $activity->subject_type = 'Pour créer les données';
        $activity->subject_id =Auth::user()->id;
        $activity->causer_type = 'App\Controller\Duration\DurationController';
        $activity->event = "Création d'une durée";
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Duration/Create");
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
            'type_duration' => ['required', 'regex:/^[^\d]*$/','max:50','unique:durations'],
        ],
        [
            "type_duration.required"=>"Ce champ est obligatoire*",
            "type_duration.max"=>"La taille ne doit pas depasser 50 caratères*",
            "type_duration.regex"=>"Le format est incorrect*",
            "type_duration.unique"=>"Cet élément existe déjà dans la base de données*"
        ]
    );
    
        $duree=Duration::create(['type_duration'=>$request->type_duration]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Sauvegarde de la durée";
        $activity->subject_type = 'Sauvegarde effectuée';
        $activity->subject_id =Auth::user()->id;
        $activity->causer_type = 'App\Controller\Duration\DurationController';
        $activity->event = "Sauvegarde de la durée";
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return  Inertia::render("Duration/Index",[
            "durations" => Duration::all(),
            "success"=>"La durée de la convention a été créée avec succès",
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
        $activity->description = "L'utilisateur à changer le statut";
        $activity->subject_type = "Page d'accueil de la liste des durées";
        $activity->subject_id = Auth::user()->id;
        $activity->causer_type = 'App\Controller\Duration\DurationController';
        $activity->event = "Changement de statut";
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();

        $convention=Duration::find($id);
        if($convention->status==true){
            DB::table('durations')->where('id',$id)->update([
                "status"=>false
              ]); 
                     return  Inertia::render("Duration/Index",[
            "durations" => Duration::all(),
            "success"=>"Le statut a été modifiéé avec succès",
        ]);
        }
        else{
            DB::table('durations')->where('id',$id)->update([
                "status"=>true
              ]); 
                     return  Inertia::render("Duration/Index",[
            "durations" => Duration::all(),
            "success"=>"Le statut a été modifiéé avec succès",
        ]);
        }
       
    }
     /**
     * show
     *
     * @return Response
     */
    public function show(Request $request, $id){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification d'une durée";
        $activity->subject_type = "Modification";
        $activity->subject_id = Auth::user()->id;
        $activity->causer_type = 'App\Controller\Duration\DurationController';
        $activity->event = "Modification de la durée";
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Duration/Update",[
            "durations"=>Duration::find($id)
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
            'type_duration' => ['required', 'regex:/^[^\d]*$/','max:50'],
        ],
        [
            "type_duration.required"=>"Ce champ est obligatoire*",
            "type_duration.max"=>"La taille ne doit pas depasser 50 caratères*",
            "type_duration.regex"=>"Le format est incorrect*",
        ]);
        DB::table('durations')->where('id',$id)->update([
           'type_duration'=>$request->type_duration
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification effectuée";
        $activity->subject_type = "Modification d'une durée";
        $activity->subject_id = Auth::user()->id;
        $activity->causer_type = 'App\Controller\Duration\DurationController';
        $activity->event = "Modification de la durée";
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return  Inertia::render("Duration/Index",[
            "durations" => Duration::all(),
            "success"=>"L'élément a été modifiéé avec succès.",
        ]);
    }
}
