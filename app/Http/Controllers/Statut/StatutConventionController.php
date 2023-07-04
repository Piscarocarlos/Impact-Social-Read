<?php

namespace App\Http\Controllers\Statut;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Statut_convention;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class StatutConventionController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page statut";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Statut\StatutController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Statutconvention/Index",[
            "statut" => Statut_convention::all()
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
        $activity->description = "Création  statut";
        $activity->subject_type = 'Création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Statut\StatutController';
        $activity->event = 'Création';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Statutconvention/Create");
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
            'title' => ['required', 'regex:/^[^\d]*$/','max:50','unique:statut_conventions'],
            "description"=>['required'],
        ],
        [
           "*.required"=>"Ce champ est obligatoire*",
           "*.max"=>"Ce champ est trop long*",
           "*.regex"=>"Format incorrect*",
           "*.unique"=>"Cet élément est déjà utilisé dans la base de données*"
        ]
    );
        $statut=Statut_convention::create([
            'title'=>$request->title,
            'description'=>$request->description
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Création statut statut";
        $activity->subject_type = 'Sauvegarde effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Statut\StatutController';
        $activity->event = 'Sauvegarde effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Statutconvention/Index",[
            "statut" => Statut_convention::all(),
            "success"=>"Le statut des conventions a été créé avec succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $statut=Statut_convention::find($id);
        if($statut->status==true){
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Modification statut";
            $activity->subject_type = 'Sauvegarde effectuée';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Statut\StatutController';
            $activity->event = 'Modification effectuée';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('statut_conventions')->where('id',$id)->update([
                "status"=>false
              ]); 
              return Inertia::render("Statutconvention/Index",[
            "statut" => Statut_convention::all(),
            "success"=>"Le statut a été changéé  avec succès."
        ]);
       
        }
        else{
            $ipAddress = $request->ip();
            $activity = new Activity();
            $activity->log_name = Auth::user()->name;
            $activity->description = "Modification statut";
            $activity->subject_type = 'Sauvegarde effectuée';
            $activity->subject_id = 1;
            $activity->causer_type = 'App\Controller\Statut\StatutController';
            $activity->event = 'Modification effectuée';
            $activity->causer_id = Auth::user()->id ;
            $activity->properties = ['ip' =>  $ipAddress];
            $activity->save();
            DB::table('statut_conventions')->where('id',$id)->update([
                "status"=>true
              ]); 
              return Inertia::render("Statutconvention/Index",[
            "statut" => Statut_convention::all(),
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
        $activity->description = "Modification statut";
        $activity->subject_type = 'Sauvegarde effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Statut\StatutController';
        $activity->event = 'Modification effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Statutconvention/Update",[
            "statut"=>Statut_convention::find($id)
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
        //dd($id);
        $request->validate([
            'title' => ['required', 'regex:/^[^\d]*$/','max:50'],
            "description"=>['required'],
        ],
        [
           "*.required"=>"Ce champ est obligatoire*",
           "*.max"=>"Ce champ est trop long*",
           "*.regex"=>"Format incorrect*",
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Modification statut";
    $activity->subject_type = 'Modification effectuée effectuée';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Statut\StatutController';
    $activity->event = 'Modification effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        DB::table("statut_conventions")->where("id",$id)->update([
            'title'=>$request->title,
            'description'=>$request->description
        ]);
        return Inertia::render("Statutconvention/Index",[
            "statut" => Statut_convention::all(),
            "success"=>"L'élément a été modifié avec succès."
        ]);
    }
}
