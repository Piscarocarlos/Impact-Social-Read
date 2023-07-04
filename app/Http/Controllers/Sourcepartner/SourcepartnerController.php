<?php

namespace App\Http\Controllers\Sourcepartner;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Source;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class SourcepartnerController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page source partenaire";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Sourcepartner\SourcepartnerController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Sourcepartner/Index",[
            "sources" => Source::all()
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
        $activity->description = "Création source partenaire";
        $activity->subject_type = 'Création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Sourcepartner\SourcepartnerController';
        $activity->event = 'Création';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Sourcepartner/Create");
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
            'type_source' => ['required', 'regex:/^[^\d]*$/','max:255','unique:sources'],
        ],
        [
            "type_source.required"=>"Ce champ est obligatoire*",
            "type_source.max"=>"La taille est trop longue*",
            "type_source.regex"=>"Format incorrect*",
            "type_source.unique"=>"Cette source existe déjà dans la base données*"
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Ouverture page création source partenaire";
    $activity->subject_type = 'Sauvegarde création source partenaire';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Sourcepartner\SourcepartnerController';
    $activity->event = 'Sauvegarde création source partenaire';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        $sources=Source::create(['type_source'=>$request->type_source]);
        return Inertia::render("Sourcepartner/Index",[
            "sources" => Source::all(),
            "success"=>"La source des partenaires a été créée avec succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $source=Source::find($id);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification source partenaire";
        $activity->subject_type = 'Modification statut';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Sourcepartner\SourcepartnerController';
        $activity->event = 'Modification statut';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        if($source->status==true){
            DB::table('sources')->where('id',$id)->update([
                "status"=>false
              ]); 
                     return Inertia::render("Sourcepartner/Index",[
            "sources" => Source::all(),
            "success"=>"Le statut a été changéé avec succès."
        ]);
        }
        else{
            DB::table('sources')->where('id',$id)->update([
                "status"=>true
              ]); 
                     return Inertia::render("Sourcepartner/Index",[
            "sources" => Source::all(),
            "success"=>"Le statut a été changéé avec succès."
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
        $activity->description = "Modification source partenaire";
        $activity->subject_type = 'Modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Sourcepartner\SourcepartnerController';
        $activity->event = 'Modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Sourcepartner/Update",[
            "sources"=>Source::find($id)
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
            'type_source' => ['required', 'regex:/^[^\d]*$/','max:255'],
        ],
        [
            "type_source.required"=>"Ce champ est obligatoire*",
            "type_source.max"=>"La taille est trop longue*",
            "type_source.regex"=>"Format incorrect*",
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Modification source partenaire";
    $activity->subject_type = 'Modification effectuée';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Sourcepartner\SourcepartnerController';
    $activity->event = 'Modification effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        DB::table('sources')->where('id',$id)->update([
           'type_source'=>$request->type_source
        ]);
        return Inertia::render("Sourcepartner/Index",[
            "sources" => Source::all(),
            "success"=>"L'élément a été modifiéé avec avec succès."
        ]);
}
}
